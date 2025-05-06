const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { createBooking, getAllBookings, getBookingById} = require('../controllers/bookingController');

// Define routes for booking-related operations
router.post('/', protect, createBooking); // Create a new booking
router.get('/', protect, getAllBookings); // Fetch all bookings for the user
router.get('/:id', protect, getBookingById); // Fetch a single booking by ID

module.exports = router;