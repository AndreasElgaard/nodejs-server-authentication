const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
        required: true,
    },
    password: {
        type: String,
        unique: false,
        required: true
    },    
    role: {
        type: String, // Adminstrator, HotelManager, Guest, User
        required: false, 
        default: "User"
     }
});


//For user login
userSchema.methods.CheckValidPassword = async function(password) {
    return await bcrypt.compareSync(password, this.password);
}

userSchema.methods.HashPassword = async function (password) {
    return await bcrypt.hashSync(password, saltRounds);
};

// Generate JWT token for authentication
userSchema.methods.GenerateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1); // Use 1 hour for better security
    
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000), // as Unix time in seconds,
    }, process.env.JWT_SECRET, 
        {
            algorithm: 'HS256'
        });
};

userSchema.methods.ValidateJwt = function (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) =>
    {
        if (err){
            return err.message;
        }
        else{
            // return verifiedToken
            return true;
        }
    });
};

module.exports = mongoose.model('users', userSchema);