<template>
  <Swiper :options="swiperOption">
    <SwiperSlide v-for="(img, index) in skuImageList" :key="img.id">
      <img :src="img.imgUrl" @click="imgListSwipe(index)" :class="{active: activeIndex === index}"/>
    </SwiperSlide>
    <div class="swiper-button-next" slot="button-prev"></div>
    <div class="swiper-button-prev" slot="button-next"></div>
  </Swiper>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  data() {
    return {
      // 轮播图的配置项
      swiperOption: {
        slidesPerView: 3,
        navigation:{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      // 边框高亮的索引
      activeIndex : 0,
    };
  },
  computed: {
    ...mapGetters(["skuImageList"]),
  },
  methods: {
    // 点击切换高亮索引
    imgListSwipe(index){
      this.activeIndex = index;
      // 给兄弟组件通信,发送索引
      this.$bus.$emit("sendIndex",index);
    }
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>