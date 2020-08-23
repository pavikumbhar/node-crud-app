const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,

    },
    lastName: {
        type: String,
        trim: true,
        required: true,

    },
    email: {
        type: String,
        trim: true,
        required: true,

    },
    age: {
        type: Number,
        required:true
    },
    gender: {
        type: String,
        trim: true,
        enum: ["Male", "Female", "Others"],
        required:true
    },
    role: {
        type: String,
        trim:true,
        enum: ['Admin', 'User'],
        required:true
    }

});

module.exports = mongoose.model("User", UserSchema);