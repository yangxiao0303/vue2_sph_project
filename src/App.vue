<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isActive"></Footer>
  </div>
</template>

<script>
export default {
  name: "App",
  // 在祖先组件完成挂载时
  mounted() {
    // 通知vuex发送请求, 获取typeNav的 category 数据 (因为此数据不会改变,只用获取一次)
    this.$store.dispatch("goReqCategory");
  },
};
</script>

<style></style>
