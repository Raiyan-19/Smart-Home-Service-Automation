const express = require('express');
const router = express.Router();
const {
  getProviders,
  matchProviders,
  getProviderById,
  updateProviderProfile,
} = require('../controllers/providerController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProviders);
router.get('/match', matchProviders);
router.get('/:id', getProviderById);
router.put('/profile', protect, authorize('provider'), updateProviderProfile);

module.exports = router;
