// 引入路由组件
import Home from "@/pages/home";
import Search from "@/pages/search";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Detail from "@/pages/detail";
import AddCartSuccess from "@/pages/addCartSuccess";
import ShopCart from "@/pages/shopCart";

// 设置并暴露路由规则
export default [
  {
    path: "/home",
    component: Home,
    meta: {
      isActive: true,
      title: "主页"
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isActive: false,
      title: "登陆"
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isActive: false,
      title: "注册"
    },
  },
  {
    name: "search",
    path: "/search",
    component: Search,
    meta: {
      isActive: true,
      title: "搜索"
    },
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
    meta: {
      isActive: true,
      title: "商品详情"
    },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess/:skuNum",
    component: AddCartSuccess,
    meta: {
      isActive: true,
      title: "添加成功"
    },
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart,
    meta: {
      isActive: true,
      title: "购物车"
    },
  },
  {
    path: "/",
    redirect: "/home",
  },
];
