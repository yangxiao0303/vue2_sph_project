//引入vue2核心库
import Vue from 'vue'
//引入根组件:单文件组件.vue
import App from './App.vue'
import Header from '@/components/header'
import Footer from '@/components/footer'
// 创建全局组件
Vue.component("Header",Header);
Vue.component("Footer",Footer);
// 引入全局清空样式
import '@/assets/reset.css'
//创建vm
new Vue({
  render: h => h(App),
}).$mount('#app')
