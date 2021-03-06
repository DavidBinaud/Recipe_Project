const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 
const cors = require('cors')
const passport = require('passport')

////////////////////////////////////////////
/////////////// Middlewares ////////////////
////////////////////////////////////////////

// JWT middleware
app.use(passport.initialize())

app.use(express.json())

// CORS headers
app.use(cors())

////////////////////////////////////////////
///////////////// Routing //////////////////
////////////////////////////////////////////

// Routers
const userRouter = require('./routes/user')
const loginRouter = require('./routes/auth')
const recipesRouter = require('./routes/recipes')
const recipeRouter = require('./routes/recipe')

// Routes
app.use('/recipe', recipeRouter)
app.use('/recipes', recipesRouter)
app.use('/users', userRouter)
app.use('/login', loginRouter)

////////////////////////////////////////////
///////////////// Lauching /////////////////
////////////////////////////////////////////

app.listen(PORT, function () {
  console.log('app listening on port ' + PORT)
})
