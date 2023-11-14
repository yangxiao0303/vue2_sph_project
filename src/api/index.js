// 引入封装好的 home页面的category axios
import request from "@/utils/request";
// 引入封装好的 home 轮播图和 floor 数据的axios
import mockRequest from "@/utils/mockRequest";
// home 页面 TypeNav 组件的分类请求
export const reqCategory = ()=> request({url:'/product/getBaseCategoryList'});
// home 页面 banner 和 floor 组件数据请求
export const reqBanner = ()=> mockRequest({url:'/banner'});
export const reqFloor = ()=> mockRequest({url:'/floor'});
// search 页面 搜索请求的结果数据(携带数据最多为 10个 key 组成的对象)
export const reqGoodsList = (keysObj)=> request({url:'/list',method:'POST',data:keysObj});