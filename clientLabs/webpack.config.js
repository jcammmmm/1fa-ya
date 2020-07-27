const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'sourcemaps',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};