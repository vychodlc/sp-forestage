<template>
  <div class="my">
    <!-- <p @click="logOut" style="text-align:center;font-size:60px">注销</p> -->
    <div class="header">
      <div class="avatar"><img src="~/assets/images/my/avatar.png" alt=""></div>
      <div class="infos">
        <div class="info" id="nickname">{{$store.state.user.nickname}}</div>
        <div class="info" id="uuid">编号:{{$store.state.user.id}}</div>
      </div>
      <!-- <div class="icon" @click="test()"><img src="~/assets/images/my/setting.png" alt=""></div> -->
    </div>
    <div class="content">
      <div class="card">
        <div class="title">
          <span class="titlespan">钱包管理</span>
          <div class="more" @click="routerGo('Payment')">
            <span>交易明细</span>
            <img src="~/assets/images/my/arrow-right.png" alt="">
          </div>
        </div>
        <div class="btns">
          <div class="btn">
            <div class="btnImage"><img src="~/assets/images/my/balance.png" alt=""></div>
            <div class="btnName"><span>余额</span></div>
            <div class="btnName" style="margin-top:5px"><span>{{balance}}</span></div>
          </div>
          <div class="btn" @click="routerGo('Withdrawl')">
            <div class="btnImage"><img src="~/assets/images/my/withdrawl.png" alt=""></div>
            <div class="btnName"><span>提现</span></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <span class="titlespan">订单管理</span>
          <!-- <div class="more">
            <span>全部订单</span>
            <img src="~/assets/images/my/arrow-right.png" alt="">
          </div> -->
        </div>
        <div class="btns">
          <div class="btn" @click="routerGo('TransmitOrderlist')">
            <div class="btnImage"><img src="~/assets/images/my/input.png" alt=""></div>
            <div class="btnName"><span>入库订单</span></div>
          </div>
          <div class="btn" @click="routerGo('OutputOrderlist')">
            <div class="btnImage"><img src="~/assets/images/my/output.png" alt=""></div>
            <div class="btnName"><span>出库订单</span></div>
          </div>
          <div class="btn" @click="routerGo('AgencyOrderlist')">
            <div class="btnImage"><img src="~/assets/images/my/agency.png" alt=""></div>
            <div class="btnName"><span>代购订单</span></div>
          </div>
          <!-- <div class="btn" @click="routerGo('OutputOrderlist')">
            <div class="btnImage"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="btnName"><span>退税订单</span></div>
          </div> -->
        </div>
      </div>
      <div class="card">
        <div class="title">
          <span class="titlespan">地址管理</span>
          <div class="more" @click="routerGo('Address')">
            <span>管理地址</span>
            <img src="~/assets/images/my/arrow-right.png" alt="">
          </div>
        </div>
        <div class="addr-box">
          <div class="addr-icon">
            <img src="~/assets/images/my/address.png" alt="">
          </div>
          <div class="addr-text" v-if="$store.state.address.default!=null">
            <span id="addr-title">默认地址：</span>
            <span id="name">{{$store.state.address.default[0].user_name}}<span id="phone">{{$store.state.address.default[0].phone}}</span></span>
            <span id="address">{{$store.state.address.default[0].addr}}</span>
          </div>
          <div class="addr-text" v-else>
            <span id="address">未设置默认地址</span>
          </div>
          <!-- <div class="addr-change">
            <span>修改</span>
          </div> -->
        </div>
      </div>
      <div class="card" v-if="token!=''">
        <div class="title">
          <span class="titlespan">退出登录</span>
          <div class="more" @click="logOut">
            <span>退出</span>
            <img src="~/assets/images/my/arrow-right.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="confirm" v-show="showDialog">
      <div class="box">
        <div class="title">尚未登录</div>
        <div class="context">是否前往登陆页面从而获取更多权限</div>
        <div class="btns">
          <div class="btn" @click="showDialog=false">取消</div>
          <div class="btn" @click="$router.replace({name:'Login'})">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {getAddress} from '@/network/address.js'
  import {getUserInfo} from '@/network/user.js'
  export default {
    name: "My",
    data () {
      return {
        balance: 0,
        token: '',
        showDialog: '',
      }
    },
    components: {},
    methods:{
      routerGo(route) {
        if(this.token=='') {
          this.showDialog = true;
        } else {
          this.$router.push({name:route})
        }
      },
      test() {
        // window.location.push('http://goback.vychod.top/');
      },
      logOut() {
        this.$store.commit('rmToken');
        this.$router.replace('/login')
      },
      
      scrollTotop() {
        window.scrollTo(0,0)
      },
      goWithdrawl() {

      }
    },
    activated() {
      this.token = localStorage.token;
      this.showDialog=false;
      this.$store.commit('showLoading',false);
      if(localStorage.token=='') {

      } else {
        getAddress().then(res=>{
          this.$store.commit('handleAddress',{name:'updateList',value:res.data.data})
        })
        getUserInfo().then(res=>{
          this.balance = parseFloat(res.data.data.balance/100).toFixed(2)
        })
        this.$bus.$on("addrChange",()=>{
          getAddress().then(res=>{
            this.$store.commit('handleAddress',{name:'updateList',value:res.data.data})
          })
        });
      }
    }
  }
