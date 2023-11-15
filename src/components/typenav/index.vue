<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveHandler">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <!-- 用 Vue2 自带的全局组件 transition 来实现渐入渐出效果 -->
        <transition name="fade">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryArr"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="handleIndex(index)"
                  :class="{ active: activeIndex === index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入封转好的页面分类请求

export default {
  name: "TypeNav",
  // 组件挂在完毕
  mounted() {
    // 通知vuex发送请求
    this.$store.dispatch("goReqCategory");
    // 通过路径判断是否要展示导航栏
    this.isShow = this.$route.path == "/home";
  },
  data() {
    return {
      activeIndex: -1,
      // 定义一个动态属性来控制一级分类是否展示
      isShow: true,
    };
  },
  methods: {
    // 鼠标移入一级标签高亮效果
    handleIndex(index) {
      this.activeIndex = index;
    },
    // 携带参数跳转到 search 页面
    goSearch(event) {
      // 将自定义的属性解构出来: 使用 dataset 属性
      // 注意: 自定义属性名在获取时,会转变为全小写
      const { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果有 categorname
      if (categoryname) {
        const locations = {
          name: "search",
          query: { categoryName: categoryname },
        };
        //一级分类
        if (category1id) {
          locations.query.category1Id = category1id;
          //二级分类
        } else if (category2id) {
          locations.query.category2Id = category2id;
          //三级分类
        } else {
          locations.query.category3Id = category3id;
        }
        // 如果点击分类的时候 有 params 参数需要携带
        if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        }
      }
      // if (categoryname && category1id) {
      //   this.$router.push({
      //     name: "search",
      //     query: { categoryName: categoryname, category1Id: category1id },
      //   });
      // } else if (categoryname && category2id) {
      //   this.$router.push({
      //     name: "search",
      //     query: { categoryName: categoryname, category2Id: category2id },
      //   });
      // } else if (categoryname && category3id) {
      //   this.$router.push({
      //     name: "search",
      //     query: { categoryName: categoryname, category3Id: category3id },
      //   });
      // }
    },
    // 鼠标移入显示导航栏
    changeShow() {
      this.isShow = true;
    },
    // 鼠标移除导航栏
    leaveHandler() {
      // 取消一级菜单高亮
      this.activeIndex = -1;
      // 隐藏导航栏
      this.isShow = this.$route.path === "/home";
    },
  },
  computed: {
    ...mapState({
      categoryArr: (state) => state.home.category,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      // height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }

          .active {
            background-color: #e1251b;
          }
        }
      }
    }
  }

  /* 过度动画效果 */
  .fade-enter {
    opacity: 0;
    height: 0px;
  }

  .fade-enter-active {
    transition: all 0.5s;
  }

  .fade-enter-to {
    opacity: 1;
    height: 461px;
  }
}
</style>