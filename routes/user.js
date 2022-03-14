const express = require('express')
const router = express.Router()

// Require controller modules
const userController = require('../controllers/userController.js')

/**
 * users routes
 */

// POST request for creating User
router.post('/', userController.user_create)

// GET request for deleting user, user must be logged 
// #TODO
router.delete('/:id', userController.user_delete)

// POST request for updating user, user must be logged 
// #TODO
router.post('/update', userController.user_update)


// POST request for checking login informations, sets a JWT Token on success
// #TODO
router.post('/login', userController.user_authenticate)

// GET request for deleting user 
// #TODO
router.get('/:id', userController.user_get_informations)

module.exports = router