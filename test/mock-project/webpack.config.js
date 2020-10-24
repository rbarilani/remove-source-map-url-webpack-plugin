const path = require("path");
const RemoveSourceMapUrlWebpackPlugin = require("../../index");

module.exports = {
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  plugins: [new RemoveSourceMapUrlWebpackPlugin()],
};
