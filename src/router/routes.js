// 引入路由组件
import Home from "@/pages/home";
import Search from "@/pages/search";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Detail from "@/pages/detail";
import AddCartSuccess from "@/pages/addCartSuccess";

// 设置并暴露路由规则
export default [
  {
    path: "/home",
    component: Home,
    meta: {
      isActive: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isActive: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isActive: false,
    },
  },
  {
    name: "search",
    path: "/search",
    component: Search,
    meta: {
      isActive: true,
    },
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
    meta: {
      isActive: true,
    },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess/:skuNum",
    component: AddCartSuccess,
    meta: {
      isActive: true,
    },
  },
  {
    path: "/",
    redirect: "/home",
  },
];
