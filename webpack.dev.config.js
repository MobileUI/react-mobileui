const path = require('path')
const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const env = process.env.WEBPACK_BUILD || 'development'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackDevConfig = require('./webpack.base.config')('development')
const webpackProdConfig = require('./webpack.base.config')('production')

const paths = [
  '/',
  '/components/',
  '/components/base/',
  '/components/button/'
]

const config = [{
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    stats: {
      chunks: false
    }
  },
  entry: {
    main: './docs/lib/app'
  },
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js',
    path: './build',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([{ from: './docs/static', to: 'assets' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new StaticSiteGeneratorPlugin('main', paths, {}),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('/assets/style.css')
  ],
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      'bootstrap-css': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
      'react-mobileui': path.resolve('./src')
    }
  }
}]

if (env === 'development') {
  config.push(webpackDevConfig)
  config.push(webpackProdConfig)
} else {
  config[0].plugins.push(new webpack.optimize.UglifyJsPlugin(
    {
      minimize: true,
      compress: {
        warnings: false
      },
      mangle: true
    }
  ))
}

module.exports = config
