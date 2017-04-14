const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve('.'),
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve('.'),
    filename: '[name].bundle.js'
  }
}