'use strict';

let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development"
const target =devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  entry: './js/script.js',
  stats: {
    children: true,
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js/bundle'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],

  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test:/\.css$/i,
        use:[
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
};
