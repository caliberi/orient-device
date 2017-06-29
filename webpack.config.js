var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/orient.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'orient.js',
    libraryTarget: 'var',
    library: 'OrientDevice'
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  cache: false,
  stats: {
    colors: true
  },
  devtool: 'source-map'
};