// This function checks if the user is authenticated by verifying the JWT token.
// It extracts the token from the request headers, verifies it, and attaches the user information to the request object for further processing in the route handlers.
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    // Check if the request has an authorization header
    let token = req.headers.authorization?.split(' ')[1];
    // If the token is not present, return a 401 Unauthorized response
    if(!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify the token using the secret key
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user asscociated with the token
        req.user = await User.findById(decoded.id).select('-password');
        // Call the next middleware or route handler
        next();
    } catch(error) {
        // If the token is invalid, return a 401 Unauthorized response
        res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};

// This function checks if the user has admin privileges by comparing the user's role with 'admin'.

exports.adminOnly = (req, res, next) => {
    // Check if the user role is 'admin'
    if(req.user && req.user.role === 'admin') {
        // Call the next middleware or route handler
        next();
    } else {
        // If the user is not an admin, return a 403 Forbidden response
        res.status(403).json({ message: 'Admin only' });
    }
}

exports.userOnly = (req, res, next) => {
    if (req.user.role !== 'user') {
      return res.status(403).json({ error: 'Only users can perform this action' });
    }
    next();
  };
  
