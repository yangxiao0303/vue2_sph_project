<template>
  <div class="cart">
    <h4>全部商品</h4>
    <!--购物车的主要部分 -->
    <div class="cart-main">
      <!-- 购物车的头部 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 购物车主体部分 -->
      <div class="cart-body">
        <!-- 每一个UL即为一个商品 -->
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="changeChecked(item, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="minusCart(item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @input="changeNumber(item, $event.target.value)"
            />
            <a href="javascript:void(0)" class="plus" @click="addCart(item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <el-popconfirm
              :title="`你确定要删除${item.skuName}?`"
              @confirm="deleteGoods(item.skuId)"
            >
              <el-button type="danger" size="mini" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isChecked"
          @change="updateAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import throttle from "lodash/throttle"; // 按需引入
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  //组件挂载完毕:先获取一次用户当前购物车的数据
  mounted() {
    this.getUserCart();
  },
  methods: {
    //获取用户购物车的数据
    getUserCart() {
      //派发action获取用户的购物车数据
      this.$store.dispatch("getUserCart");
    },
    // 改变选中状态的回调
    async changeChecked(skuId, isChecked) {
      // 给vuex的action派发动作
      try {
        // 等待后端返回更改是否成功的数据
        await this.$store.dispatch("changeChecked", {
          skuId, // 点击的商品的Id
          isChecked: Number(isChecked), // 是否被勾选的值
        });
        // 更改成功后, 从后端拿数据
        this.getUserCart();
        // 使用element-UI展示修改成功
        this.$message({
          message: "更新成功",
          type: "success",
        });
        // 捕获抛出的错误
      } catch (error) {
        // 提示
        this.$message({
          message: "更新失败",
          type: "error",
        });
      }
    },
    // 减少商品数量
    minusCart: throttle(async function (item) {
      if (item.skuNum > 1) {
        // 商品ID
        const skuId = item.skuId;
        // 商品数量变化
        const skuNum = -1;
        try {
          // 给 vuex 派发更新数量的请求
          await this.$store.dispatch("updateNumber", { skuId, skuNum });
          // 等待异步函数执行成功,更新数量
          this.getUserCart();
          // 提示消息
          this.$message({
            message: "更新成功",
            type: "success",
          });
        } catch (error) {
          // 提示信息
          this.$message({
            message: "更新失败",
            type: "error",
          });
        }
      }
    }, 1000),
    // 修改商品数量的回调
    changeNumber: debounce(function (item, input) {
      // 数量变化差值
      let skuNum;
      // 判断数据是否合法
      const inputValue = input * 1;
      // 如果不合法
      if (isNaN(inputValue) || inputValue < 1) {
        // 赋值为0
        skuNum = 0;
        // 如果合法
      } else {
        skuNum = Math.ceil(inputValue) - item.skuNum;
      }
      this.$store.dispatch("updateNumber", { skuId: item.skuId, skuNum }).then(
        (res) => {
          // 等待异步函数执行成功,更新数量
          this.getUserCart();
          // 提示消息
          this.$message({
            message: "更新成功",
            type: "success",
          });
        },
        (error) => {
          // 提示信息
          this.$message({
            message: "更新失败",
            type: "error",
          });
        }
      );
    }, 1000),
    // 增加商品数量
    async addCart(goods) {
      //准备参数
      //发请求(修改数量)
      //成功再次获取最新购物车数据
      //失败提示信息
      const skuId = goods.skuId;
      const skuNum = 1;
      //通知vuex发请求更新数量
      try {
        // 给 vuex 派发更新数量的请求
        await this.$store.dispatch("updateNumber", { skuId, skuNum });
        // 等待异步函数执行成功,更新数量
        this.getUserCart();
        // 提示消息
        this.$message({
          message: "更新成功",
          type: "success",
        });
      } catch (error) {
        // 提示信息
        this.$message({
          message: "更新失败",
          type: "error",
        });
      }
    },
    // 删除单个商品
    async deleteGoods(skuId) {
      try {
        // 派发请求,删除购物车物品数据
        await this.$store.dispatch("deleteGoods", skuId);
        // 如果成功,请求最新购物车数据
        this.getUserCart();
        // 提示
        this.$message({});
      } catch (error) {
        // 失败,提示
        this.$message({});
      }
    },
    // 更新全部选择状态
    async updateAllChecked(event) {
      // 将传入的值由boolean 转化为 number
      const isChecked = Number(event.target.checked);
      try {
        // 给Vuex派发动作
        await this.$store.dispatch("updateAllChecked", isChecked);
        // 更新购物车
        this.getUserCart();
      } catch (error) {}
    },
  },

  computed: {
    // 使用辅助函数获取 getters 中的数据
    ...mapGetters(["cartInfoList"]),
    // 计算购物车的选中商品总个数
    totalNum() {
      return this.cartInfoList.reduce((prev, next) => {
        if (next.isChecked === 1) {
          prev = prev + next.skuNum;
        }
        return prev;
      }, 0);
    },
    // 计算购物车选中的商品总价
    totalPrice() {
      return this.cartInfoList.reduce((prev, next) => {
        if (next.isChecked) {
          prev = prev + next.skuPrice * next.skuNum;
        }
        return prev;
      }, 0);
    },
    //判断全选勾不勾
    isChecked() {
        return this.cartInfoList.every((goods) => goods.isChecked == "1");
      },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>