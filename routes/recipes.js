const express = require('express')
const router = express.Router()
const passport = require('../passport.js').passportJWT

// Require controller modules
const recipeController = require('../controllers/recipeController')
const checkOwnership = require('../controllers/userController').checkOwnership

/**
 * recipes routes
 */

/**
 *GET request to get list of every recipe and creators
 */
router.get('/', recipeController.get_index)

/**
 * POST request for creating a recipe
 */ 
router.post('/', passport.authenticate('jwt', { session: false }), recipeController.recipe_create)

/**
 * PUT request for updating a recipe
 */ 
router.put('/:id', passport.authenticate('jwt', { session: false }), checkOwnership, recipeController.recipes_update)

/**
 * DELETE request to delete recipe
 */ 
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkOwnership, recipeController.recipe_delete)

/**
 * GET request to access a recipe informations
 */ 
router.get('/:id', recipeController.recipe_get_informations)

module.exports = router