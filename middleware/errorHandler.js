module.exports = (error, req, res, next) => {
    console.error(error.stack); // Log the error stack trace to the console
    res.status(500).json({ error: error.message}); // Send a generic error response
}