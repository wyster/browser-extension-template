const path = require("path");
const JavaScriptObfuscator = require("webpack-obfuscator");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const WebextensionPlugin = require("webpack-webextension-plugin");

module.exports = (env, params) => {
  const config = {
    devtool: "cheap-module-source-map",
    entry: {
      background: "./src/background.js",
      content: "./src/content.js",
      page: "./src/page.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new CleanWebpackPlugin({ verbose: true }),
      new Dotenv(),
      new WebextensionPlugin({
        vendor: "chrome",
      }),
    ],
  };

  if (params.mode === "production") {
    config.plugins.push(
      new JavaScriptObfuscator({
        rotateUnicodeArray: true,
      })
    );
    config.plugins.push(
      new FileManagerPlugin({
        onEnd: {
          archive: [
            {
              source: "./dist",
              destination: "./dist/extension.zip",
              format: "zip",
            },
          ],
        }
      })
    );
  }

  return config;
};
