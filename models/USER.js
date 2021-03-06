const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
    },
    Role: {
        type: String,
    }
})

module.exports = mongoose.model("users", UserSchema);