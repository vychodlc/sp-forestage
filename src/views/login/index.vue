<template>
  <div class="login">
    <div class="loginContainer">
      <div class="header">
        <div class="title">Smart Purchase</div>
      </div>
      <div class="content" v-if="isLogin">
        <div class="formItem">
          <div class="formItemLabel"><span>邮箱</span></div>
          <div class="formItemInput"><input v-model="loginEmail" type="text" name="email" id="email" placeholder="输入您的邮箱"></div>
        </div>
        <div class="formItem" style="margin-top: 5vh">
          <div class="formItemLabel"><span>密码</span></div>
          <div class="formItemInput"><input v-model="loginPassword" type="password" name="password" id="password" placeholder="输入您的密码"></div>
        </div>
      </div>
      <div class="content" v-else>
        <div class="formItem">
          <div class="formItemLabel"><span>邮箱</span></div>
          <div class="formItemInput"><input type="text" v-model="registerEmail" name="email" id="email" placeholder="输入您的注册邮箱"></div>
        </div>
        <div class="formItem" style="margin-top: 2vh">
          <div class="formItemLabel"><span>昵称</span></div>
          <div class="formItemInput"><input type="text" v-model="registerNickname" name="nickname" id="nickname" placeholder="输入您的昵称"></div>
        </div>
        <div class="formItem" style="margin-top: 2vh">
          <div class="formItemLabel"><span>密码</span></div>
          <div class="formItemInput"><input type="password" v-model="registerPassword" name="password" id="password" placeholder="输入您的密码"></div>
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
  import { login,register,auth,getUserInfo } from '@/network/user.js'
  import { validateEmail } from '@/utils/validate.js'

  export default {
    name: "Login",
    data () {
      return {
        isLogin: true,
        loading: false,
        loginEmail: '',
        loginPassword: '',
        registerEmail: '',
        registerNickname: '',
        registerPassword: '',
      }
    },
    methods:{
      goLogin() {
        if(this.loginEmail=='') {
          this.$store.commit('showTip', '请输入邮箱')
        } else if (validateEmail(this.loginEmail)==false) {
          this.$store.commit('showTip', '邮箱格式不正确')
        } else if (this.loginPassword=='') {
          this.$store.commit('showTip', '请输入密码')
        } else {
          this.$store.commit('showLoading',true);
          login(this.loginEmail, this.loginPassword).then(res=>{
            if(res.data.status=='200') {
              let token = res.data.token;
              this.$store.commit('setToken', token);
              auth(token).then(res=>{
                let id = res.data.data.sub;
                getUserInfo(id).then(res=>{
                  let data = res.data.data;
                  this.$store.commit('setUser',data.uuid,data.user_nickname,data.user_right);
                  this.$store.commit('showLoading',false);
                  this.$store.commit('showTip', '登陆成功');
                  this.$router.replace('/home')
                })
              })
            } else {
              this.$store.commit('showTip', res.data.msg);
              this.$store.commit('showLoading',false);
            }
          })
        }
      },
      goRegister() {
        if(this.registerEmail=='') {
          this.$store.commit('showTip', '请输入邮箱')
        } else if (validateEmail(this.registerEmail)==false) {
          this.$store.commit('showTip', '邮箱格式不正确')
        } else if (this.registerNickname=='') {
          this.$store.commit('showTip', '请输入昵称')
        } else if (this.registerNickname.length<2||this.registerNickname.length>20) {
          this.$store.commit('showTip', '昵称限长 2~20 位')
        } else if (this.registerPassword=='') {
          this.$store.commit('showTip', '请输入密码')
        } else {
          this.$store.commit('showLoading',true);
          register(this.registerEmail,this.registerNickname,this.registerPassword).then(res=>{
            if(res.data.status=='200') {
              this.loginEmail = this.registerEmail;
              this.loginPassword = '';
              this.isLogin = true;
              this.$store.commit('showTip', '注册成功')
            } else {
              this.$store.commit('showTip', res.data.msg)
            }
            this.$store.commit('showLoading',false);
          })
        }
      },
    },
    created() {
      if((localStorage.token!='')&&(localStorage.token!=undefined)) {
        this.$router.replace('/home')
      }
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
    color: var(--color-all);
    text-align: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40vh;
    color: #bbb;
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
    color: #666;
  }
  /* input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{
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
  } */
  .content .formItemInput input:focus {
    outline: none;
    border-bottom: 2px solid var(--color-all);
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
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
    background-color: var(--color-all);
  }
  .footer .switch {
    text-align: center;
    line-height: 10vh;
    color: #aaa;
    font-size: 14px;
  }
  .footer .switch span {
    color: var(--color-all);
    font-size: 14px;
    text-decoration: underline;
    padding: 10px;
  }
</style>