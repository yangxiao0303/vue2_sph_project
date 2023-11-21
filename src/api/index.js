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
// detail 页面 商品详情返回数据
export const reDeatil = (MerchandiseId) => request({url:`/item/${MerchandiseId}`});
// 把商品加入购物车/修改购物车商品的数量
// 参1: 商品ID 参2: 商品数量
export const reqAddOrUpdateCart = (skuId,skuNum) => request({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST'});
// 获取用户购物车数据
export const reqUserCart = () => request({url:'/cart/cartList'})
// 更新购物车商品选中状态
export const reqChangeChecked = (skuId,isChecked) => request({url:`/cart/checkCart/${skuId}/${isChecked}`});
// 删除购物车物品
export const reqDeleteGoods = (skuId) => request({url:`/cart/deleteCart/${skuId}`,method: "DELETE"});
// 获取验证码
export const reqUserCode = (phone) => request({url:`/user/passport/sendCode/${phone}`});
// 新用户注册的接口
export const reqUserRegister = (data) => request({url:`/user/passport/register`,method: "POST",data});
// 用户登陆的接口
export const reqUserLogin = (data) => request({url:'/user/passport/login',method:"POST",data}); 