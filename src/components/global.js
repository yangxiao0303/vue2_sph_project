// 引入全局组件
import Header from "@/components/header";
import Footer from "@/components/footer";
import TypeNav from "@/components/typenav";
import Pagination from "@/components/pagination";
// 放置全局组件
// Vue.component("Header",Header);
// Vue.component("Footer",Footer);
// Vue.component("TypeNav",TypeNav);

const globalObj = {
  Header,
  Footer,
  TypeNav,
  Pagination,
}

// 自定义插件对象
export default {
  // 在 Vue.use 安装插件时,会调用插件对象的install方法一次,注入构造函数Vue
  install(Vue){
    // 用Object.keys方法获取由键名组成的数组
    Object.keys(globalObj).forEach(component => {
      // 将每个组件都挂载为全局组件
      /* 注意,此处第二参数不能用 .component,
       因为 .属性命名方式不能为参数,晶哥讲过 */ 
      Vue.component(component,globalObj[component]);
    })
  }
}