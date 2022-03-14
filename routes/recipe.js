const express = require('express')
const router = express.Router()

// Require controller modules
const recipeController = require('../controllers/recipeController')

/**
 * recipes routes
 */

// GET recipes catalog
router.get('/recipes', recipeController.index)

// POST request for creating a recipe
router.post('/create', recipeController.recipe_create)

// GET request to delete recipe
router.get('/:id/delete', recipeController.recipe_delete)

// POST request to update recipe
router.post('/update', recipeController.recipe_update)

// GET request to access a recipe informations
router.get('/:id', recipeController.recipe_get_informations)

module.exports = router