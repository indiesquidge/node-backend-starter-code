const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

// middleware to handle JSON parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/favorites.html'))
})

// API endpoint to retrieve favorites
app.get('/favorites.json', (req, res) => {
  const favorites = fs.readFileSync('./favorites.json')
  res.setHeader('Content-Type', 'application/json')
  res.send(favorites)
})

// API endpoint to add to favorites
app.post('/favorites.json', (req, res) => {
  // don't allow POST requests missing a "Title" attr in the request body
  // (this isn't all that secure; more for demonstration purposes)
  if (!req.body.Title) {
    const requestBody = JSON.stringify(req.body, null, 2)
    return res.status(422).send(`Reqest body invalid:\n\n${requestBody}\n\nPlease send a movie object with a Title.`)
  }

  // adding to favorites with the movie ID as the key
  // this way we don't get duplicate favorites
  const favorites = JSON.parse(fs.readFileSync('./favorites.json'))
  favorites[req.body.imdbID] = req.body
  fs.writeFile('./favorites.json', JSON.stringify(favorites))
  res.setHeader('Content-Type', 'application/json')
  res.send(favorites)
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
