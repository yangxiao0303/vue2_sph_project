// 引入封装好的请求发送函数
import {reqCategory, reqBanner, reqFloor} from '@/api';
export default {
  // 进行异步操作发送请求/业务逻辑
  actions: {
    goReqCategory({commit,state,dispatch,getters}){
      reqCategory().then(res =>commit('GETCATEGORY', res.data)
      )
    },
    async goReqBanner({commit,state,dispatch,getters}){
      const result =  await reqBanner();
      commit('GETBANNER',result.data);
    },
    async goReqFloor({commit,state,dispatch,getters}){
      const result = await reqFloor();
      commit('GETFLOOR',result.data)
    }
  },
  // 用纯函数进行状态更改
  mutations: {
    GETCATEGORY(state, category){
      state.category = category;
    },
    GETBANNER(state, banner){
      state.banner = banner;
      console.log(state.banner);
    },
    GETFLOOR(state, floor){
      state.floor = floor;
      console.log(state.floor);
    }
  },
  // 存储状态
  state: {
    // 渲染回来的分类数据
    category:[],
    // 首页 banner 初始数据
    banner:[],
    // 首页 floor 初始数据
    floor: [],
  },
  // 计算属性
  getters: {
    
  },
  // 模块化仓库
  modules: {

  }
}