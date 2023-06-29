module.exports = [
  {
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: "/node_modules/",
    options: { transpileOnly: true },
  },
  { test: /\.(png|svg)$/, use: "url-loader?limit=10000" },
  { test: /\.(jpg|gif)$/, use: "file-loader" },
  {
    test: /\.(jpg|gif|svg|ttf|woff|eot|woff2|mp4|m4v)$/i,
    use: [{ loader: "file-loader", options: { esModule: false } }],
  },
];
