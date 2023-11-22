// 路由鉴权:全局守卫
import router from "@/router";
import store from "@/store";
// 使用全局导航守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token;
  const nickName = store.state.user.nickName
  // 如果有token
  if(token){
    // 有token--> 访问 login 或 register
    if(to.path === "/login" || to.path ==="/register"){
      // --> 跳转到 home 页面
      next({path: "/home"});
      // 有token --> 去别的页面
    } else {
      // --> 有用户名
      if (nickName) {
        // --> 放行
        next();
        // --> 没有用户名
      } else {
        // --> 请求用户数据
        store.dispatch("userInfo").then(
          // --> 请求成功
          (res)=>{
            // --> 放行
            next();
            // -->请求失败(token失效)
        },(err)=>{
          // 跳转到登陆页面,重新登陆
          next('/login');
        })
      }
    }
    // --> 没有 token 
  } else {
    // --> 随意浏览
    next();
  }
});

router.afterEach((to,from) =>{
  // 设置当前页面标题
  document.title = `尚品会-${to.meta.title}`;
})