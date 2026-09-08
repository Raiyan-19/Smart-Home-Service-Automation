const Review = require('../models/Review');
const Provider = require('../models/Provider');
const Notification = require('../models/Notification');

// @desc    Submit a review and rating for a provider
// @route   POST /api/reviews
// @access  Private (Customer)
exports.createReview = async (req, res) => {
  try {
    const { providerId, serviceRequestId, rating, feedback } = req.body;

    if (!providerId || !rating || !feedback) {
      return res.status(400).json({
        success: false,
        message: 'Provider ID, rating (1-5), and feedback text are required.',
      });
    }

    const provider = await Provider.findById(providerId).populate('user');
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found.',
      });
    }

    const review = await Review.create({
      customer: req.user._id,
      provider: providerId,
      serviceRequest: serviceRequestId || null,
      rating: Number(rating),
      feedback,
    });

    // Recalculate provider average rating
    const allReviews = await Review.find({ provider: providerId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Math.round((totalRating / allReviews.length) * 10) / 10;

    provider.rating = avgRating;
    provider.totalReviews = allReviews.length;
    await provider.save();

    // Send notification to provider
    await Notification.create({
      user: provider.user._id,
      message: `⭐ New ${rating}-star review received from ${req.user.name}: "${feedback.slice(0, 45)}..."`,
      type: 'review_received',
      link: '/provider-dashboard',
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. Provider rating updated.',
      data: review,
      updatedProviderRating: avgRating,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get reviews for a provider
// @route   GET /api/reviews/provider/:id
// @access  Public
exports.getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.id })
      .populate('customer', 'name profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
