const express = require('express');
const router = express.Router();
const { protect, userOnly } = require('../middleware/auth');

const { createBooking, getAllBookings, getBookingById, validateTicket} = require('../controllers/bookingController');

// Define routes for booking-related operations
router.post('/', protect, userOnly, createBooking); // Create a new booking
router.get('/', protect, getAllBookings); // Fetch all bookings for the user
router.get('/:id', protect, getBookingById); // Fetch a single booking by ID
router.get('/validate/:qrCode', protect, validateTicket); // Validate a ticket using QR code


module.exports = router;