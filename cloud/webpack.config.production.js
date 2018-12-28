var webpack = require('webpack');
var path = require('path');
var sourcePath = path.join(__dirname, './');
var outPath = path.join(__dirname, '../dist');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  mode: 'production',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
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
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './assets/index.html'
    })
  ]
};
