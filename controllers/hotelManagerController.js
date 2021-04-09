const mongoose = require('mongoose');
const hotelColl = require('../models/Hotels');
const userColl = require('../models/User');
const Room = require('../models/Room');
const auth = require('../authentication/authentication')

module.exports.createHotel = async function (req, res) {

    var user = await userColl.findOne({ username: req.user.username })
    console.log(user.role)

    if (user.role != "HotelManager") {
        res.status(400).json({
            "title": "Unauthorized"
        })
    }

    console.log("hello from createHotel")
    let hotel = await hotelColl.create({
        name: req.body.name,
        rooms: [Room],
        manager: req.body.manager
    }).catch(error => {
        res.status(400).json({
            "title": "Unable to create hotel",
            "detail": error
        })
    });
    if (hotel) {
        res.status(201).json({
            hotel
        })
    }
    else {
        return res.status(500).json({
            "title": "Unknown server error"
        })
    };
};

// Returns a list of all the created hotels
module.exports.listHotels = async function (req, res) {

    const hotels = await hotelColl.find({})
        .catch(reason =>
            res.status(400).json({
                "title": "Unable to get the hotels from the db",
                "detail": reason
            })
        );
    return res.status(200).json({
        hotels
    })
};

module.exports.listFreeRooms = async function (req, res) {

    var hotelName = req.url.split("/").pop();

    const hotel = await hotelColl.findOne({ name: hotelName })
        .catch(error => {
            res.status(400).json({
                "title": "could find hotel with that name",
                "detail": error
            })
        });

    console.log(hotel)

    const rooms = hotel.rooms;

    console.log(rooms);

    const freeRooms = hotel.rooms.filter(item => item.booked === false);

    return res.status(200).json({
        freeRooms
    });

};

module.exports.createRoom = async function (req, res) {
    console.log("hello from create room");

    const hotel = await hotelColl.findOne({ name: req.body.hotelName })
        .catch(error => {
            res.status(400).json({
                "title": "could find hotel with that name",
                "detail": error
            })
        });

    if (req.user.username != hotel.manager) {
        res.status(400).json({
            "title": "Unauthorized access"
        })

        return;
    }

    console.log(hotel)
    //If hotel found
    const hotelRooms = hotel.rooms;

    for (x = 1; x <= req.body.roomsToAdd; x++) {
        const newRoomNumber = hotelRooms.length + 1;
        console.log(newRoomNumber)
        let newRoom = new Room({ name: hotel.name, number: newRoomNumber })
        hotelRooms.push(newRoom);
    }

    try {
        hotelColl.findByIdAndUpdate(hotel._id, { rooms: hotelRooms }, { new: true }, function (err, docs) {
            if (err) {
                res.status(500).json({
                    "title": "Server error",
                    "detail": "Error in updating rooms " + err
                })
            } else {
                res.status(200).json({
                    docs
                });
            }
        });
    } catch (errReason) {
        res.status(400).json({
            "title": "Unable to update hotel rooms",
            "detail": "Cannot update hotel rooms"
        })
    }
}


module.exports.bookRoom = async function (req, res) {

    const { hotelName, roomNumber } = req.body

    const hotel = await hotelColl.findOne({ name: hotelName })
        .catch(error => {
            return res.status(400).json({
                "title": "could find hotel with that name",
                "detail": error
            })
            next();
        });

    var room = hotel.rooms.filter(room => room.number == roomNumber)
    room = room.pop();
    console.log(room)

    if (room.booked != true) {
        // Find user making request
        var currentUser = await userColl.findOne({ username: req.user.username });
        console.log("User booking a rooms role: " + currentUser.role);
        // Update current users role to Guest
        if (currentUser.role == "User") {
            let user = await userColl.findOneAndUpdate({ username: currentUser.username }, { role: "Guest" }, {
                new: true
            });
        }

        var newHotel = await hotelColl.findOneAndUpdate({ "name": hotelName, "rooms.number": roomNumber }, { "$set": { "rooms.$.booked": true } }, { rawResult: true });
        console.log(newHotel)

        if (newHotel != null) {
            res.status(200).json({
                "title": "Room is booked"
            })
        }
        else {
            res.status(400).json({
                "title": "Failed to book"
            })
        }
    }
    else {
        res.status(400).json({
            "title": "Room is already booked or doesnt exist"
        })
    }
}
