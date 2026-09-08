const mongoose = require('mongoose');
const memoryModels = require('../config/memoryStore');

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  serviceRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest',
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    required: [true, 'Feedback text is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseReview = mongoose.models.Review || mongoose.model('Review', reviewSchema);

const ReviewProxy = new Proxy(MongooseReview, {
  get(target, prop) {
    if (global.useMemoryDB) {
      return memoryModels.Review[prop];
    }
    return target[prop];
  },
});

module.exports = ReviewProxy;
