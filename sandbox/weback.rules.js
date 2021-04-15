module.exports = [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: '/node_modules/',
    options: { configFile: 'sandbox/tsconfig.json', transpileOnly: true },
  },
  { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
  { test: /\.(jpg|gif)$/, use: 'file-loader' },
  {
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader', options: { inline: true } },
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
];
