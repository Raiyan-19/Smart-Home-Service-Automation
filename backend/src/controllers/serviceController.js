const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'ALL DOMAINS') {
      query.category = new RegExp(category, 'i');
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const services = await Service.find(query);
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get service by ID or slug
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    let service = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(req.params.id);
    } else {
      service = await Service.findOne({ slug: req.params.id });
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
