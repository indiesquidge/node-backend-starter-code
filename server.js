const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/favorites', express.static(path.join(__dirname, 'public/favorites.html')))

app.get('/favorites.json', (req, res) => {
  const favorites = fs.readFileSync('./favorites.json')
  res.setHeader('Content-Type', 'application/json')
  res.send(favorites)
})

app.post('/favorites.json', (req, res) => {
  if (!req.body.Title) {
    const requestBody = JSON.stringify(req.body, null, 2)
    return res.status(422).send(`Reqest body invalid:\n\n${requestBody}\n\nPlease send a movie object with a Title.`)
  }

  const favorites = JSON.parse(fs.readFileSync('./favorites.json'))
  favorites[req.body.imdbID] = req.body
  fs.writeFile('./favorites.json', JSON.stringify(favorites))
  res.setHeader('Content-Type', 'application/json')
  res.send(favorites)
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')} in ${app.settings.env} mode`)
});
