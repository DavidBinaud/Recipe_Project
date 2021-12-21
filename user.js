var express = require('express');
var router = express.Router();
const axios = require('axios')
const db_config = require("./restdb.json")


router.post('/', async function (req, res){
	let url = `https://${db_config.restdb_db_url}.restdb.io/rest/recipes-users`
	console.error(url)
	const p = await axios.post(url, req.body,{
	    headers: {
	      "x-apikey": db_config.restdb_api_key
	    }
	});

	if(p.status === 201){
		res.status(201).send("Created")
	} else {
		res.status(401).send("There was an error")
	}
});


module.exports = router