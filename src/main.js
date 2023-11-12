//引入vue2核心库
import Vue from 'vue'
//引入根组件:单文件组件.vue
import App from './App.vue'
// 引入全局组件
import Header from '@/components/header'
import Footer from '@/components/footer'
import TypeNav from '@/components/typenav'
// 放置全局组件
Vue.component("Header",Header);
Vue.component("Footer",Footer);
Vue.component("TypeNav",TypeNav);
// 引入全局清空样式
import '@/assets/reset.css'
// 引入配置好的路由规则
import router from '@/router'
// 引入配置好的状态管理仓库
import store from '@/store'
// 关闭开发模式提醒
Vue.config.productionTip = false;
//创建vm
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
