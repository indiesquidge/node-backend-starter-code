const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/favorites', (req, res) => {
  const data = fs.readFileSync('./data.json')
  res.setHeader('Content-Type', 'application/json')
  res.send(data)
})

app.get('favorites', (req, res) => {
  if (!req.body.name || !req.body.oid) {
    res.send('Error')
    return
  }

  const data = JSON.parse(fs.readFileSync('./data.json'))
  data.push(req.body)
  fs.writeFile('./data.json', JSON.stringify(data))
  res.setHeader('Content-Type', 'application/json')
  res.send(data)
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
