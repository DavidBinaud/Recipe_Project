const myCorsApiKey = "61dc114404970f0d8b62936e"
const axios = require("axios")
const db_config = require("./restdb.json")
const restdb_api_key = db_config.restdb_api_key


// Display list of all recipes
exports.index = async function (req, res) {
    try {
        var request = await axios({
            method: 'GET',
            url: `https://${restdb_db_url}.restdb.io/rest/recipes`,
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            }
        })

        let result = request.data.map(e => {
            return {
                "id": e._id,
                "name": e.name,
                "steps": e.steps,
                "items": e.items,
                "created_by": {
                    "id": e.created_by[0].id,
                    "username": e.created_by[0].username
                }
            }

        })

        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error.config);
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.sendStatus(error.response.status)
        } else if (error.request) { // no response
            console.log(error.request);
            res.send(error.request)
        } else { // Something wrong in setting up the request
            console.log('Error', error.message);
            res.send(error.message)
        }
    } 
}

app.get('/recipes', async function (req, res) {
    let url = 
    const p1 = await axios.get(url, {
      headers: {
        "x-apikey": 
      }
    });
  
    console.log(p1.data)
    res.json(p1.data)
  })


// Access a recipe
exports.recipe_get_informations = async function (req, res) {
    try {
        var recipeId = req.params.id

        var request = await axios ({
            method: 'GET',
            url: 'https://simplefood-97be.restdb.io/rest/recipe/' + recipeId,
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': myCorsApiKey,
                'content-type': 'application/json'
            }
        })
    
        console.log(request.data)
        res.send(request.data)
    } catch (error) {
        console.log(error.config);
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.sendStatus(error.response.status)
        } else if (error.request) { // no response
            console.log(error.request);
            res.send(error.request)
        } else { // Something wrong in setting up the request
            console.log('Error', error.message);
            res.send(error.message)
        }
    }
}

// Create a recipe
exports.recipe_create = async function (req, res) {
    try {
        var recipe = req.body;
        console.log(recipe)
        var request = await axios ({ 
            method: 'POST',
            data: { title: recipe.title, description: recipe.description, creatorId: recipe.creatorId },
            url: 'https://simplefood-97be.restdb.io/rest/recipe',
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': myCorsApiKey,
                'content-type': 'application/json'
            },
            json: true 
        })
    
        console.log(request)
        // res.send(result)
    } catch (error) {
        console.log(error.config);
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.sendStatus(error.response.status)
        } else if (error.request) { // no response
            console.log(error.request);
            res.send(error.request)
        } else { // Something wrong in setting up the request
            console.log('Error', error.message);
            res.send(error.message)
        }
    }
}

// Delete a recipe
exports.recipe_delete = async function (req, res) {
    try {
        var recipeId = req.params.id

        var request = await axios({
            method: 'DELETE',
            url: 'https://simplefood-97be.restdb.io/rest/recipe/' + recipeId,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': 'e29e5df5eb33037d3006fd0ee7f6117b1eccd',
                'content-type': 'application/json'
            }
        })        

        console.log(request)
        res.send(request.data)
    } catch (error) {
        console.log(error.config);
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.sendStatus(error.response.status)
        } else if (error.request) { // no response
            console.log(error.request);
            res.send(error.request)
        } else { // Something wrong in setting up the request
            console.log('Error', error.message);
            res.send(error.message)
        }
    }
}

// Upload a recipe
exports.recipe_update = async function (req, res) {
    try {
        var recipe = req.body;
        console.log(recipe)
        var request = await axios ({ 
            method: 'PUT',
            data: { _id: recipe.id, title: recipe.title, description: recipe.description, creatorId: recipe.creatorId },
            url: 'https://simplefood-97be.restdb.io/rest/recipe',
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': myCorsApiKey,
                'content-type': 'application/json'
            },
            json: true 
        })
    
        console.log(request)
        res.send(request)
    } catch (error) {
        console.log(error.config);
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.sendStatus(error.response.status)
        } else if (error.request) { // no response
            console.log(error.request);
            res.send(error.request)
        } else { // Something wrong in setting up the request
            console.log('Error', error.message);
            res.send(error.message)
        }
    }
}
