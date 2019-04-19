const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'asset': resolve('src/assets')
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