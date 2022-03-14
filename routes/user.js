const express = require('express')
const router = express.Router()

// Require controller modules
const userController = require('../controllers/userController.js')

/**
 * users routes
 */

// POST request for creating User
router.post('/', userController.user_create)

module.exports = router