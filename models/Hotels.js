const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    rooms: {
        type: Array,
        unique: false,
        required: false
    },    
    manager: {
        type: String,
        required: true
    }
});

const Hotels = mongoose.model('hotels', hotelSchema);

module.exports = Hotels;