const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const config = {

  context: __dirname,

  entry: {
    'index.js':'./src/index.js',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]',
    libraryTarget: 'umd',
    library: 'PKCEClient'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.ProgressPlugin((prog) => {
        if(prog === 0) console.log("[webpack]: Bundle is now invalid.");
        if(prog === 1) console.log("[webpack]: Bundle is now valid.");
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: '@@PACKAGE_VERSION@@', replace: package.version },
            { search: '@@AUTH0JS_VERSION@@', replace: package.dependencies['auth0-js'] }
          ]
        }
      }
    ]
  }
}
module.exports = config;