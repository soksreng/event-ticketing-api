// Description: This is the main server file for the event booking application.
// It sets up the Express server, connects to the MongoDB database, and defines the routes for authentication, events, and bookings.
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static Welcome Page
app.use('/', express.static(path.join(__dirname, 'public')));
/*
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')); 

// Catch-all middleware
app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler')); */

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => console.error('DB Connection Error:', err));
