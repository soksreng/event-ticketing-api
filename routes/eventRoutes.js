//This defines the routes for event-related operations, including creating, updating, deleting, and fetching events.
const express = require('express');
const router = express.Router();
const {protect, adminOnly} = require('../middleware/auth');

// Import the event controller functions
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

// Define routes for event-related operations
router.get('/', getAllEvents); // Fetch all events
router.get('/:id', getEventById); // Fetch a single event by ID
router.post('/', protect, adminOnly, createEvent); // Create a new event (admin only)
router.put('/:id', protect, adminOnly, updateEvent); // Update an event by ID (admin only)
router.delete('/:id', protect, adminOnly, deleteEvent); // Delete an event by ID (admin only)

module.exports = router; // Export the router to be used in the main server file