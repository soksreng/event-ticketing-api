// This file defines the routes for user authentication, including registration and login.
// It uses Express Router to handle incoming requests and map them to the appropriate controller functions.
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Define routes for user registration and login
router.post('/register', register);
router.post('/login', login);

// Export the router to be used in the main server file
module.exports = router;