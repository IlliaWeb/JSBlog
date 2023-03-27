const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    devServer: {
        //contentBase: __dirname + '/dist'
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename:'style.css'
      })
    ],
    resolve: {
        extensions: ['.js']//shouldn`t write '.js' to files
    },

      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
      }
}