const userColl = require('../models/User');

// Update user rights to hotelmanager 
module.exports.UpdateUserRights = async function (req, res) { 
    var currentUser = await userColl.findOne({username: req.user.username}); 

    if(currentUser.role != "Adminstrator"){
        res.status(400).json({
            "title": "Unauthorized access"
        })
        return; 
    }

    let user = await userColl.findOne({username: req.body.username});

    try {
        userColl.findByIdAndUpdate(user._id, { role: 'HotelManager' }, { new: true}, function (err, docs) { 
            if (err){ 
                res.status(500).json({
                    "title": "Server error", 
                    "detail": "Error in role update: " + err
                }) 
            } else{ 
                res.status(200).json({
                    docs
                }); 
            } 
        }); 
    } catch (err) { 
        res.status(400).json({
            "title": "Unable to update user rights",
            "detail": "Cannot update user rights "
        })
    }
}; 
