<template>
  <div class="login">
    <div class="loginContainer">
      <div class="header">
        <div class="title">Smart Purchase</div>
      </div>
      <div class="content" v-if="isLogin">
        <div class="formItem">
          <div class="formItemLabel"><span>邮箱</span></div>
          <div class="formItemInput"><input @keypress="gogogo" v-model="loginEmail" type="text" name="email" id="email" placeholder="输入您的邮箱"></div>
        </div>
        <div class="formItem" style="margin-top: 5vh">
          <div class="formItemLabel"><span>密码</span></div>
          <div class="formItemInput"><input @keypress="gogogo" v-model="loginPassword" type="password" name="password" id="password" placeholder="输入您的密码"></div>
        </div>
      </div>
      <div class="content" v-else>
        <div class="formItem">
          <div class="formItemLabel"><span>邮箱</span></div>
          <div class="formItemInput"><input @keypress="gogogo" type="text" v-model="registerEmail" name="email" id="email" placeholder="输入您的注册邮箱"></div>
        </div>
        <div class="formItem" style="margin-top: 2vh">
          <div class="formItemLabel"><span>昵称</span></div>
          <div class="formItemInput"><input @keypress="gogogo" @input="lengthLimit(20)" type="text" v-model="registerNickname" name="nickname" id="nickname" placeholder="输入您的昵称"></div>
        </div>
        <div class="formItem" style="margin-top: 2vh">
          <div class="formItemLabel"><span>密码</span></div>
          <div class="formItemInput"><input @keypress="gogogo" type="password" v-model="registerPassword" name="password" id="password" placeholder="输入您的密码"></div>
        </div>
      </div>
      <div class="bottom">
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
        <div class="switch" ref="visitBtn">
          不想登录，直接以<span class="link" @click="visitorGo">游客模式</span>进入
          <!-- 不想登录，直接以<span class="link" @click="$router.replace({name:'Home'})">游客模式</span>进入 -->
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
        flag: new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      }
    },
    methods:{
      lengthLimit(len) {
        if(this.registerNickname.length>len) {
          this.$store.commit('showTip', '昵称最长只能'+len+'位哦！');
          this.registerNickname = this.registerNickname.slice(0,len)
        }
      },
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
              getUserInfo().then(res=>{
                let data = res.data.data;
                localStorage.uuid = data.uuid;
                localStorage.balance = data.balance;
                localStorage.ID = data.ID;
                localStorage.nickname = data.user_nickname;
                this.$store.commit('setUser', [data.ID, data.user_nickname,data.balance]);
                this.$store.commit('showLoading',false);
                this.$store.commit('showTip', '登陆成功');
                this.$router.replace('/home');
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
        } else if (this.flag.test(this.registerNickname)==true) {
          this.$store.commit('showTip', '昵称为英文数字与中文，不能含有特殊字符')
        } else if (this.registerPassword=='') {
          this.$store.commit('showTip', '请输入密码')
        } else if (this.registerPassword.length<6||this.registerPassword.length>20) {
          this.$store.commit('showTip', '密码限长 6~20 位')
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
      gogogo(event) { 
        if(event.keyCode == 13) {
          event.preventDefault();
          if(this.isLogin) {
            this.goLogin();
          } else {
            this.goRegister()
          }
        }
      },
      visitorGo() {
        this.$store.commit('setToken', '');
        localStorage.uuid = '';
        localStorage.balance = '';
        localStorage.ID = '';
        localStorage.nickname = '未登录';
        this.$store.commit('setUser', ['','未登录','']);
        this.$nextTick(()=>{      
          this.$router.replace({name:'Home'});
        })
        this.$store.commit('showTip', '当前为游客模式');
      }
    },
    created() {
      this.$store.commit('showLoading',false)
      if(localStorage.token) {
        this.$router.replace({name:'Home'});
      } else {
        if(this.$route.path!='/home') {
          this.$store.commit('setToken', '');
          localStorage.uuid = '';
          localStorage.balance = '';
          localStorage.ID = '';
          localStorage.nickname = '未登录';
          this.$store.commit('setUser', ['','未登录','']);
          this.$nextTick(()=>{      
            this.$router.replace({name:'Home'});
          })
          this.$store.commit('showTip', '当前为游客模式');
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginContainer {
    width: 350px;
    height: 600px;
    border-radius: 10px;
    box-shadow: darkgrey 0px 0px 20px 5px;
    background-color: #ffffff;
    position: relative;
  }
  .header .title {
    height: 180px;
    line-height: 180px;
    font-size: 35px;
    color: var(--color-all);
    text-align: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 250px;
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
    font-size: 20px;
    border-bottom: 1px #aaa solid;
    padding: 12px 5px;
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
  .bottom {
    padding: 0 20px;
    margin-top: 30px;
  }
  .bottom .button .submit {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    border-radius: 5px;
    background-color: var(--color-all);
  }
  .bottom .switch {
    text-align: center;
    line-height: 30px;
    color: #aaa;
    font-size: 14px;
    margin-top: 20px;
  }
  .bottom .switch:last-child {
    margin-top: 0;
    /* border: 1px solid #666; */
  }
  .bottom .switch span {
    color: var(--color-all);
    font-size: 14px;
    text-decoration: underline;
    padding: 10px;
  }
</style>