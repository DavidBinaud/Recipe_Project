const express = require('express')
const router = express.Router()

// Require controller modules
const recipeController = require('../controllers/recipeController')

/**
 * recipes routes
 */


/**
 * GET request for getting a recipe
 */ 
router.get('/:id', recipeController.recipe_get_informations)

module.exports = router