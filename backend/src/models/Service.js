const mongoose = require('mongoose');
const memoryModels = require('../config/memoryStore');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  activeTechCount: {
    type: Number,
    default: 12,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  warrantyInfo: {
    type: String,
    default: '30 Days Guaranteed',
  }
});

const MongooseService = mongoose.models.Service || mongoose.model('Service', serviceSchema);

const ServiceProxy = new Proxy(MongooseService, {
  get(target, prop) {
    if (global.useMemoryDB) {
      return memoryModels.Service[prop];
    }
    return target[prop];
  },
});

module.exports = ServiceProxy;
