var express = require('express');
var router = express.Router();
var adminstratorController = require('../controllers/adminstratorController');
const authentication = require('../authentication/authentication');

/**
 * @swagger
 * /adminstrators/updateRole:
 *   put:
 *     summary: Update user right to HotelManager
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
 *               username:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: HotelManager is assigned as a new role to user. 
*/

router.route('/updateRole').put(authentication.AuthenticateJWT, adminstratorController.UpdateUserRights);
  
module.exports = router;