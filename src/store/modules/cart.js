import {
  reqAddOrUpdateCart,
  reqChangeChecked,
  reqDeleteGoods,
  reqUserCart,
} from "@/api";

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
    // 删除购物车物品
    async deleteGoods({ commit, dispatch, state, getters }, skuId) {
      const result = await reqDeleteGoods(skuId);
      if (result.code === 200) return "ok";
      else return Promise.reject(new Error(result.message));
    },
    // 更新全部物品选中状态
    updateAllChecked({ commit, dispatch, state, getters }, isChecked) {
      // 定义一个空数组,用来接收 每次更新的 promise 对象
      const arr = [];
      // 遍历 state 中存储的的每一个商品,并进行更新
      getters.cartInfoList.forEach((goods) => {
        // 接收每次更新返回的promise 对象
        const p = dispatch("changeChecked", { skuId: goods.skuId, isChecked });
        // 存到数组中
        arr.push(p);
      });
      // 返回 (如 arr 中都为成功状态,则返回成功状态)
      return Promise.all(arr);
    },
    deleteAllChecked({ commit, dispatch, state, getters }) {
      // 定义一个空数组来存储每次更新的promise对象
      const arr = [];
      // 遍历购物车中所有的物品
      state.cartInfoList.forEach((goods) => {
        // 筛选被选中的商品
        if (goods.isChecked) {
          // 派发删除动作,并得到是否成功的promise对象
          const p = dispatch("deletGoods", goods.skuId);
          // 将得到的 promise 对象 加入到数组中
          arr.push(p);
        }
      });
      // arr中所有均为成功状态的promise则会得到一个成功状态的pomise
      return Promise.all(arr);
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
