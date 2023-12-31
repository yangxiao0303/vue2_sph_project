// 引入vue核心代码
import Vue from "vue";
// 引入vuex插件
import Vuex from "vuex";
// 安装插件
Vue.use(Vuex);
// 引入创建好的仓库 module
import home from "./modules/home";
import search from "./modules/search";
import user from "./modules/user";
import detail from "./modules/detail";
import cart from "./modules/cart";
// 创建新的状态管理仓库并暴露
export default new Vuex.Store({
  modules:{
    home,
    user,
    search,
    detail,
    cart
  }
})