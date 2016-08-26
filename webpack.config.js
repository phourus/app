require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/app'
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
        test: /\.(less|css)$/,
        loaders: ['style?sourcemap!css?modules&importLoaders=localIdentName=[name]__[local]___[hash:base64:5]!less'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
