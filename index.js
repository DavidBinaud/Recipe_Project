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

  //Send recipes back in JSON
  //let tab = p1.data.map(e => {return {"title": e.name}})
  //res.json(tab)
  

  //const html = await nunjucks.render('recipes.html', {recipes: p1.data})
  //res.send(html)
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

  const html = await nunjucks.render('recipe.html', {recipe: p1.data})
  
  res.send(html)
})

app.post('/recipes', express.json(), async function(req, res){
  let url = `https://${restdb_db_url}.restdb.io/rest/recipes`

  console.error(url)
  console.error(req.body)

  const p1 = await axios.post(url, req.body,{
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1)
  
  res.send("Created")
})


app.delete('/recipes/:id', async function(req, res){
  let url = `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`

  console.error(url)
  console.error(req.body)

  const p1 = await axios.delete(url, {
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1)
  
  res.send("Deleted")
})


app.put('/recipes/:id', express.json(), async function(req, res){
  let url = `https://${restdb_db_url}.restdb.io/rest/recipes/${req.params.id}`

  console.error(url)
  console.error(req.body)

  const p1 = await axios.put(url, req.body,{
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1)
  
  res.send("Updated")
})


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
