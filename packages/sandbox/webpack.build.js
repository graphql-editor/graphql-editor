var webpack = require('webpack');
var path = require('path');
var sourcePath = path.join(__dirname, './');
var outPath = path.join(__dirname, './out');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const baseRules = require('./weback.rules');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
/** @type {import('webpack').Configuration} */
module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx',
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/',
  },
  target: 'web',
  mode: 'production',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    plugins: [new TsConfigPathsPlugin({})],
  },
  module: {
    rules: [
      ...baseRules,
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
  ],
};
