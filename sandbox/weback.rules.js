module.exports = [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: { configFile: 'sandbox/tsconfig.json' },
  },
  { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
  { test: /\.(jpg|gif)$/, use: 'file-loader' },
  {
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader', options: { inline: true } },
  },
];
