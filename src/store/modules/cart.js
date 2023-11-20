import { reqAddOrUpdateCart, reqChangeChecked, reqUserCart } from "@/api";

export default {
  // 进行异步操作发送请求/业务逻辑
  actions: {
    // 获取用户的购物车数据
    async getUserCart({ commit, dispatch, state, getters }) {
      const result = await reqUserCart();
      commit("GETUSERCART", result.data);
    },
    // 改变商品点击状态
    async changeChecked(
      { commit, dispatch, state, getters },
      { skuId, isChecked }
    ) {
      const result = await reqChangeChecked(skuId, isChecked);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 改变购物车商品数量
    async updateNumber(
      { dispatch, commit, getters, state },
      { skuId, skuNum }
    ) {
      const result = await reqAddOrUpdateCart(skuId, skuNum);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  // 用纯函数进行状态更改
  mutations: {
    // 更新本地存储的购物车数据
    GETUSERCART(state, cart) {
      state.cart = cart;
    },
  },
  // 存储状态
  state: {
    cart: [], // 用户的购物车
  },
  // 计算属性
  getters: {
    // 简化需要使用的购物车数据
    cartInfoList(state) {
      return (state.cart[0] || {}).cartInfoList || [];
    },
  },
  // 模块化仓库
  modules: {},
};
