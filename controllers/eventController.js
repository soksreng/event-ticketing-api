const Event = require('../models/Event');
// Function to fetch all events from the database
exports.getAllEvents = async (req, res) => {
    try {
        // Fetch all events from the database
        const {category, date} = req.query;
        // Create a filter object based on query parameters, and check if category and date are provided in the query parameters
        const filter = {};
        if(category) {
            filter.category = category;
        }
        if(date) {
            filter.date = new Date(date);
        }
        // Fetch events from the database with optional filtering, Return the events in the response
        const events = await Event.find(filter);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch a single event by its ID
exports.getEventById = async (req, res) => {
    try{
        // Fetch the event by its ID from the database
        // The ID is passed as a parameter in the request URL
        const event = await Event.findById(req.params.id);
        // Check if the event exists, and Return the event details in the response
        if(!event) {
            return res.status(404).json({message: "Event not found"});
        }
        res.status(200).json(event);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to create a new event
exports.createEvent = async (req, res) => {
    try {
        // Create a new event using the data from the request body
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update an existing event by its ID
exports.updateEvent = async (req, res) => {
    try {
        // Fetch the event by its ID from the database
        const event = await Event.findById(req.params.id);
        if(!event) {
            return res.status(404).json({message: "Event not found"});
        }
        // check if the seat capacity is less than booked seats
        if(req.body.seatCapacity < event.bookedSeats) {
            return res.status(400).json({message: "Seat capacity cannot be less than booked seats"});
        }
        // Update the event with the new data from the request body, save and return the updated event
        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to delete an event by its ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event) {
            return res.status(404).json({message: "Event not found"});
        }
        // Delete the event from the database
        await event.remove();
        res.json({message: "Event deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

