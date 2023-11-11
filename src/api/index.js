// 引入封装好的 axios
import request from "@/utils/request";
// home 页面 TypeNav 组件的分类请求
export const reqCategory = ()=>{
  request({url:'`/product/getBaseCategoryList`'});
}