</script>

<style scoped>
  .my {
    width: 100vw;
    height: calc(100vh - 50px);
    background-color: var(--color-all);
    position: relative;
  }
  .header {
    padding: 2vw;
    height: 20vh;
    display: flex;
    color: #fff;
    position: relative;
  }
  .header .avatar {
    width: 30vw;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .header img {
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
  }
  .header .infos {
    flex: 1;
    padding: calc(10vh - 10vw) 0;
  }
  .header .infos .info {
    height: 10vw;
    line-height: 10vw;
    padding-left: 5vw;
  }
  #nickname {
    font-size: 30px;
  }
  .icon {
    position: absolute;
    top: calc(10vh - 15vw);
    right: 4vw;
  }
  .icon img {
    width: 25px;
    height: 25px;
  }
  .content {
    width: 100vw;
    height: calc(80vh - 50px);
    background-color: var(--color-background);
  }
  .content .card {
    width: 100vw;
    /* height: 20vh; */
    background-color: #fff;
    margin-bottom: 2vh;
    /* border: 1px solid #000; */
  }
  .card .title {
    height: 5vh;
    padding-left: 10px;
    position: relative;
  }
  .card .title .titlespan {
    font-size: 18px;
    line-height: 5vh;
    border-left: 4px solid var(--color-all);
    padding: 5px 10px;
  }
  .card .btns {
    /* height: 15vh; */
    width: 100vw;
    margin-top: 10px;
    display: flex; 
    text-align: center;
    padding-bottom: 20px;
  }
  .card .btns .btn {
    flex: 1;
  }
  .btnImage img {
    width: 10vw;
    height: 10vw;
    margin-bottom: 10px;
  }
  .btnName span {
    font-size: 16px;
  }
  .more {
    position: absolute;
    height: 5vh;
    right: 5px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .more span {
    color: #000;
    line-height: 5vh;
  }
  .more img {
    width: 20px;
    height: 20px;
  }
  .addr-box {
    /* border: 1px solid #f9f; */
    display: flex;
    flex-direction: row;
  }
  .addr-icon {
    width: 25vw;
    height: 20vw;
    padding-left: 10vw;
    padding-right: 5vw;
    display: flex;
    align-items: center;
  }
  .addr-icon img {
    width: 10vw;
    height: 10vw;
  }
  .addr-text {
    width: 60vw;
    /* border: 1px solid #7d7; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
  }
  #addr-title {
    font-size: 12px;
    color: #999;
  }
  .addr-text #name {
    color: var(--color-all);
    font-size: 14px;
  }
  .addr-text #phone {
    font-size: 14px;
    color: #777;
    margin-left: 10px;
  }
  #address {
    font-size: 14px;
  }
  .addr-change {
    
  }
  .addr-change span {
    line-height: 20vw;
    border-bottom: 1px solid #666;
    color: #666;
    padding: 2px;
  }


  
  .backTotop {
    position: fixed;
    right: 10px;
    bottom: 80px;
    width: 40px;
    height: 40px;
    z-index: 4000;
    background-color: #fff;
    border-radius: 50%;
  }
  .backTotop img {
    width: 100%;
    height: 100%;
  }

  
</style>