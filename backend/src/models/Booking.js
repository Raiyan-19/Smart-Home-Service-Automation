const mongoose = require('mongoose');
const memoryModels = require('../config/memoryStore');

const bookingSchema = new mongoose.Schema({
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
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Confirmed',
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 1000,
  },
  escrowStatus: {
    type: String,
    enum: ['Held', 'Released', 'Refunded'],
    default: 'Held',
  },
  paymentMethod: {
    type: String,
    enum: ['bKash', 'Nagad', 'Card', 'Escrow Cash'],
    default: 'bKash',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.index({ provider: 1, date: 1, timeSlot: 1 });

const MongooseBooking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

const BookingProxy = new Proxy(MongooseBooking, {
  get(target, prop) {
    if (global.useMemoryDB) {
      return memoryModels.Booking[prop];
    }
    return target[prop];
  },
});

module.exports = BookingProxy;
