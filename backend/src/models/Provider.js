const mongoose = require('mongoose');
const memoryModels = require('../config/memoryStore');

const providerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceExpertise: [{
    type: String,
    required: true,
  }],
  location: {
    type: String,
    enum: ['Dhanmondi', 'Mirpur', 'Gulshan', 'Banani', 'Uttara', 'Mohammadpur'],
    required: true,
  },
  coordinates: {
    lat: { type: Number, default: 23.7465 },
    lng: { type: Number, default: 90.3760 },
  },
  rating: {
    type: Number,
    default: 4.8,
    min: 1,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  estimatedPrice: {
    type: Number,
    default: 1000,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  availableTimeSlots: [{
    type: String,
    default: ['09:00 - 11:00', '11:00 - 01:00', '02:00 - 04:00', '04:00 - 06:00'],
  }],
  activeJobs: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: 'Certified Master Technician with precision diagnostic instruments.',
  },
  experienceYears: {
    type: Number,
    default: 8,
  },
  warrantyDays: {
    type: Number,
    default: 30,
  },
  vehicle: {
    type: String,
    default: 'TVS Raider (Dhaka Metro HA-48)',
  },
  completedJobsCount: {
    type: Number,
    default: 240,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseProvider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);

const ProviderProxy = new Proxy(MongooseProvider, {
  get(target, prop) {
    if (global.useMemoryDB) {
      return memoryModels.Provider[prop];
    }
    return target[prop];
  },
});

module.exports = ProviderProxy;
