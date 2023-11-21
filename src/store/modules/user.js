import { reqUserCode, reqUserLogin, reqUserRegister } from "@/api";
export default {
  // 进行异步操作发送请求/业务逻辑
  actions: {
    // 注册页面获取验证码
    async getCode({ commit, dispatch, state, getters }, phone) {
      // 发送请求,获取验证码
      const result = await reqUserCode(phone);
      // 如果成功
      if (result.code === 200) {
        // 给 mutation 派发动作, 存储 code
        commit("GETUSERCODE", result.data);
        // 异步函数中的 return 为返回的 promise 对象的结果值,同时也回影响返回的 promise 对象的状态
        // return 字符串 则会返回一个成功状态的 promise 对象, 其结果值为 ok
        return "ok";
        // 失败, 返回一个失败状态的 promise 对象
      } else return Promise.reject(new Error(result.message));
    },
    // 注册页面-注册新用户
    async userRegister({ dispatch, commit, state, getters }, data) {
      // 发送请求,接收返回值
      const result = await reqUserRegister(data);
      // 如果注册成功 --> 返回一个 成功状态的promise
      if (result.code === 200) return "ok";
      // 不成功 --> 返回一个失败状态的 promise
      else return Promise.reject(new Error(result.message));
    },
    // 登陆页面-->请求登陆
    async userLogin({ dispatch, commit, state, getters }, data) {
      const result = await reqUserLogin(data);
      // 如果登陆成功
      if (result.code === 200) {
        // --> 存储token
        commit("USERLOGIN", result.data.token);
        // --> 返回一个 成功状态的promise
      }
      // 不成功 --> 返回一个失败状态的 promise
      else return Promise.reject(new Error(result.message));
    },
  },
  // 用纯函数进行状态更改
  mutations: {
    // 验证码
    GETUSERCODE(state, code) {
      state.code = code;
      console.log(state.code);
    },
    // 存token
    USERLOGIN(state, token){
      state.token = token;
    }
  },
  // 存储状态
  state: {
    // 验证码初始值
    code: "",
    // token初始值
    token:"",
  },
  // 计算属性
  getters: {},
  // 模块化仓库
  modules: {},
};
