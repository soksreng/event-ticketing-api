// This defines the Event model for the MongoDB database using Mongoose.
const mongoose = require("mongoose");

// This schema defines the structure of the Event document in MongoDB
// It includes fields for title, description, category, venue, date, time, seat capacity, booked seats, and price.
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  venue: String,
  date: {
    type: Date,
    required: true,
  },
  time: String,
  seatCapacity: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Export the Event model based on the eventSchema
module.exports = mongoose.model("Event", eventSchema);


