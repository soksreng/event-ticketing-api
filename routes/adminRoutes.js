const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {adminDashboard} = require('../controllers/adminController');

// Admin dashboard route
router.get('/dashboard', protect, adminOnly, adminDashboard); // Admin dashboard route

module.exports = router;