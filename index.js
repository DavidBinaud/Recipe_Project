const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
const restdb_api_key = "d8ce0ced64a77494d2b0c54c3d12734c1ba99"
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', async function (req, res) {
  const p1 = await axios.get('https://recipe-d6ba.restdb.io/rest/recipes', {
    headers: {
      "x-apikey": restdb_api_key
    }
  });

  console.log(p1.data)

  const html = await nunjucks.render('recipes.html', {recipes: p1.data})
  
  res.send(html)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
