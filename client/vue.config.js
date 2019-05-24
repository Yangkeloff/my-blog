const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@',resolve('src'))
      .set('style', resolve('src/assets/stylus'))
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
      }
    }
  },
  devServer: {
    proxy: {
      '/api':{  // 只代理 /api url下的请求
        target: "http://localhost:3000/", // 后台服务器的地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '' 
          /* 如果接口中是没有api的，那就直接置空，
          如果接口中有api，那就得写成{‘^/api’:‘/api’}
          */
        }
      }
    }
  }
}