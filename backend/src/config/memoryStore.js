const bcrypt = require('bcryptjs');

class MemoryQuery {
  constructor(data, isSingle = false) {
    this._data = data;
    this._isSingle = isSingle;
    this._populatePaths = [];
  }

  select(fields) {
    return this;
  }

  populate(pathOrOptions, selectFields) {
    if (typeof pathOrOptions === 'string') {
      this._populatePaths.push({ path: pathOrOptions, select: selectFields });
    } else if (typeof pathOrOptions === 'object') {
      this._populatePaths.push(pathOrOptions);
    }
    return this;
  }

  sort(sortOptions) {
    if (!this._isSingle && Array.isArray(this._data) && sortOptions) {
      const [key, dir] = Object.entries(sortOptions)[0] || ['createdAt', -1];
      this._data.sort((a, b) => {
        const valA = a[key] || 0;
        const valB = b[key] || 0;
        return dir === -1 ? (valB > valA ? 1 : -1) : (valA > valB ? 1 : -1);
      });
    }
    return this;
  }

  limit(num) {
    if (!this._isSingle && Array.isArray(this._data)) {
      this._data = this._data.slice(0, num);
    }
    return this;
  }

  _execPopulate(item) {
    if (!item) return item;
    const cloned = { ...item };

    for (const pop of this._populatePaths) {
      const field = pop.path;
      if (field === 'user' && cloned.user) {
        const uId = typeof cloned.user === 'object' ? cloned.user._id || cloned.user.id : cloned.user;
        const found = store.users.find(u => u._id.toString() === uId.toString());
        if (found) {
          cloned.user = { ...found };
          delete cloned.user.password;
        }
      } else if (field === 'customer' && cloned.customer) {
        const cId = typeof cloned.customer === 'object' ? cloned.customer._id || cloned.customer.id : cloned.customer;
        const found = store.users.find(u => u._id.toString() === cId.toString());
        if (found) {
          cloned.customer = { ...found };
          delete cloned.customer.password;
        }
      } else if (field === 'assignedProvider' || field === 'provider') {
        const pField = cloned.assignedProvider ? 'assignedProvider' : 'provider';
        const pId = typeof cloned[pField] === 'object' ? cloned[pField]._id || cloned[pField].id : cloned[pField];
        if (pId) {
          const found = store.providers.find(p => p._id.toString() === pId.toString());
          if (found) {
            const pCloned = { ...found };
            if (pop.populate && pop.populate.path === 'user') {
              const u = store.users.find(u => u._id.toString() === pCloned.user?.toString());
              if (u) {
                pCloned.user = { ...u };
                delete pCloned.user.password;
              }
            }
            cloned[pField] = pCloned;
          }
        }
      } else if (field === 'serviceRequest' && cloned.serviceRequest) {
        const sId = typeof cloned.serviceRequest === 'object' ? cloned.serviceRequest._id || cloned.serviceRequest.id : cloned.serviceRequest;
        const found = store.serviceRequests.find(s => s._id.toString() === sId?.toString());
        if (found) cloned.serviceRequest = { ...found };
      }
    }

    // Attach save method
    cloned.save = async function () {
      return cloned;
    };

    return cloned;
  }

  async then(resolve, reject) {
    try {
      if (this._isSingle) {
        const result = this._execPopulate(this._data);
        resolve(result || null);
      } else {
        const results = (this._data || []).map(item => this._execPopulate(item));
        resolve(results);
      }
    } catch (err) {
      reject(err);
    }
  }
}

