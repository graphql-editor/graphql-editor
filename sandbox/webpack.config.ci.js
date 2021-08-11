var webpack = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  ...webpack,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
  ],
};
