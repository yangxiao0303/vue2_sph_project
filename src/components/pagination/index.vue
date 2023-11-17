<template>
  <div class="pagination">
    <button @click="$emit('currentChange', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <button @click="$emit('currentChange', 1)" v-show="pageNo >1">1</button>
    <button v-show="startAndEndNumber.start > 2">···</button>
    <!-- 中间显示的页码 -->
    <button
      @click="$emit('currentChange', page)"
      v-for="(page, index) in startAndEndNumber.end"
      :key="index" v-if="page >= startAndEndNumber.start"
    >
      {{ page }}
    </button>
    <button v-show="totalPage - startAndEndNumber.end > 1">···</button>
    <button @click="$emit('currentChange', totalPage)">{{ totalPage }}</button>
    <button
      @click="$emit('currentChange', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>

    <!-- 每一页展示数据条数 -->
      <select v-model="pageSizes" @change="$emit('getPageSizes',pageSizes)">
        <option v-for="item in pagerCount" :value="item">{{item}}条/页</option>
      </select>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
      return {
         pageSizes:10
      }
    },
  props: ["total", "pageSize", "pageNo", "pager", "pagerCount"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEndNumber() {
      // 定义 起,止 值变量
      let start, end;
      // 解构值
      const { totalPage, pageNo, pager } = this;
      // 总页数比 pager 少
      if (totalPage <= pager) {
        start = 1;
        end = totalPage;
      }
      // 总页数 大于 pager
      else {
        // 算 pager 起止值
        start = pageNo - parseInt(pager / 2);
        end = pageNo + parseInt(pager / 2);
        // 特殊情况处理(左边界)
        if (start < 1) {
          start = 1;
          end = start + pager - 1;
        }
        // 右边界
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - pager + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style scoped lang='less'>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>