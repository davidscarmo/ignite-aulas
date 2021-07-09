const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production", //set which mode to build the project can be development or production
  devtool: isDevelopment ? "eval-source-map" : "source-map", //it tracks the error from the built script and shows the location of the error in the no built code
  entry: path.resolve(__dirname, "src", "index.jsx"), //set the main file of project
  // define the output path and filename
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), //set public/index.html as template for the index.html generated
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // add extensions that webpack will be able to resolve
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"), //set the base path base for the fast refresh
  },
  module: {
    // combine babel and webpack and defines .jsx files will be resolved by babel-loader
    rules: [
      { test: /\.jsx$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
