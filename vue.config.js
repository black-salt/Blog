const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: '8190'
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3072',
    //     changeOrigin: true
    //   }
    // }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
