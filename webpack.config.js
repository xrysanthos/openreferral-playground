const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


let webpackConfig = {

  entry: './static/js/app/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/dist/')
  },

  devServer: {
    contentBase: path.join(__dirname, '/'),
    port: 8080
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]


};


/*
 * CSS bundles
 */

webpackConfig = merge(webpackConfig, {
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
});




module.exports = webpackConfig;
