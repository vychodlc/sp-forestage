<template>
  <div class="pay" @click="test()">
    <div class="content" v-if="$store.state.pay.method==false">
    <!-- <div class="content"> -->
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
    <div class="content" v-else>
      <div class="title">付款金额：<span style="font-size: 20px;color:var(--color-all)">￡{{parseFloat(this.$store.state.pay.price/100).toFixed(2)}}</span></div>
      <div class="text" style="font-size: 12px;width:100%;padding:3px 30px">选择支付方式</div>
      <div class="method" style="padding-left:50px;padding-top:6px">
        <input type="radio" v-model="paymethod" value="0" id="m1" v-if='parseInt(price)<=parseInt(money)'/>
        <input type="radio" v-model="paymethod" value="2" id="m1" v-else-if="parseInt(price)>parseInt(money)&&parseInt(money)>0"/>
        <label for="m1" v-if='parseInt(price)<=parseInt(money)'>余额支付
          <span style="color:var(--color-all)">余额:￡{{parseFloat(money/100).toFixed(2)}}</span>
        </label>
        <label for="m1" v-else-if="parseInt(price)>parseInt(money)&&parseInt(money)>0">混合支付
          <span style="color:var(--color-all)">余额:￡{{parseFloat(money/100).toFixed(2)}}</span>
        </label>
      </div>
      <div class="method" style="padding-left:50px;padding-top:6px">          
        <input type="radio" v-model="paymethod" value="1" id="method1"/><label for="method1">聚合支付</label>
      </div>
      <div class="option">
        <div class="btn" @click="payNo()">取消</div>
        <div class="btn" @click="selectMethod()">付款</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getOrder,paymentBalance,putOrder,checkPayment} from '@/network/payment.js'
  export default {
    name: "Pay",
    data () {
      return {
        pwd: '123456',
        paymethod: '',
        useBalance: parseInt(this.$store.state.pay.price)>parseInt(this.$store.state.user.balance)?'1':'0',
        money: parseInt(this.$store.state.user.balance),
        price: parseInt(this.$store.state.pay.price),
      }
    },
    activated() {
    },
    methods:{
      test() {
        // console.log(this.price,this.money,parseInt(this.price)<parseInt(this.money));
      },
      inputChange() {
        let inputPwd = this.$refs.pwdInput;
        if(this.pwd.length>6) {
          this.pwd = this.pwd.slice(0,6)
        }
        console.log(this.pwd);
      },
      payNo() {
        this.$store.commit('handlePay',{show:false})
        this.$store.commit('showLoading',false);
        this.$bus.$emit('paystatus',{order_type:this.$store.state.pay.order_type,status:'fail'})
      },
      payYes() {
        if(this.pwd=='123456') {
          this.$store.commit('showLoading',true);
          putOrder({
            id:this.$store.state.pay.id,
            order_type:this.$store.state.pay.order_type,
            pay_type:this.$store.state.pay.pay_type
          }).then(resPay=>{
            if(resPay.data.status=='302') {
              this.$store.commit('handlePay',{show:false})
              this.$store.commit('showTip','您有未支付的订单')
              if(this.$route.path!='/application') {
                this.$router.replace({name:'Application'})
              }
              this.$router.push({name:'OutputOrderlist'})
            } else if(resPay.data.status=='200') {
              if(this.$store.state.pay.pay_type=='balance') {
                this.$store.commit('handlePay',{show:false})
                this.$bus.$emit('paystatus',{order_type:this.$store.state.pay.order_type,status:'ok'})
              } else if(this.$store.state.pay.pay_type=='mix') {
                let url = resPay.data.RedirectUrl;
                window.location.replace(url);
              }
            }
          })
        } else {
          this.$store.commit('showTip','支付密码错误');
          this.pwd = ''
        }
      },
      selectMethod() {
        console.log(this.$store.state.pay);
        // checkPayment({

        // })
        if(this.paymethod=='0') {
          console.log('余额');
          this.$store.commit('handlePay',{method:false,pay_type:'balance'})
        } else if(this.paymethod=='1') {
          console.log('聚合');
          this.$store.commit('handlePay',{pay_type:'Globepay'});
          putOrder({
            id:this.$store.state.pay.id,
            order_type:this.$store.state.pay.order_type,
            pay_type:this.$store.state.pay.pay_type
          }).then(resPay=>{
            if(resPay.data.status=='302') {
              this.$store.commit('handlePay',{show:false})
              this.$store.commit('showTip','您有未支付的订单')
              if(this.$route.path!='/application') {
                this.$router.replace({name:'Application'})
              }
              this.$router.push({name:'OutputOrderlist'})
            } else if(resPay.data.status=='200') {
              let url = resPay.data.RedirectUrl;
              window.location.replace(url);
            }
          })
        } else if(this.paymethod=='2') {
          console.log('混合');
          this.$store.commit('handlePay',{method:false,pay_type:'mix'})
        } else {
          this.$store.commit('showTip','请选择支付方式')
        }
      }
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
    /* height: 400px; */
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
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
  .method .title {
    line-height: 20px;
  }
</style>