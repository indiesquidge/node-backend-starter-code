const express = require('express')
const path = require('path')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()
const app = express()

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/favorites.html'))
})

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
