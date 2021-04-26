<template>
  <div class="login">
    <div class="loginContainer">
      <div class="header">
        <div class="title">Smart Purchase</div>
      </div>
      <div class="content" v-if="isLogin">
        <div class="formItem">
          <div class="formItemLabel"><span>注册邮箱</span></div>
          <div class="formItemInput"><input type="text" name="email" id="email" placeholder="输入您的注册邮箱"></div>
        </div>
        <div class="formItem" style="margin-top: 5vh">
          <div class="formItemLabel"><span>密码</span></div>
          <div class="formItemInput"><input type="password" name="password" id="email" placeholder="输入您的密码"></div>
        </div>
      </div>
      <div class="content" v-else>
        <div class="formItem">
          <div class="formItemLabel"><span>邮箱</span></div>
          <div class="formItemInput"><input type="text" name="email" id="email" placeholder="输入您的注册邮箱"></div>
        </div>
        <div class="formItem" style="margin-top: 2vh">
          <div class="formItemLabel"><span>昵称</span></div>
          <div class="formItemInput"><input type="text" name="nickname" id="nickname" placeholder="输入您的昵称"></div>
        </div>
        <div class="formItem" style="margin-top: 2vh">
          <div class="formItemLabel"><span>密码</span></div>
          <div class="formItemInput"><input type="password" name="password" id="email" placeholder="输入您的密码"></div>
        </div>
      </div>
      <div class="footer">
        <div class="button">
          <div class="submit" v-if="isLogin" @click="goLogin">登录</div>
          <div class="submit" v-else @click="goRegister">注册</div>
        </div>
        <div class="switch" v-if="isLogin">
          还没有账户？快去<span class="link" @click="isLogin=false">注册</span>
        </div>
        <div class="switch" v-else>
          已经有账户？快去<span class="link" @click="isLogin=true">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data () {
      return {
        isLogin: true,
      }
    },
    methods:{
      goLogin() {
        this.$router.replace('/home')
      },
      goRegister() {
        this.$router.replace('/home')
      },
    }
  }
</script>

<style scoped>
  .login {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .loginContainer {
    margin-left: 5vw;
    margin-top: 15vh;
    width: 90vw;
    height: 70vh;
    border-radius: 10px;
    box-shadow: darkgrey 0px 0px 20px 5px;
    background-color: #fff;
  }
  .header .title {
    height: 15vh;
    line-height: 15vh;
    font-size: 35px;
    color: #e66b75;
    text-align: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40vh;
    color: #555;
    padding: 0 30px;
  }
  .content .formItemLabel span {
    font-size: 18px;
  }
  .content .formItemInput input {
    background: transparent;
    border: none;
    width: 100%;
    font-size: 22px;
    border-bottom: 1px #aaa solid;
    padding: 16px 5px;
    color: #000;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{
    color: #cecece;
  }
  input:-moz-placeholder, textarea:-moz-placeholder{
    color: #cecece;
  }
  input::-moz-placeholder, textarea::-moz-placeholder{
    color: #cecece;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #cecece;
  }
  input:focus {
    border: none;
    outline: none;
  }
  .footer {
    padding: 0 20px;
  }
  .footer .button .submit {
    width: 100%;
    height: 6vh;
    line-height: 6vh;
    color: #fff;
    text-align: center;
    font-size: 18px;
    border-radius: 5px;
    background-color: #e66b75;
  }
  .footer .switch {
    text-align: center;
    line-height: 10vh;
    color: #aaa;
    font-size: 14px;
  }
  .footer .switch span {
    color: #e66b75;
    font-size: 14px;
    text-decoration: underline;
    padding: 10px;
  }
</style>