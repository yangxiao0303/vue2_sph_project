// 引入封装好的请求发送函数
import {reqCategory} from '@/api';
export default {
  // 进行异步操作发送请求/业务逻辑
  actions: {
    goReqCategory({commit,state,dispatch,getters}){
      reqCategory().then(res =>commit('GETCATEGORY', res.data)
      )
    }
  },
  // 用纯函数进行状态更改
  mutations: {
    GETCATEGORY(state, category){
      state.category = category;
      console.log(state.category);
    }
  },
  // 存储状态
  state: {
    // 渲染回来的分类数据
    category:[]
  },
  // 计算属性
  getters: {
    
  },
  // 模块化仓库
  modules: {

  }
}