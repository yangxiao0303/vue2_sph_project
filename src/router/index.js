// 引入 Vue 核心库
import Vue from "vue";
// 引入 VueRouter 插件
import VueRouter from "vue-router";
// 引入 编写好的路由规则
import routes from "./routes";

// 安装插件
Vue.use(VueRouter);

// 重写编程式导航的push | replace 方法 以解决多次点击报错的问题
// 注意: 如防止报错push | replace 方法 的 this 必须指向 VueRouter的实例化对象

// 存储原本的 push和 replace 方法
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

// 自定义方法
VueRouter.prototype.push = function(location){
  // apply的第一个参数为修改的指向
  push.apply(this,[location, ()=>{}, ()=>{}]);
};

VueRouter.prototype.replace = function(location){
  // call的第一个参数为修该过后的指向
  replace.push(this,()=>{},()=>{});
}

// 配置路由并暴露
export default new VueRouter({
  // 模式 可以不配置
  mode:'hash',
  // 编写好的路由规则
  routes,
  //滚动行为设置
    //当路由切换的时候,次函数会执行一次
    //from:从那个路由而言的路由对象
    //to:去的那个路由对象
    //savePosition:记录上一次滚动条位置
    scrollBehavior(to,from,saveP) {
      //vue-router@3:属性x,水平轴位置 y,决定垂直位置
      //vue-router@4属性left,水平轴位置top,决定垂直位置
      return {
          y: 0,//如果当前数值为负数,不生效相当于零!!!!!
      }
  }
})