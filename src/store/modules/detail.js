// 从 api 引入封装好的数据请求接口
import { reDeatil } from "@/api/index";
// 定义并暴露详情页路由仓库
export default {
  // 进行异步操作
  actions: {
    async getGoodsDetail({ commit, dispatch, getters, state }, skuId) {
      const result = await reDeatil(skuId);
      commit("GETGOODSDETAIL", result.data);
    },
  },
  // 纯函数修改状态
  mutations: {
    GETGOODSDETAIL(state,goodsDetail) {
      state.goodsDetail = goodsDetail;
    },
  },
  // 存储商品详情相关状态
  state: {
    goodsDetail: {},
  },
  // 存储计算属性,用来简化属性
  getters: {
    categoryView(state){
      return state.goodsDetail.categoryView || {};
    },
    skuInfo(state){
      return state.goodsDetail.skuInfo || {};
    },
    spuSaleAttrList(state){
      return state.goodsDetail.spuSaleAttrList || [];
    }
  },
  // 存储 下级模块
  mudules: {},
};
