var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    __dirname + '/app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      {test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"]},
      {test: /\.scss$/, exclude: /node_modules/, loaders: ["style-loader", "css-loader", "sass-loader"]},
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HTMLWebpackPluginConfig
  ]
}
