const webpack = require('webpack');
const merge = require('webpack-merge');
// const path = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  // 开发环境本地启动的服务配置
  devServer: {
    port: 9999,
    hot: true,
    open: true,
    // historyApiFallback: true,
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

  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
});
