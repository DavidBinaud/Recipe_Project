const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
const restdb_api_key = "d8ce0ced64a77494d2b0c54c3d12734c1ba99"
const restdb_db_url = "recipe-d6ba"
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
    autoescape: true,
    express: app
});



////////////////////////////////////////////
const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecretForJWT'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

const users = [{ email: 'pcavalet@kaliop.com', password: 'kaliop' }]

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


const checkOwnership = async (req, res, next) => {
  console.error("USER TRYING", req.user)

  let urlGetRecipe = `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`

  const get = await axios.get(urlGetRecipe, {
    headers: {
      "x-apikey": restdb_api_key
    }
  });
  console.error("GET DATA:", get.data);
  req.user.isOwner = get.data.created_by[0]._id === req.user._id
  next()
}



//exemple d'accès limité
app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('private. user:' + req.user.email)
})


//permet de récuperer un JWT si email et pass correspond
app.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }

  let url = `https://${restdb_db_url}.restdb.io/rest/recipes-users`
  const users = await axios.get(url, {
      headers: {
        "x-apikey": restdb_api_key
      }
    });
  console.log(users);
  const user = users.data.find(user => user.email === email)

  console.log("\n\nUSER FOUND:")
  console.log(user)
  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }

  const userJwt = jwt.sign({ email: user.email }, secret)

  res.json({ jwt: userJwt })
})


///////////////////////////////////////////






app.get('/', function(req, res){
  const html = nunjucks.render('index.html')
  res.send(html)
  res.send()
})


app.get('/recipes', async function (req, res) {
  let url = `https://${restdb_db_url}.restdb.io/rest/recipes`
  const p1 = await axios.get(url, {
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1.data)
  res.json(p1.data)
})

app.get('/recipe/:id', async function(req, res){
  let url = `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`

  console.error(url)

  const p1 = await axios.get(url, {
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1.data)
  res.json(p1.data)
})

app.post('/recipes', passport.authenticate('jwt', { session: false }), async function(req, res){
  let url = `https://${restdb_db_url}.restdb.io/rest/recipes`

  console.error(url)
  console.error(req.body)
  req.body.created_by = req.user
  const p1 = await axios.post(url, req.body,{
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1)
  
  res.send("Created")
})


app.delete('/recipes/:id', passport.authenticate('jwt', { session: false }), checkOwnership, async function(req, res){
  console.error("USER IN DELETE", req.user)
  if(req.user.isOwner){
    let url = `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`
    const p1 = await axios.delete(url, {
      headers: {
        "x-apikey": restdb_api_key
      }
    });
    res.status(201).send("Deleted")
  } else {
    res.status(403).send("Wrong User.")
  }
})


app.put('/recipes/:id', passport.authenticate('jwt', { session: false }), checkOwnership, async function(req, res){

  console.error("USER IN PUT", req.user)
  if(req.user.isOwner){
    let urlPutRecipe = `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`
    const put = await axios.put(urlPutRecipe, req.body,{
      headers: {
        "x-apikey": restdb_api_key
      }
    });
      res.status(201).send("Updated")
  } else {
    res.status(403).send("Wrong User.")
  }

})


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
