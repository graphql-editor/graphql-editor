var webpack = require('webpack');
var path = require('path');
var sourcePath = path.join(__dirname, './');
var outPath = path.join(__dirname, './');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const baseRules = require('./weback.rules');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
  mode: 'development',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
  },
  module: {
    rules: [
      ...baseRules,
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
