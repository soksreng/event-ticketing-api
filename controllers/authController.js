const User = require("../models/User");
const generateToken = require("../utils/generateToken");
// Register a new user
exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const userExists = await User.findOne({email});
        //if user exists, return Email already exists message
        if(userExists){
            return res.status(400).json({message: "Email already exists"});
        }
        //create new user
        const user = await User.create({name, email, password});
        //if user is created successfully, return user details and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch(error){
        //if there is an error, return error message
        res.status(500).json({ error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try{
        //find user by email
        const user = await User.findOne({email});
        //if user found and password matches, return user details and token
        if(user && (await user.comparePassword(password))){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            //if user not found or password does not match, return Invalid credentials message
            res.status(401).json({message: "Invalid credentials"});
        }
    }
    catch(error){
        //if there is an error, return error message
        res.status(500).json({ error: error.message });
    }
}