//引入vue2核心库
import Vue from 'vue'
//引入根组件:单文件组件.vue
import App from './App.vue'
// 引入 vue-awesome-swiper 
import { Swiper,SwiperSlide } from 'vue-awesome-swiper'
// 引入 Swiper,SwiperSlide 样式
import "swiper/css/swiper.min.css"
// 放置 轮播图组件
Vue.component("Swiper",Swiper);
Vue.component("SwiperSlide",SwiperSlide);
// 引入全局组件
import global from '@/components/global';
// 安装使用自定义插件
Vue.use(global);
// 引入全局清空样式
import '@/assets/reset.css'
// 引入配置好的路由规则
import router from '@/router'
// 引入配置好的状态管理仓库
import store from '@/store'
// 引入配置好的 mock 接口
import '@/mock/mockServe'
// 关闭开发模式提醒
Vue.config.productionTip = false;
//创建vm
new Vue({
  render: h => h(App),
  router,
  store,
  // 在组件创建之前: 子组件还没创建
  beforeCreate() {
    // Vue.prototype上绑的属性和方法所有的vc都可以用
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
