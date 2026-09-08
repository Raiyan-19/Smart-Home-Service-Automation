const ServiceRequest = require('../models/ServiceRequest');
const Provider = require('../models/Provider');
const Notification = require('../models/Notification');
const Booking = require('../models/Booking');
const { rankProviders } = require('../utils/matchingAlgorithm');

// @desc    Submit a new service request
// @route   POST /api/requests
// @access  Private (Customer)
exports.createRequest = async (req, res) => {
  try {
    const {
      serviceType,
      location,
      addressDetails,
      preferredDate,
      preferredTime,
      urgencyLevel = 'standard',
      problemDescription,
      image,
      contactPhone,
      providerId,
      autoAssign = false,
    } = req.body;

    if (!serviceType || !location || !preferredDate || !preferredTime || !problemDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: serviceType, location, preferredDate, preferredTime, and problemDescription.',
      });
    }

    let assignedProviderId = providerId || null;
    let matchScore = 0;
    let estimatedPrice = 1000;

    // If auto-assign is requested or provider not explicitly selected
    if (autoAssign && !assignedProviderId) {
      const providers = await Provider.find().populate('user', 'name email phone profileImage');
      const ranked = rankProviders(providers, {
        serviceType,
        location,
        preferredDate,
        preferredTime,
        urgencyLevel,
      });

      if (ranked.length > 0) {
        assignedProviderId = ranked[0].providerId;
        matchScore = ranked[0].matchPercentage;
        estimatedPrice = ranked[0].provider.estimatedPrice || 1000;
      }
    } else if (assignedProviderId) {
      const p = await Provider.findById(assignedProviderId);
      if (p) estimatedPrice = p.estimatedPrice || 1000;
    }

    const newRequest = await ServiceRequest.create({
      customer: req.user._id,
      serviceType,
      location,
      addressDetails: addressDetails || `House 42, Road 7A, ${location}, Dhaka`,
      preferredDate,
      preferredTime,
      urgencyLevel,
      problemDescription,
      image: image || '',
      contactPhone: contactPhone || req.user.phone || '+880 1712-345678',
      assignedProvider: assignedProviderId,
      matchScore: matchScore || 94.8,
      estimatedPrice,
      status: 'Requested',
      statusHistory: [{
        status: 'Requested',
        timestamp: new Date(),
        note: 'Service request initiated and broadcasted via AI SmartMatch.'
      }]
    });

    // Notify Customer
    await Notification.create({
      user: req.user._id,
      message: `Your service request for ${serviceType} in ${location} has been created (ID: #${newRequest._id.toString().slice(-4).toUpperCase()}).`,
      type: 'request_created',
      link: `/tracking/${newRequest._id}`,
    });

    // If a provider was assigned immediately, create booking and notify provider
    if (assignedProviderId) {
      const assignedProvider = await Provider.findById(assignedProviderId).populate('user');
      if (assignedProvider) {
        // Increment provider workload
        assignedProvider.activeJobs = (assignedProvider.activeJobs || 0) + 1;
        await assignedProvider.save();

        // Create booking record
        await Booking.create({
          customer: req.user._id,
          provider: assignedProvider._id,
          serviceRequest: newRequest._id,
          date: preferredDate,
          timeSlot: preferredTime,
          status: 'Confirmed',
          totalAmount: estimatedPrice,
        });

        // Notify Provider
        await Notification.create({
          user: assignedProvider.user._id,
          message: `New job alert: ${urgencyLevel === 'emergency' ? '🚨 EMERGENCY: ' : ''}${serviceType} in ${location}.`,
          type: 'provider_assigned',
          link: `/provider-dashboard`,
        });
      }
    }

    const populated = await ServiceRequest.findById(newRequest._id)
      .populate('customer', 'name email phone profileImage')
      .populate({
        path: 'assignedProvider',
        populate: { path: 'user', select: 'name email phone profileImage' }
      });

    res.status(201).json({
      success: true,
      message: 'Service request submitted successfully.',
      data: populated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get all service requests for current user or provider
// @route   GET /api/requests
// @access  Private
exports.getRequests = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    } else if (req.user.role === 'provider') {
      const provider = await Provider.findOne({ user: req.user._id });
      if (provider) {
        // Provider sees requests assigned to them, OR unassigned requests in their domain
        query = {
          $or: [
            { assignedProvider: provider._id },
            { 
              assignedProvider: null,
              rejectedProviders: { $ne: provider._id },
              status: 'Requested'
            }
          ]
        };
      } else {
        query.assignedProvider = null;
      }
    }

    const requests = await ServiceRequest.find(query)
      .populate('customer', 'name email phone profileImage address')
      .populate({
        path: 'assignedProvider',
        populate: { path: 'user', select: 'name email phone profileImage' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get single request by ID
// @route   GET /api/requests/:id
// @access  Private
exports.getRequestById = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('customer', 'name email phone profileImage address')
      .populate({
        path: 'assignedProvider',
        populate: { path: 'user', select: 'name email phone profileImage address' }
      });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Update request status (Accepted -> On The Way -> In Progress -> Completed)
// @route   PATCH /api/requests/:id/status
// @access  Private
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['Requested', 'Accepted', 'On The Way', 'In Progress', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const request = await ServiceRequest.findById(req.params.id)
      .populate('customer')
      .populate({
        path: 'assignedProvider',
        populate: { path: 'user' }
      });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found.',
      });
    }

    // Update status
    request.status = status;
    request.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || `Status updated to ${status}.`,
    });

    await request.save();

    // Notify Customer with specific message based on stage
    let notificationMsg = `Your service status has been updated to: ${status}.`;
    let notifType = 'system';

    if (status === 'Accepted') {
      notificationMsg = `Specialist accepted your request! Technician is getting ready.`;
      notifType = 'request_accepted';
    } else if (status === 'On The Way') {
      notificationMsg = `Specialist is on the way to your location (ETA ~12 mins).`;
      notifType = 'on_the_way';
    } else if (status === 'In Progress') {
      notificationMsg = `Specialist has arrived and started the service job.`;
      notifType = 'in_progress';
    } else if (status === 'Completed') {
      notificationMsg = `Job complete! Please audit the service and leave your rating.`;
      notifType = 'completed';

      // Decrement active jobs for provider
      if (request.assignedProvider) {
        await Provider.findByIdAndUpdate(request.assignedProvider._id, {
          $inc: { activeJobs: -1, completedJobsCount: 1 }
        });
      }
    }

    await Notification.create({
      user: request.customer._id,
      message: notificationMsg,
      type: notifType,
      link: `/tracking/${request._id}`,
    });

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}.`,
      data: request,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Reject a request and automatically cascade/reassign to next best provider
// @route   POST /api/requests/:id/reject
// @access  Private (Provider)
exports.rejectRequestAndReassign = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found.',
      });
    }

    const provider = await Provider.findOne({ user: req.user._id });
    const currentProviderId = provider ? provider._id : request.assignedProvider;

    if (currentProviderId) {
      if (!request.rejectedProviders.includes(currentProviderId)) {
        request.rejectedProviders.push(currentProviderId);
      }
    }

    // Find next best provider
    const allProviders = await Provider.find().populate('user', 'name email phone profileImage');
    const ranked = rankProviders(allProviders, {
      serviceType: request.serviceType,
      location: request.location,
      preferredDate: request.preferredDate,
      preferredTime: request.preferredTime,
      urgencyLevel: request.urgencyLevel,
      rejectedProviders: request.rejectedProviders,
    });

    if (ranked.length > 0) {
      const nextProvider = ranked[0];
      request.assignedProvider = nextProvider.providerId;
      request.matchScore = nextProvider.matchPercentage;
      request.status = 'Requested';
      request.statusHistory.push({
        status: 'Requested',
        timestamp: new Date(),
        note: `Previous specialist was unavailable. Auto-reassigned to next best match: ${nextProvider.provider.user.name}.`,
      });

      await request.save();

      // Notify customer
      await Notification.create({
        user: request.customer,
        message: `Your request was automatically rerouted to ${nextProvider.provider.user.name} (${nextProvider.matchPercentage}% match).`,
        type: 'provider_assigned',
        link: `/tracking/${request._id}`,
      });

      // Notify new provider
      await Notification.create({
        user: nextProvider.provider.user._id,
        message: `Priority dispatch ticket assigned: ${request.serviceType} in ${request.location}.`,
        type: 'provider_assigned',
        link: `/provider-dashboard`,
      });

      return res.status(200).json({
        success: true,
        message: 'Request rejected and automatically reassigned to next best specialist.',
        data: request,
        nextProvider: nextProvider.provider,
      });
    } else {
      // No other providers available
      request.assignedProvider = null;
      request.status = 'Requested';
      await request.save();

      return res.status(200).json({
        success: true,
        message: 'Request marked unassigned as no further providers matched currently.',
        data: request,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
