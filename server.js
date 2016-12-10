const express = require('express')
const path = require('path')
const fs = require('fs')
const httpProxy = require('http-proxy')
const bodyParser = require('body-parser')

const proxy = httpProxy.createProxyServer()
const app = express()

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT

app.use('/assets', express.static(path.join(__dirname, 'app', 'assets')))

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

// We only want to run the workflow when not in production
if (isDeveloping) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment.
  const bundle = require('./server/bundle.js')
  bundle()

  // Any requests to localhost:3000/build
  // is proxied to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    })
  })

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...')
})

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