function matchesFilter(item, filter = {}) {
  for (const [key, expected] of Object.entries(filter)) {
    if (key === '$or' && Array.isArray(expected)) {
      const orMatch = expected.some(subFilter => matchesFilter(item, subFilter));
      if (!orMatch) return false;
      continue;
    }

    if (expected instanceof RegExp) {
      if (!expected.test(item[key] || '')) return false;
      continue;
    }

    if (expected && typeof expected === 'object' && !Array.isArray(expected)) {
      if (expected.$in && Array.isArray(expected.$in)) {
        const itemVal = item[key];
        const hasMatch = Array.isArray(itemVal)
          ? itemVal.some(v => expected.$in.some(exp => exp instanceof RegExp ? exp.test(v) : exp === v))
          : expected.$in.includes(itemVal);
        if (!hasMatch) return false;
        continue;
      }
      if (expected.$ne !== undefined) {
        const itemVal = item[key];
        if (Array.isArray(itemVal)) {
          if (itemVal.some(v => v?.toString() === expected.$ne?.toString())) return false;
        } else if (itemVal?.toString() === expected.$ne?.toString()) {
          return false;
        }
        continue;
      }
    }

    const actualVal = item[key];
    if (actualVal?.toString() !== expected?.toString()) {
      return false;
    }
  }
  return true;
}

const store = {
  users: [],
  providers: [],
  services: [],
  serviceRequests: [],
  bookings: [],
  reviews: [],
  notifications: [],
};

class MemoryModel {
  constructor(collectionName) {
    this.name = collectionName;
  }

  get _collection() {
    return store[this.name];
  }

  find(filter = {}) {
    const matched = this._collection.filter(item => matchesFilter(item, filter));
    return new MemoryQuery([...matched], false);
  }

  findOne(filter = {}) {
    const item = this._collection.find(item => matchesFilter(item, filter));
    return new MemoryQuery(item ? { ...item } : null, true);
  }

  findById(id) {
    if (!id) return new MemoryQuery(null, true);
    const item = this._collection.find(item => item._id.toString() === id.toString());
    return new MemoryQuery(item ? { ...item } : null, true);
  }

  async create(data) {
    const id = 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const item = {
      _id: id,
      ...data,
      createdAt: data.createdAt || new Date(),
    };

    if (this.name === 'users') {
      if (item.password && !item.password.startsWith('$2a$') && !item.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(10);
        item.password = await bcrypt.hash(item.password, salt);
      }
      item.matchPassword = async function (pw) {
        return await bcrypt.compare(pw, item.password);
      };
    }

    item.save = async function () {
      const idx = store[this.name]?.findIndex(i => i._id === item._id);
      if (idx !== -1 && store[this.name]) {
        store[this.name][idx] = { ...item };
      }
      return item;
    }.bind(this);

    this._collection.push(item);
    return item;
  }

  async insertMany(docs) {
    const created = [];
    for (const doc of docs) {
      created.push(await this.create(doc));
    }
    return created;
  }

  async deleteMany(filter = {}) {
    if (Object.keys(filter).length === 0) {
      store[this.name] = [];
      return { deletedCount: 0 };
    }
    store[this.name] = store[this.name].filter(item => !matchesFilter(item, filter));
    return { deletedCount: 1 };
  }

  async countDocuments(filter = {}) {
    return this._collection.filter(item => matchesFilter(item, filter)).length;
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const idx = this._collection.findIndex(item => item._id.toString() === id.toString());
    if (idx === -1) return null;

    if (update.$inc) {
      for (const [k, val] of Object.entries(update.$inc)) {
        this._collection[idx][k] = (this._collection[idx][k] || 0) + val;
      }
    }
    for (const [k, val] of Object.entries(update)) {
      if (k !== '$inc') {
        this._collection[idx][k] = val;
      }
    }

    return { ...this._collection[idx] };
  }

  async findOneAndUpdate(filter, update, options = {}) {
    const item = this._collection.find(i => matchesFilter(i, filter));
    if (!item) return null;
    return await this.findByIdAndUpdate(item._id, update, options);
  }

  async updateMany(filter, update) {
    for (const item of this._collection) {
      if (matchesFilter(item, filter)) {
        Object.assign(item, update);
      }
    }
    return { modifiedCount: 1 };
  }
}

const memoryModels = {
  User: new MemoryModel('users'),
  Provider: new MemoryModel('providers'),
  Service: new MemoryModel('services'),
  ServiceRequest: new MemoryModel('serviceRequests'),
  Booking: new MemoryModel('bookings'),
  Review: new MemoryModel('reviews'),
  Notification: new MemoryModel('notifications'),
  store,
};

module.exports = memoryModels;
