module.exports = {
  upgrade: true,
  reject: [
    'clean-webpack-plugin', // 2.0.0+ can't work with multiple entries in webpack so we stick with 1.0
  ],
}