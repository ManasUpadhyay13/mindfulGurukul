const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
