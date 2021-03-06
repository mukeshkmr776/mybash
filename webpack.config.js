const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'mycli.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  mode: 'production'
}
