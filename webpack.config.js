// ==============
// Necessary requirements in order for the following settings to work properly
// =============
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

// ============
// Webpack settings
// ============
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  plugins: [
    new FaviconsWebpackPlugin("favicon.jpg"),
    new HtmlWebpackPlugin({
      title: "Weather APP",
      template: "template.html",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: {
          and: [/node_modules/], // Exclude libraries in node_modules ...
          not: [
            // Except for a few of them that needs to be transpiled because they use modern syntax
            /unfetch/,
            /d3-array|d3-scale/,
            /@hapi[\\/]joi-date/,
          ],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
