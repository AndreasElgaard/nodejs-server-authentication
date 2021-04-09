const UserColl = require('../models/User');

// User is logging in on the application
module.exports.loginUser = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = await UserColl.findOne({username: username})
  .catch(err =>
      res.status(400).json({
          "title": "Failed to find user account",
          "detail": `Failed to find user account because: ${err.message}.`
      })
  )
  
  const valid = await user.CheckValidPassword(password);

  if (valid) {
      const token = user.GenerateJwt(); 
      res.status(200).json({
        "token": token
      });
  } else {
      res.status(401).json({
         "title": "Unauthorized",
         "detail": "Wrong password"
      });
  }
};