module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },  
  devServer: {
    // host: '10.28.140.154',
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.bupt404.cn/sp/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
  },
  publicPath: './'
}