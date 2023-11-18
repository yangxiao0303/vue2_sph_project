<template>
  <div class="spec-preview">
    <img :src="(skuImageList[0] || {}).imgUrl" />
    <div class="event" @mousemove="handlePosition"></div>
    <div class="big" >
      <img :src="(skuImageList[0] || {}).imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Zoom",
  methods: {
    handlePosition(event) {
      // 获取元素
      const big = this.$refs.big;
      const mask = this.$refs.mask;
      // 设置蒙板位置
      let x = event.offsetX - mask.offsetWidth / 2;
      let y = event.offsetY - mask.offsetHeight / 2;
      // 设置边界值
      // 横坐标
      x < 0 ? (x = 0) : x;
      x > mask.offsetWidth
        ? (x = mask.offsetWidth)
        : x;
      // 纵坐标
      y < 0 ? (y = 0) : y;
      y > mask.offsetHeight
        ? (y = mask.offsetWidth)
        : y;
      // 蒙板位置赋值
      mask.style.top = y + "px";
      mask.style.left = x + "px";
      // 根据大图和蒙板关系赋值
      big.style.top = -2 * y + "px";
      big.style.left = -2 * x + "px";
    },
  },
  computed: {
    ...mapGetters(["skuImageList"]),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>