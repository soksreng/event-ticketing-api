// It defines the schema for the User collection in MongoDB, including fields for name, email, password, and role.
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// This schema defines the structure of the User document in MongoDB
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// This method hashes the password before saving the user document to the database
userSchema.pre("save", async function(){
    // Check if the password is modified or new
    if (!this.isModified("password")) return;
    // Hash the password using bcrypt with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
});

// This method compares a plain text password with the hashed password in the database
userSchema.methods.comparePassword = async function(enterPassword){
    // Compare the entered password with the hashed password
    return await bcrypt.compare(enterPassword, this.password);
};

// Export the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);
