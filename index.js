const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
const db_config = require("./restdb.json")
const restdb_api_key = db_config.restdb_api_key
const restdb_db_url = db_config.restdb_db_url
const cors = require('cors')

////////////////////////////////////////////
const passport = require('passport')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecretForJWT'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}


passport.use(
  new JwtStrategy(jwtOptions, async function(payload, next) {
    let url = `https://${restdb_db_url}.restdb.io/rest/recipes-users`
    const users = await axios.get(url, {
      headers: {
        "x-apikey": restdb_api_key
      }
    });

    const user = users.data.find(user => user.email === payload.email)

    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })
)

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
