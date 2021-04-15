var webpack = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  ...webpack,
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['markdown'],
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
  ],
};
