/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

/**
 * This webpack config is only for hotreloading client codes and intended for src/server/dev-server
 * Dev-server uses client webpack as a middleware to enable hotreloading. Everything server restarts
 * client side loses websocket connection, so we don't do watch mode for server webpack.
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');

const server = common({}, { mode: 'development' })[1];

module.exports = merge(server, {
  entry: {
    server: path.join(__dirname, 'src/server/devServer/index.ts'),
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  node: {
    __dirname: true, // resolve "EACCES: permission denied, mkdir '/dist'" error
  },
});
