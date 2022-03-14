const passport = require('passport')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecretForJWT'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const db_config = require("./restdb.json")
const restdb_api_key = db_config.restdb_api_key
const restdb_db_url = db_config.restdb_db_url
const axios = require('axios')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

/**
 * Checks whether the client token corresponds to any user jsw in db or not
 * Returns user if there is a match
 */
exports.passportJWT = passport.use(
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