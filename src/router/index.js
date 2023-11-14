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

// 重写编程式导航的push | replace 方法 以解决多次点击报错的问题
// 注意: 如防止报错push | replace 方法 的 this 必须指向 VueRouter的实例化对象

// 存储原本的 push和 replace 方法
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

// 自定义方法
VueRouter.prototype.push = function(loaction){
  // apply的第一个参数为修改的指向
  push.apply(this,[loaction, ()=>{}, ()=>{}]);
};

VueRouter.prototype.replace = function(loaction){
  // call的第一个参数为修该过后的指向
  replace.push(this,()=>{},()=>{});
}

// 配置路由并暴露
export default new VueRouter({
  // 模式 可以不配置
  mode:'hash',
  routes: [
    {
      path: '/home',
      component: Home,
      meta:{
        isActive: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta:{
        isActive: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta:{
        isActive: false
      }
    },
    {
      name:'search',
      path: '/search',
      component: Search,
      meta:{
        isActive: true
      }
    },
    {
      path: '/',
      redirect: '/home'
    }

  ]
})