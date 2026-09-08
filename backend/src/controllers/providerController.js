const Provider = require('../models/Provider');
const User = require('../models/User');
const { rankProviders } = require('../utils/matchingAlgorithm');

// @desc    Get all providers with optional filters
// @route   GET /api/providers
// @access  Public
exports.getProviders = async (req, res) => {
  try {
    const { expertise, location, available } = req.query;
    const filter = {};

    if (expertise) {
      filter.serviceExpertise = { $in: [new RegExp(expertise, 'i')] };
    }
    if (location) {
      filter.location = location;
    }
    if (available !== undefined) {
      filter.availability = available === 'true';
    }

    const providers = await Provider.find(filter)
      .populate('user', 'name email phone profileImage');

    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Smart Provider Matching API (Formula-weighted)
// @route   GET /api/providers/match
// @access  Public / Protected
exports.matchProviders = async (req, res) => {
  try {
    const {
      serviceType = 'AC & Appliance Repair',
      location = 'Dhanmondi',
      preferredDate,
      preferredTime = '09:00 - 11:00',
      urgencyLevel = 'standard',
      rejectedProviders = '',
      minRating,
      maxPrice,
      availableOnly,
      sortBy = 'match',
    } = req.query;

    const rejectedList = rejectedProviders
      ? rejectedProviders.split(',').map(id => id.trim()).filter(Boolean)
      : [];

    // Fetch all active providers populated with user
    const providers = await Provider.find().populate('user', 'name email phone profileImage');

    if (!providers.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
      });
    }

    const topMatches = rankProviders(providers, {
      serviceType,
      location,
      preferredDate,
      preferredTime,
      urgencyLevel,
      rejectedProviders: rejectedList,
      minRating: minRating ? Number(minRating) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      availableOnly: availableOnly === 'true' || availableOnly === true,
      sortBy,
    });

    res.status(200).json({
      success: true,
      count: topMatches.length,
      query: {
        serviceType,
        location,
        preferredTime,
        urgencyLevel,
        minRating,
        maxPrice,
        availableOnly,
        sortBy,
      },
      data: topMatches,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get provider by ID
// @route   GET /api/providers/:id
// @access  Public
exports.getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .populate('user', 'name email phone profileImage address');

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Update provider profile
// @route   PUT /api/providers/profile
// @access  Private (Provider only)
exports.updateProviderProfile = async (req, res) => {
  try {
    let provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider record not found for this account.',
      });
    }

    const { serviceExpertise, location, estimatedPrice, availability, availableTimeSlots, bio, vehicle } = req.body;
    if (serviceExpertise) provider.serviceExpertise = serviceExpertise;
    if (location) provider.location = location;
    if (estimatedPrice !== undefined) provider.estimatedPrice = estimatedPrice;
    if (availability !== undefined) provider.availability = availability;
    if (availableTimeSlots) provider.availableTimeSlots = availableTimeSlots;
    if (bio) provider.bio = bio;
    if (vehicle) provider.vehicle = vehicle;

    await provider.save();

    res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
