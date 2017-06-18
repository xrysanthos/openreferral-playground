const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


let webpackConfig = {

  context: path.resolve(__dirname, 'src/js'),

  entry: {
    base: './app/base.js',
    'validators-resource': './app/features/validators/resource.js',
    'validators-datapackage': './app/features/validators/datapackage.js'
  },

  output: {
    path: path.resolve(__dirname, 'src/static/dist/'),
    filename: '[name].bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'src//'),
    port: 8080
  },

  plugins: [

    new ExtractTextPlugin('styles.css'),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      Dropzone: 'dropzone'
    })
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
