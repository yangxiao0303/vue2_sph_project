// 引入 Vue 核心库
import Vue from "vue";
// 引入 VueRouter 插件
import VueRouter from "vue-router";
// 安装插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/home';
import Search from '@/pages/search';
import Login from '@/pages/login';
import Register from '@/pages/register';

// 配置路由并暴露
export default new VueRouter({
  // 模式 可以不配置
  mode:'hash',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/search',
      component: Search
    },

  ]
})