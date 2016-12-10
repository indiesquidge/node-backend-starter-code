const express = require('express')
const path = require('path')

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 3000
const publicPath = path.resolve(__dirname, 'public')

// We point to our static assets
app.use(express.static(publicPath))

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port)
})
