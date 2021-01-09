const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][hash:8].js',
  },
  devServer: {
    port: 9001,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://175.24.40.189:8000',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api':''},
      },
    },
  },


}
