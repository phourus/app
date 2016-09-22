require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');
var values = require('postcss-modules-values');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/react/browser'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?presets[]=react&presets[]=es2015'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less$/,
        loaders: ['style?sourcemap', 'css', 'less'],
        include: path.join(__dirname, 'src/')
      },
      // {
      //   test: /\.css$/,
      //   loaders: ['style?sourcemap', 'css'],
      //   include: path.join(__dirname, 'src/')
      // },
      {
        test: /\.module.css$/,
        loaders: ['style?sourcemap', 'css?modules&importLoaders=localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader'],
        include: path.join(__dirname, 'src/')
      }
    ]
  },
  postcss: [
    values
  ]
};
