const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  rejectRequestAndReassign,
} = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createRequest);
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequestById);
router.patch('/:id/status', protect, updateRequestStatus);
router.post('/:id/reject', protect, rejectRequestAndReassign);

module.exports = router;
