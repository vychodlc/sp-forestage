<template>
  <div class="pay">
    <div class="content">
      <div class="title">请输入支付密码</div>
      <div class="info">
        <div class="infoItem" id="item1">待付<span class="value" style="color:var(--color-all)">￡{{parseFloat($store.state.pay.price/100).toFixed(2)}}</span></div>
        <div class="infoItem" id="item2">余额<span class="value">￡{{parseFloat($store.state.user.balance/100).toFixed(2)}}</span></div>
      </div>
      <div class="pwd">
        <input ref="pwdInput" v-model="pwd" type="password" @input="inputChange">
      </div>
      <div class="option">
        <div class="btn" @click="payNo()">取消</div>
        <div class="btn" @click="payYes()">付款</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getOrder,paymentBalance} from '@/network/payment.js'
  export default {
    name: "Pay",
    data () {
      return {
        pwd: ''
      }
    },
    methods:{
      inputChange() {
        let inputPwd = this.$refs.pwdInput;
        if(this.pwd.length>6) {
          this.pwd = this.pwd.slice(0,6)
        }
        console.log(this.pwd);
      },
      payNo() {
        this.$store.commit('handlePay',{price:0,success:true,state:false,show:false,id:null})
        this.$store.commit('showLoading',false);
        this.$bus.$emit('paystatus',{order_type:this.$store.state.pay.order_type,status:'fail'})
      },
      payYes() {
        this.$store.commit('showLoading',true);
        paymentBalance({
          id:this.$store.state.pay.id,
          order_type:this.$store.state.pay.order_type
        }).then(res=>{
          console.log(res);
          this.$store.commit('handlePay',{price:0,success:true,state:false,show:false,id:null})
          this.$store.commit('showLoading',false);
          if(res.data.status=='200') {
            this.$bus.$emit('paystatus',{order_type:this.$store.state.pay.order_type,status:'ok'})
          } else {
            this.$bus.$emit('paystatus',{order_type:this.$store.state.pay.order_type,status:'fail'})
          }
        })
      },
    },
  }
</script>

<style scoped>
  .pay {
    width: 100vw;
    height: 100%;
    background-color: #b3b3b488;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pay .content {
    width: 80vw;
    height: 400px;
    background-color: #fff;
    border-radius: 5px;
  }
  .pay .content .title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 20px;
    text-align: center;
  }
  .pay .content .info .infoItem {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pay .content .info .infoItem span {
    font-size: 25px;
    line-height: 30px;
  }
  .pay .content .info #item2,
  .pay .content .info #item2 span {
    font-size: 14px;
    color: #888;
  }
  .pwd {
    margin-left: 10vw;
    margin-top: 20px;
  }
  input[type="password"]::-ms-reveal{
    display:none
  }
  .pwd input {
    width: 60vw;
    text-align: center;
    letter-spacing: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid #000;
    font-size: 30px;
  }
  .option {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .option .btn {
    width: 40%;
    margin-top: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
  }
  .option .btn:first-child {
    color: var(--color-all);
    border: 1px solid var(--color-all);
  }
  .option .btn:last-child {
    background-color: var(--color-all);
    color: #fff;
  }
</style>