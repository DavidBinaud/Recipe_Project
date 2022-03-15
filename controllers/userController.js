const axios = require("axios")
const db_config = require("../restdb.json")
const restdb_api_key = db_config.restdb_api_key
const restdb_db_url = db_config.restdb_db_url

const jwt = require('jsonwebtoken')
const secret = 'thisismysecretForJWT'

/**
 * Creates a user
 */ 
exports.user_create =  async function (req, res) {
    try {
        var user = req.body;
        console.log(user)

        var request = await axios ({ 
            method: 'POST',
            data: user,
            url: `https://${restdb_db_url}.restdb.io/rest/recipes-users`,
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            },
            json: true 
        })
    
        console.log(request.status)

        res.status(request.status).json({status:"ok"})
        return
    } catch (error) {
        processError(error, res)
    }
}


/**
 * Deletes a user
 */ 
exports.user_delete =  async function (req, res) {
    try {
        var userId = req.params.id

        var request = await axios({
            method: 'DELETE',
            url: `https://${restdb_db_url}.restdb.io/rest/recipes-users/${userId}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            }
        })        

        console.log(request)
        res.status(request.status)
    } catch (error) {
        processError(error, res)
    }
}

/**
 * Updates a user's info
 */ 
exports.user_update =  async function (req, res) {
    try {
        var userId = req.params.id

        var user = req.body;
        console.log(user)
        var request = await axios({
            method: 'PUT',
            data: user,
            url: `https://${restdb_db_url}.restdb.io/rest/recipes-users/${userId}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            },
            json: true
        })

        console.log(request)
        res.status(request.status)
    } catch (error) {
        processError(error, res)
    }
}

/**
 * Authenticates as a user 
 * Returns the a jwt if email and password match
 */ 
exports.user_authenticate =  async function (req, res) {
        const email = req.body.email
        const password = req.body.password
      
        if (!email || !password) {
          res.status(401).json({ error: 'Email or password was not provided.' })
          return
        }

        var users = await axios({
            method: 'GET',
            url: `https://${restdb_db_url}.restdb.io/rest/recipes-users`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            }
        })
    

        console.log(users);
        const user = users.data.find(user => user.email === email)

        console.log("\nUSER FOUND:")
        console.log(user)

        if (!user || user.password !== password) {
          res.status(401).json({ error: 'Email / password do not match.' })
          return
        }
      
        const userJwt = jwt.sign({ email: user.email }, secret)
      
        res.json({ jwt: userJwt , username: user.username}) 
}

/**
 * Accesses a user's data
 */ 
exports.user_get_informations =  async function (req, res) {
    try {
        var userId = req.params.id

        var request = await axios ({
            method: 'GET',
            url: `https://${restdb_db_url}.restdb.io/rest/recipes-users/${userId}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            }
        })
    
        console.log(request.data)
        res.send(request.data)
    } catch (error) {
        processError(error, res)
    }
}

/**
 *  Checks wether a user owns the recipe he wants to update or delete
 */ 
exports.checkOwnership = async (req, res, next) => {
    console.error("USER TRYING", req.user)
    
    let userId = req.params.id

    let request = await axios ({
        method: 'GET',
        url: `https://${restdb_db_url}.restdb.io/rest/recipes/${userId}`,
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': restdb_api_key,
            'content-type': 'application/json'
        }
    })

    if (!request.data.hasOwnProperty("created_by")) {
        return res.status(404).json({ error: "Recipe does not exist" })
    }

    console.error("GET DATA:", request.data);
    
    req.user.isOwner = request.data.created_by[0]._id === req.user._id
    next()
  }
  
function processError(error, res) {
    console.log(error.config)
    if (error.response) { // get response with a status code not in range 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        res.sendStatus(error.response.status)
    } else if (error.request) { // no response
        console.log(error.request)
        res.send(error.request)
    } else { // Something wrong in setting up the request
        console.log('Error', error.message)
        res.send(error.message)
    }
}
