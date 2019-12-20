var webpack = require('webpack');
var path = require('path');
var sourcePath = path.join(__dirname, './');
var outPath = path.join(__dirname, './');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx',
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { configFile: 'sandbox/tsconfig.json' },
      },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['markdown'],
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
  ],
};
