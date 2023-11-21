import { reqUserCode } from "@/api";
export default {
  // 进行异步操作发送请求/业务逻辑
  actions: {
    async getCode({commit,dispatch,state,getters},phone){
      // 发送请求,获取验证码
      const result = await reqUserCode(phone);
      // 如果成功
      if(result.code === 200){
        // 给 mutation 派发动作, 存储 code
        commit('GETUSERCODE',result.data);
        // 异步函数中的 return 为返回的 promise 对象的结果值,同时也回影响返回的 promise 对象的状态
        // return 字符串 则会返回一个成功状态的 promise 对象, 其结果值为 ok
        return 'ok';
        // 失败, 返回一个失败状态的 promise 对象
      } else return Promise.reject(new Error(result.message));
    }
  },
  // 用纯函数进行状态更改
  mutations: {
   GETUSERCODE(state,code){
    state.code = code;
    console.log(state.code);
   }
  },
  // 存储状态
  state: {
    code:"",
  },
  // 计算属性
  getters: {
    
  },
  // 模块化仓库
  modules: {

  }
};