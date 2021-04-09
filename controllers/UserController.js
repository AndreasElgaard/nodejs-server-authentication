const User = require('../models/User');

// Lists all users
module.exports.listsUsers = async function (req, res) {
    const users = await User.find({}).catch(reason =>
            res.status(400).json({
                "title": "Unable to read users from the database",
                "detail": reason
            })
        );
      res.status(200).json({
        users
    })
}; 

module.exports.getOneUser = async function (req, res) {
    let user = await User.findOne({username: req.body.username});
    console.log(user)
    User.findById(user._id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }
        
        res.status(200).send(user);
    });
}; 