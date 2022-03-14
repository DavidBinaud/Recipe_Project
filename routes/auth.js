const express = require('express')
const router = express.Router()

// Require controller modules
const userController = require('../controllers/userController.js')

/**
 * auth routes
 */

// POST request for checking login informations, sets a JWT Token on success
router.post('/', userController.user_authenticate)

module.exports = router