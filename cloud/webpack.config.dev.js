var webpack = require('webpack');
var path = require('path');
var sourcePath = path.join(__dirname, './');
var outPath = path.join(__dirname, '../dist');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader?configFileName=./cloud/tsconfig.json'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]'
            }
          }
        ]
      },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif|svg|ttf|woff|eot)$/, use: 'file-loader' },
      {
        test: /\.gql$/i,
        use: 'raw-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  }
};
