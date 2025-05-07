//Admin dashboard controller
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Function to get all bookings for admin dashboard
exports.adminDashboard = async (req, res) => {
    try{
        //
        const events = await Event.find();
        // Get all bookings and populate user and event details
        const eventData = await Promise.all(
            events.map(async (event) =>{
                // Get bookings for each event
                const bookings = await Booking.find({event : event._id}).populate('user', 'name email');
                
                const users = bookings.map((b) => ({
                    name: b.user.name,
                    email: b.user.email,
                    quantity: b.quantity,
                }));

                return {
                    eventId: event._id,
                    title: event.title,
                    totalBooked: event.bookedSeats,
                    seatCapacity: event.seatCapacity,
                    pricePerTicket: event.price,
                    users
                }
            })
        )

        // Return the bookings data
        res.status(200).json(eventData);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
};