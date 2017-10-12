const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './src/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + "/src/",
    filename: "app.min.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  }
};

