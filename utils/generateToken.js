// This function generates a JWT token using the user's id and a secret key.
// It uses the jsonwebtoken library to create a token that expires in 7 days.
const jwt = require('jsonwebtoken');

module.exports = (id) => jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '7d' })