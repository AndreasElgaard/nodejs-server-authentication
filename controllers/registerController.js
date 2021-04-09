const userColl = require('../models/User');
const auth = require('../authentication/authentication')
const bcrypt = require('bcrypt');

// Registering a new user
module.exports.registerUser = async function (req, res) {
    const newUser = new userColl(req.body);
    
    let userInDb = await userColl.findOne({username: req.body.username});

    if(userInDb != undefined){
        res.status(400).json({
            "title": "Username already exists"
        })
    } 

    var hashedPassword = await newUser.HashPassword(newUser.password);
    
    let user = await userColl.create({
        username: newUser.username,
        password: hashedPassword,
        role: newUser.role,
    }).catch(error => {
        res.status(400).json({
            "title": "Unable to create user",
            "detail": error
        })
    });

    if(user) {
        res.status(201).json({
            user
        })
    }
    else {
        res.status(500).json({
            "title": "Unknown server error"
        })
    };
};