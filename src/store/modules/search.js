// 引入封装好的api接口
import {reqGoodsList} from '@/api'
export default  {
  // 进行异步操作发送请求/业务逻辑
  actions: {
    async getGoods({commit,dispatch,getters,state}, payload){
      const result = await reqGoodsList(payload);
      commit("GETGOODS",result.data);
    }
  },
  // 用纯函数进行状态更改
  mutations: {
   GETGOODS(state,goods){
    state.goodsInfo = goods;
    console.log(state.goodsInfo);
   }
  },
  // 存储状态
  state: {
    // 搜索回来的商品信息
    goodsInfo:{}
  },
  // 计算属性
  getters: {
    
  },
  // 模块化仓库
  modules: {

  }
}