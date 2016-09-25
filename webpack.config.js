require('babel-polyfill')
var path = require('path')
var webpack = require('webpack')
var values = require('postcss-modules-values')

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/react/browser'
  ],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'app.js',
    publicPath: 'http://phourus.local:3000/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
}
