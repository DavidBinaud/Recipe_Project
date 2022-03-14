const express = require('express')
const router = express.Router()

// Require controller modules
const userController = require('../controllers/userController')

/**
 * users routes
 */

// POST request for creating User
router.post('/user/create', userController.user_create)

// GET request for deleting user, user must be logged 
// #TODO
router.get('/:id/delete', userController.user_delete)

// POST request for updating user, user must be logged 
// #TODO
router.post('/update', userController.user_update)


// POST request for checking login informations, sets a JWT Token on success
// #TODO
router.post('/login', userController.user_authenticate)

// GET request for deleting user 
// #TODO
router.get('/:id/getUser', userController.user_get_informations)

module.exports = router