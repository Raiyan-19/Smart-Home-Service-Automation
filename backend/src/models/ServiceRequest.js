const mongoose = require('mongoose');
const memoryModels = require('../config/memoryStore');

const serviceRequestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  addressDetails: {
    type: String,
    default: 'House 42, Road 7A, Dhanmondi, Dhaka',
  },
  preferredDate: {
    type: String,
    required: [true, 'Preferred date is required'],
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
  },
  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'standard', 'high', 'emergency'],
    default: 'standard',
  },
  problemDescription: {
    type: String,
    required: [true, 'Problem description is required'],
  },
  image: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    default: '+880 1712-345678',
  },
  assignedProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    default: null,
  },
  rejectedProviders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
  }],
  matchScore: {
    type: Number,
    default: 0,
  },
  estimatedPrice: {
    type: Number,
    default: 1000,
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'On The Way', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Requested',
  },
  statusHistory: [{
    status: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      default: '',
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseServiceRequest = mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', serviceRequestSchema);

const ServiceRequestProxy = new Proxy(MongooseServiceRequest, {
  get(target, prop) {
    if (global.useMemoryDB) {
      return memoryModels.ServiceRequest[prop];
    }
    return target[prop];
  },
});

module.exports = ServiceRequestProxy;
