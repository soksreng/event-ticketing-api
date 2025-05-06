const Booking = require('../models/Booking');
const Event = require('../models/Event');
const sendEmail = require('../utils/sendEmail');
//function to create a new booking by user
exports.createBooking = async (req, res) => {
    // extract event ID and quantity from the request body
    const {event: eventId, quantity} = req.body;
    try{
        // check if the event exists in the database
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({message: "Event not found"});
        }
        // check if the requested quantity is available
        if(quantity > event.seatCapacity - event.bookedSeats) {
            return res.status(400).json({message: "Not enough seats available"});
        }
        // create a new booking with the user ID, event ID, quantity and QR code
        const booking = await Booking.create({
            // user ID is taken from the request object (after authentication)
            user: req.user._id,
            event: eventId,
            quantity,
            qrCode: `QR-${Math.random().toString(36).substring(2, 15)}` // generate a random QR code
        })

        // update the booked seats in the event document
        event.bookedSeats += quantity;
        await event.save();

        res.status(201).json(booking);
        // send confirmation email to the user
        await sendEmail(
            req.user.email,
            'Booking Confirmation',
            `Hey ${req.user.name}, you’re all booked! ${quantity} ticket${quantity > 1 ? 's' : ''} for "${event.title}" — can’t wait to see you there.`
            
        )
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
};

// function to get all bookings
exports.getAllBookings = async (req, res) => {
    try{
        // find all bookings made by the user and populate the event details
        const bookings = await Booking.find({user: req.user._id}).populate('event')
        if(!bookings) {
            return res.status(404).json({message: "No bookings found"});
        }
        res.status(200).json(bookings);
    }catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

// function to get a single booking by ID
exports.getBookingById = async (req, res) => {
    try{
        // find the booking by ID and populate the event details 
        const booking = await Booking.findOne({id: req.params.id, user: req.user._id}).populate('event');
        if(!booking) {
            return res.status(404).json({message: "Booking not found"});
        }
        res.status(200).json(booking);
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

