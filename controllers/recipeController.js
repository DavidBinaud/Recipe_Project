const axios = require("axios")
const db_config = require("./restdb.json")
const restdb_api_key = db_config.restdb_api_key
const restdb_db_url = db_config.restdb_db_url


// Display list of all recipes
exports.get_index = async function (req, res) {
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
        processError(error, res)
    } 
}

// Access a recipe
exports.recipe_get_informations = async function (req, res) {
    try {
        var recipeId = req.params.id

        var request = await axios ({
            method: 'GET',
            url: `https://${restdb_db_url}.restdb.io/rest/recipes/${recipeId}`,
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            }
        })
    
        console.log(request.data)
        res.json(request.data)
    } catch (error) {
        processError(error, res)
    }
}

// Create a recipe
exports.recipe_create = async function (req, res) {
    try {
        req.body.created_by = req.user
        var recipe = req.body;
        console.log(recipe)

        var request = await axios ({ 
            method: 'POST',
            data: recipe,
            url: `https://${restdb_db_url}.restdb.io/rest/recipes`,
            headers: {
                'cache-control': 'no-cache',
                'x-apikey': restdb_api_key,
                'content-type': 'application/json'
            },
            json: true 
        })
    
        console.log(request)
        
        res.json("Created")
    } catch (error) {
        processError(error, res)
    }
}

// Delete a recipe
exports.recipe_delete = async function (req, res) {
    try {
        console.error("USER IN DELETE", req.user)
        var recipeId = req.params.id
        if(req.user.isOwner){
            var request = await axios({
                method: 'DELETE',
                url: `https://${restdb_db_url}.restdb.io/rest/recipes/${recipeId}`,
                headers:
                {
                    'cache-control': 'no-cache',
                    'x-apikey': restdb_api_key,
                    'content-type': 'application/json'
                }
            })        

            console.log(request)
            res.status(201).send("Deleted")
        } else {
            res.status(403).json("Wrong User.")            
        }
    } catch (error) {
        processError(error, res)
    }
}

// Upload a recipe
exports.recipes_update = async function (req, res) {
    try {
        console.error("USER IN PUT", req.user)

        var recipe = req.body;

        if(req.user.isOwner) {
            var request = await axios ({ 
                method: 'PUT',
                data: { _id: recipe.id, title: recipe.title, description: recipe.description, creatorId: recipe.creatorId },
                url: `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`,
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': restdb_api_key,
                    'content-type': 'application/json'
                },
                json: true 
            })
        
            console.log(request)
            res.send(request)
        } else {
            res.status(403).send("Wrong User")
        }
    } catch (error) {
        processError(error, res)       
    }
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
