const axios = require("axios")
const db_config = require("../restdb.json")
const restdb_api_key = db_config.restdb_api_key
const restdb_db_url = db_config.restdb_db_url


/**
 * Displays the list of all recipes in db
*/ 
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
            return trimRecipe(e)
        })

        res.send(result)
    } catch (error) {
        processError(error, res)
    } 
}

/**
 * Returns a recipe from its id
 * 
 * @apiParam {String} id id of the recipe
 */ 
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

        if (request.data.length === 0) {
            return res.status(404).json({ error:'Recipe not found'})
        }

        let data = trimRecipe(request.data)
    
        console.log(data)
        res.json(data)
    } catch (error) {
        processError(error, res)
    }
}

/**
 * Creates a recipe
*/ 
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
        
        res.status(201).json({"status":"Created"})
        return
    } catch (error) {
        processError(error, res)
    }
}

/**
 * Deletes a recipe
 */ 
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

/**
 * Uploads a recipe
 */
exports.recipes_update = async function (req, res) {
    try {
        console.error("USER INPUT", req.body)

        let recipeId = req.params.id;
        let recipe = req.body;

        if(req.user.isOwner) {
            let request = await axios ({ 
                method: 'PUT',
                data: recipe,
                url: `https://${restdb_db_url}.restdb.io/rest/recipes/${recipeId}`,
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': restdb_api_key,
                    'content-type': 'application/json'
                },
                json: true 
            })
        
            console.log(request.status)
            res.status(201).json({'status':'ok'})
            return
        } else {
            res.status(403).json({ "error":"Wrong User" })
            reutrn
        }
    } catch (error) {
        processError(error, res)       
    }
}

/**
 * Returns an object with desired informations from a recipe
 * @param {Object} e 
 * @returns Object
 */
function trimRecipe(e) {
    let data = {
        "id": e._id,
        "name": e.name,
        "steps": e.steps,
        "items": e.items
    }

    if (e.hasOwnProperty("created_by")) {
        data.created_by = {
            "id": e.created_by[0]._id,
            "username": e.created_by[0].username
        }
    } else {
        data.created_by = {
            "id": undefined,
            "username": "anon"
        }
    }

    return data
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
