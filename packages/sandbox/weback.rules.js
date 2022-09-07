module.exports = [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: '/node_modules/',
    options: { transpileOnly: true },
  },
  { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
  { test: /\.(jpg|gif)$/, use: 'file-loader' },
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
