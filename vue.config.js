const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //https://webpack.docschina.org/configuration/dev-server/#devserverproxy
  // 配置代理跨域
  devServer:{
    proxy:{
      '/api':{
        // 设置目标服务器地址
        target:'http://sph-h5-api.atguigu.cn',
        // 查看路径上有没有'/api'这个路径,如果有.要添加 路径重写配置
        
      }
    }
  }
})
