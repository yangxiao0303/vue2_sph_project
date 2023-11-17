<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- crumbs -->
          <ul class="fl sui-tag">
            <!-- typeNav category crumbs -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <!-- keyword category crumbs -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- brand related crumbs -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- attributes crumbs -->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTradeMark="getTradeMark" @getAttr="getAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="sortHandler('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': !isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: !isOne }" @click="sortHandler('2')">
                  <a
                    >价格<span
                      v-show="!isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': !isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">
                      {{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ goods.id ** 3 }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination
              @getPageSizes="getPageSizes"
              @currentChange="currentChange"
              :total="total"
              :pageSize="searchParams.pageSize"
              :pageNo="searchParams.pageNo"
              :pager="5"
              :pagerCount="[10, 20, 30, 40, 50]"
            >
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 从Vuex中引入辅助函数,获取store中存储的状态
import { mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      // 商品分类搜索 的配置项 --- 对象
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc", //排序
        pageNo: 1, //页码
        pageSize: 10, //每一页的条数
      },
    };
  },
  // 在组件挂在之前
  beforeMount() {
    //在发请求之前收集搜索的条件[分类:query参数]
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // //在发请求之前收集关键字的条件[关键字:params参数]
    // this.searchParams.keyword = this.$route.params.keyword;
    //收集分类(query)与关键字(params)搜索的条件
    // 将后面两个对象的属性值合并到第一个参数上
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  // 在组件挂载完成阶段
  mounted() {
    // 给派发动作
    // 要携带参数,数据格式为 对象
    this.$store.dispatch("getGoods", {});
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.search.goodsInfo.goodsList,
      total: (state) => state.search.goodsInfo.total,
    }),
    isOne() {
      return this.searchParams.order.includes("1");
    },
    isDesc() {
      return this.searchParams.order.includes("desc");
    },
  },
  methods: {
    // 获取搜索商品的数据 (只在组件挂载完成阶段执行一次)
    getGoods() {
      this.$store.dispatch("getGoods", this.searchParams);
    },
    // 删除分类面包屑的回调
    removeCategory() {
      // 分类的搜索条件清空: 设置为undifined则可让发请求的时候不会携带
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      // 路由跳转:要把分类query参数删除,但是如果有params,要继续携带
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除搜索关键字的回调
    removeKeyword() {
      // 关键词搜索条件清空
      this.searchParams.keyword = undefined;
      // 路由跳转
      this.$route.push({ name: "search", query: this.$route.query });

      // 同时通知兄弟组件 Header 清除搜索框内关键字: 兄弟组件传参,使用事件总线
      // 参1,事件名称(类型); 参2,传递参数
      this.$bus.$emit("clear");
    },
    // 给子组件的自定义事件的回调(获取 trademark)
    getTradeMark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 发请求数据
      this.getGoods();
    },
    // 给自组建的自定义事件的回调(获取 attributes)
    getAttr(props) {
      // 如果传过来的已经有了,直接结束
      if (this.searchParams.props.includes(props)) return;
      // 没有的话
      else this.searchParams.props.push(props);
      // 发请求数据
      this.getGoods();
    },
    // 清除品牌面包屑
    removeTrademark() {
      // 清空品牌搜索条件
      // 此项不呢设置成为 undefined, 因为上面的写法,会报错
      this.searchParams.trademark = "";
      // 再次发送请求数据
      this.getGoods();
    },
    // 清除平台属性面包屑
    removeProps(index) {
      // 清空平台属性的搜索条件
      this.searchParams.props.splice(index, 1);
      this.getGoods();
    },
    // 排序的回调
    sortHandler(type) {
      // 让一个值储存order的值
      let order = this.searchParams.order;
      // 首先判断点击之前是否高亮
      if (order.includes(type)) {
        // 高亮只改变箭头
        order.includes("desc")
          ? (order = `${type}:asc`)
          : (order = `${type}:desc`);
      } else {
        // 如没高亮,变高亮并带向下箭头
        type === "1" ? (order = "1:desc") : (order = "2:desc");
      }
      // 赋值回 searchParams
      this.searchParams.order = order;
      // 发送请求
      this.getGoods();
    },
    // pagination 自定义事件(获取 修改后页码)
    currentChange(page) {
      // 修改请求参数
      this.searchParams.pageNo = page;
      // 发送请求
      this.getGoods();
    },
    getPageSizes(pageSize) {
      //收集参数
      this.searchParams.pageSize = pageSize;
      //当前页码归1
      this.searchParams.pageNo = 1;
      //再次发请求
      this.getGoods();
    },
  },
  watch: {
    $route() {
      // 路径发生变化, 表明又要搜索一次,再次收集搜索配置内容
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 并且发送请求
      this.getGoods();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>