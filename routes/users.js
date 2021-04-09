var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController')
var registerController = require('../controllers/registerController')
var loginController = require('../controllers/loginController')


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the list of users in the database
 *     description: Retrieve a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         description: The users name.
 *                       password:
 *                         type: string
 *                         description: The users password.
 *                       role: 
 *                          type: string 
 *                          description: The users role in the system
 * 
 */

router.route('/').get(userController.listsUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a user. Set role to either - Administrator, User og Guest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true             
 *               password: 
 *                 type: string
 *                 required: true
 *               role: 
 *                 type: string
 *                 required: false
 *                 
 *     responses:
 *       200:
 *         description: Created
*/
router.route('/register').post(registerController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login as an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true             
 *               password: 
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Returns status of login attempt
 */

router.route('/login').post(loginController.loginUser);

module.exports = router;
