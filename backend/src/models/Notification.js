const mongoose = require('mongoose');
const memoryModels = require('../config/memoryStore');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      'request_created',
      'provider_assigned',
      'request_accepted',
      'on_the_way',
      'in_progress',
      'completed',
      'request_rejected',
      'review_received',
      'system'
    ],
    default: 'system',
  },
  link: {
    type: String,
    default: '',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseNotification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

const NotificationProxy = new Proxy(MongooseNotification, {
  get(target, prop) {
    if (global.useMemoryDB) {
      return memoryModels.Notification[prop];
    }
    return target[prop];
  },
});

module.exports = NotificationProxy;
