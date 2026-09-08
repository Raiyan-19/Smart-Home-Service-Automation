const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const ServiceRequest = require('../models/ServiceRequest');
const Notification = require('../models/Notification');

// @desc    Create a new booking with double booking prevention
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { providerId, serviceRequestId, date, timeSlot, totalAmount, paymentMethod } = req.body;

    if (!providerId || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Provider ID, date, and time slot are required.',
      });
    }

    // 1. Double Booking Prevention Check
    const existingBooking = await Booking.findOne({
      provider: providerId,
      date,
      timeSlot,
      status: { $in: ['Confirmed', 'In Progress'] },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: `Time slot conflict: This specialist already has a confirmed booking on ${date} during ${timeSlot}. Please select another slot.`,
      });
    }

    const provider = await Provider.findById(providerId).populate('user');
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found.',
      });
    }

    // Create or link service request
    let requestDoc = null;
    if (serviceRequestId) {
      requestDoc = await ServiceRequest.findById(serviceRequestId);
      if (requestDoc) {
        requestDoc.assignedProvider = providerId;
        requestDoc.preferredDate = date;
        requestDoc.preferredTime = timeSlot;
        requestDoc.status = 'Accepted';
        requestDoc.statusHistory.push({
          status: 'Accepted',
          timestamp: new Date(),
          note: `Booking confirmed with specialist ${provider.user.name} for ${date} (${timeSlot}).`,
        });
        await requestDoc.save();
      }
    }

    const booking = await Booking.create({
      customer: req.user._id,
      provider: providerId,
      serviceRequest: serviceRequestId || (requestDoc ? requestDoc._id : null),
      date,
      timeSlot,
      status: 'Confirmed',
      totalAmount: totalAmount || provider.estimatedPrice || 1000,
      escrowStatus: 'Held',
      paymentMethod: paymentMethod || 'bKash',
    });

    // Increment active jobs count
    provider.activeJobs = (provider.activeJobs || 0) + 1;
    await provider.save();

    // Create notifications
    await Notification.create({
      user: req.user._id,
      message: `Booking #${booking._id.toString().slice(-4).toUpperCase()} confirmed with ${provider.user.name} for ${date} (${timeSlot}). Escrow payment held securely.`,
      type: 'provider_assigned',
      link: `/tracking/${requestDoc ? requestDoc._id : booking._id}`,
    });

    await Notification.create({
      user: provider.user._id,
      message: `Confirmed booking scheduled on ${date} (${timeSlot}) by ${req.user.name}.`,
      type: 'request_accepted',
      link: `/provider-dashboard`,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone profileImage')
      .populate({
        path: 'provider',
        populate: { path: 'user', select: 'name email phone profileImage' }
      })
      .populate('serviceRequest');

    res.status(201).json({
      success: true,
      message: 'Booking successfully confirmed. Escrow reserved.',
      data: populatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get bookings for current user or provider
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    } else if (req.user.role === 'provider') {
      const provider = await Provider.findOne({ user: req.user._id });
      if (provider) {
        query.provider = provider._id;
      }
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'name email phone profileImage')
      .populate({
        path: 'provider',
        populate: { path: 'user', select: 'name email phone profileImage' }
      })
      .populate('serviceRequest')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone profileImage')
      .populate({
        path: 'provider',
        populate: { path: 'user', select: 'name email phone profileImage' }
      })
      .populate('serviceRequest');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
