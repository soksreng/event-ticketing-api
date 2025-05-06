module.exports = (req, res, next) => {
    if (req.accepts('html')) {
        return res.status(404).send('<h1>404 Not Found</h1>'); // For browsers
    } else if (req.accepts('json')) {
        return res.status(404).json({ error: '404 Not Found' }); // For APIs
    }
    res.status(404).type('txt').send('404 Not Found'); // For plain text clients
};