const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
const db_config = require("./restdb.json")
const restdb_api_key = db_config.restdb_api_key
const restdb_db_url = db_config.restdb_db_url
const cors = require('cors')
const passport = require('passport')

////////////////////////////////////////////

app.use(passport.initialize())

app.use(express.json())

// CORS headers
app.use(cors())

// Routers
const userRouter = require('./routes/user')
const recipesRouter = require('./routes/recipes')
const recipeRouter = require('./routes/recipe')

// Routes
app.use('/recipe', recipeRouter)
app.use('/recipes', recipesRouter)
app.use('/user', userRouter)

///////////////////////////////////////////

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
