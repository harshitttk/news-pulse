const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: { type: [String], default: [] } // List of preferred topics
});

module.exports = mongoose.model('User', UserSchema);
