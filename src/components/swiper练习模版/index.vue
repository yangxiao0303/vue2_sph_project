<template>
  <Swiper class="swiper" :options="SwiperOptions">
    <SwiperSlide v-for="item in 5" :key="item">
      <!-- 具名插槽 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
  export default {
    name:'Swiper',
    data() {
      return {
        SwiperOptions:{
          navigation : {
            // 导航摁钮
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next"
          },
          loop: true, // 无线循环
          direction: "horizontal", // 水平方向
          pagination: {
            el: ".swiper-pagination", // 分页小球
            clickable: true // 是否可点击
          },
          autoplay: {
            delay: 1000, // 每页停留时间
            stopOnLastSlide: false, // 最后一页停留
            disableOnInteraction: true, // 交互时停止自动播放
          }
        }
      }
    },
  }
</script>

<style scoped lang='less'>
  
</style>