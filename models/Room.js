const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel: {
        type: String,
        unique: false,
        required: true
    },
    number: {
        type: Number,
        unique: true,
        required: true
    },
    booked: {
        type: Boolean,
        unique: false,
        required: true,
        default: false
    }
});

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;