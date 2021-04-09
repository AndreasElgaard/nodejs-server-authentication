var express = require('express');
var router = express.Router();
var hotelManagerController = require('../controllers/hotelManagerController');
const authentication = require('../authentication/authentication');

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: List of all hotels
 *     description: Retrieves a lits of all registered hotels
 *     parameters:
 *     - name: auth
 *       in: header
 *       description: Authorization header
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: List of hotels.
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
 *                       name:
 *                         type: string
 *                         description: The name of the hotel.
 *                       rooms:
 *                         type: array
 *                         description: The number of rooms.
 *                       manager:
 *                         type: string
 *                         description: The name of the manager for the hotel.
 */

router.route('').get(authentication.AuthenticateJWT, hotelManagerController.listHotels);

 /**
 * @swagger
 * /hotels/createHotel:
 *   post:
 *     summary: Create a hotel.
 *     parameters:
 *     - name: auth
 *       in: header
 *       description: Authorization header
 *       required: true
 *       type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               manager:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Created
*/

router.route('/createHotel').post(authentication.AuthenticateJWT, hotelManagerController.createHotel);

/**
 * @swagger
 * /hotels/addRooms:
 *   post:
 *     summary: Add rooms to a existing hotel.
 *     parameters:
 *     - name: auth
 *       in: header
 *       description: Authorization header
 *       required: true
 *       type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelName:
 *                 type: string
 *                 required: true
 *               roomsToAdd: 
 *                 type: integer
 *                 required: true
 *     responses:
 *       200:
 *         description: Status of creation
*/

router.route('/addRooms').post(authentication.AuthenticateJWT, hotelManagerController.createRoom);

/**
 * @swagger
 * /hotels/rooms/{hotelName}:
 *   get:
 *     summary: List of all free rooms
 *     description: Retrieves a list of all free rooms at hotel
 *     parameters:
 *       - in: path
 *         name: hotelName      
 *         description: Name of hotel
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of free rooms at hotel.
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
 *                       freeRooms:
 *                         type: array
 *                         description: All free rooms.
 */

router.route('/rooms/:hotelName').get(hotelManagerController.listFreeRooms);

/**
 * @swagger
 * /hotels/rooms/createBooking:
 *   put:
 *     summary: Book a room at a hotel.
 *     parameters:
 *     - name: auth
 *       in: header
 *       description: Authorization header
 *       required: true
 *       type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelName:
 *                 type: string
 *                 required: true
 *               roomNumber: 
 *                 type: integer
 *                 required: true
 *     responses:
 *       200:
 *         description: Status of creation
 */

router.route('/rooms/createBooking').put(authentication.AuthenticateJWT, hotelManagerController.bookRoom);

module.exports = router;