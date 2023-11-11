// 引入axios
import axios from "axios";
// 创建新的axios请求
const request = axios.create({
  baseURL: '/api',// 设置请求的基础路径
  timeout: 5000 // 设置超时时间
});

// 设置请求拦截器: 在发送请求之前触发 config 配置对象
request.interceptors.request.use((config) => {
  // 可以携带公共参数 (token...)
  // config.headers.token = 654641321352165
  // 要返回配置对象
  return config;
});

// 响应拦截器: 在请求结束之后触发, 返回一个promise 对象
request.interceptors.response.use((res)=>{
  // 可以用来简化服务器返回的数据
  return res.data

}, err => {
  // 统一处理返回的错误
  const status = err.response.status;
  switch (status) {
    case 404:
      alert ('找不到请求的地址');
      break;
    case 403:
      alert ('没有查看的权限');
      break;
    case 500 || 501 || 502 || 503 || 504:
      alert ('服务器崩溃了');
      break;
  }
});

// 暴露要在最后,因为要添加请求和响应拦截器
export default request;