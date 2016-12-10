const path = require('path')
const buildPath = path.resolve(__dirname, 'public', 'build')
const mainPath = path.resolve(__dirname, 'app', 'main.js')
const favoritesPath = path.resolve(__dirname, 'app', 'favorites.js')

const mainConfig =  {
  entry: [
    // Polyfill for `fetch` web API (because Safari is slacking)
    'whatwg-fetch',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'main.bundle.js',
    publicPath: '/build/'
  },
}

const favoritesConfig = {
  entry: [
    'whatwg-fetch',
    favoritesPath
  ],
  output: {
    path: buildPath,
    filename: 'favorites.bundle.js',
    publicPath: '/build/'
  },
}

module.exports = [
  mainConfig, favoritesConfig
]
