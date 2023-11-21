<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link></span
        >
      </h3>
      <!-- 手机号码 -->
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <!-- 验证码 -->
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <el-button
          type="primary"
          size="mini"
          style="margin-left: 10px"
          @click="getCode"
          >获取验证码</el-button
        >
        <span class="error-msg">错误提示信息</span>
      </div>
      <!-- 登录密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <!-- 确认密码 -->
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password1" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="isAgree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      // 手机号/账号
      phone: "",
      // 验证码
      code: "",
      // 密码
      password: "",
      // 确认密码
      password1: "",
      // 同意用户协议
      isAgree: true,
    };
  },
  methods: {
    async getCode() {
      console.log(this.$store);
      try {
        // 解构 phone
        const { phone } = this;
        // 稍微校验一下数据
        if (phone.trim()) {
          //  如果 vuex 中的 getCode 返回一个成功状态的 promise
          await this.$store.dispatch("getCode", phone);
          // 给 code 赋值
          this.code = this.$store.state.user.code;
        }
      } catch (error) {}
    },
    register() {
      // 解构需要的数据
      const { phone, password, password1, code, isAgree } = this;
      // 简单数据校验
      if (phone.trim() && password === password1) {
        this.$store.dispatch("userRegister", { phone, password, code }).then(
          () => {
            // 如果注册成功--> 跳转至登陆页面
            this.$router.push({ path: "/login" });
          },
          (error) => {
            // 如果注册失败--> 提示错误信息
            this.$message({
              message: error.message,
              type: "error",
            })
          }
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>