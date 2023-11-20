// 从 api 引入封装好的数据请求接口
import { reDeatil, reqAddOrUpdateCart } from "@/api/index";
// 定义并暴露详情页路由仓库
export default {
  // 进行异步操作
  actions: {
    async getGoodsDetail({ commit, dispatch, getters, state }, skuId) {
      const result = await reDeatil(skuId);
      commit("GETGOODSDETAIL", result.data);
    },
    async addCart({ commit, state, dispatch, getters }, { skuId, skuNum }) {
      // 发送请求
      const result = await reqAddOrUpdateCart(skuId, skuNum);
      // 判断返回数据
      if (result.code === 200) return "ok";
      else return Promise.reject(new Error("加入购物车失败"));
      // 此 addCart 异步函数返回的结果一定是一个 promise 对象,
      // 通过发送请求的到的结果的不同,来控制 addCart 返回的 promise 对象的成功或者失败的状态
      // 注意: ruturn ok 时, 会返回一个成功状态的promise对象, 其结果值为 "ok";
      // ruturn Promise.reject(new Error("加入购物车失败")); 时, 会返回一个失败的状态的 promise 对象, 其结果值为抛出的错误 "加入购物车失败"
    },
  },
  // 纯函数修改状态
  mutations: {
    GETGOODSDETAIL(state, goodsDetail) {
      state.goodsDetail = goodsDetail;
    },
  },
  // 存储商品详情相关状态
  state: {
    goodsDetail: {},
  },
  // 存储计算属性,用来简化属性
  getters: {
    categoryView(state) {
      return state.goodsDetail.categoryView || {};
    },
    skuInfo(state) {
      return state.goodsDetail.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodsDetail.spuSaleAttrList || [];
    },
    skuImageList(state) {
      return (state.goodsDetail.skuInfo || {}).skuImageList || [];
    },
  },
  // 存储 下级模块
  mudules: {},
};
