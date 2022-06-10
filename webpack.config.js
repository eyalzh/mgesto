const path = require('path');

module.exports = {
  entry: './src/mgesto.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'fromEventTarget',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
};