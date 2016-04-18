 var webpack = require('webpack');

module.exports = {  
  entry: './app/src/boot.ts',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    root: './app',
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
  },
  /*plugins: [new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, minimize: false }
    })],*/
  module: {
    loaders: [
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader'
      }
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
};
