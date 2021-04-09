const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userColl = require('../models/User');

module.exports.AuthenticateJWT = function(req, res, next) {
    var authenticationHeader = req.headers.auth;

    if (authenticationHeader) {
        jwt.verify(authenticationHeader, process.env.JWT_SECRET, function(err, user) {
            if(err) { 
                console.log(err);
                return res.sendStatus(403);
            } else {
                req.user = user; 
                next();
            }
            });
        } else {
          res.status(401).send({ 
              auth: false, 
              message: 'No token provided' 
            })
        }
};