<template>
  <div>
    <!-- 首页商品分类全局组件(其他路由组件也使用) -->、
    <TypeNav />
    <!-- 首页子组件:轮播图区域 -->
    <List />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 首页热卖排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层组件 -->
    <Floor v-for="item in 2" :key="item" />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
import List from "./list/index.vue";
import Recommend from "@/pages/home/recommend";
import Rank from "@/pages/home/rank";
import Like from "@/pages/home/like";
import Floor from "@/pages/home/floor";
import Brand from "@/pages/home/brand";
export default {
  name: "Home",
  components: { List, Recommend, Rank, Like, Floor, Brand },
};
</script>

<style scoped>
</style>