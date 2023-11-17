<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isActive"></Footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style></style>
