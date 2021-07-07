<template>
  <div class="detail">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">零钱明细</div>
    </div>
    <div id="my_scroller">
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller" class="my_scroller">
        <div class="cardItem" v-for="(item,index) in listData" :key="index">
          <div class="cardLeft">
            <div class="name">{{item.order_type}}</div>
            <div class="balance">余额: {{parseFloat(item.balance_left/100).toFixed(2)}}</div>
          </div>
          <div class="cardRight">
            <div class="time">{{item.generate_time}}</div>
            <div class="change">{{item.order_status}}{{parseFloat(item.price/100).toFixed(2)}}</div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="backTotop" @click="scrollTotop" v-show="showTotop">
      <img src="~/assets/images/back-to-top.png" alt="">
    </div>
  </div>
</template>

<script>
  import {getPayment} from '@/network/payment.js'
  export default {
    name: "Detail",
    data () {
      return {
        currentPage: 1,
        listData: [],
        isRefresh: false,
        hasMore: false,
        allNum: 0,
        showTotop: false,
      }
    },
    methods:{
      _getList() {
        getPayment(this.currentPage).then(res=>{
          let data = res.data.data;
          this.currentPage+=1;
          data.map(item=>{
            if(item.order_type=='o') {
              item.order_type = '转运'
            } else if(item.order_type=='a') {
              item.order_type = '代购'
            } else if(item.order_type=='d') {
              item.order_type = '退税'
            } else if(item.order_type=='w') {
              item.order_type = '发起提现'
            } else if(item.order_type=='c') {
              item.order_type = '充值'
            }
            if(item.order_status=='0') {
              item.order_status = '-'
            } else if(item.order_status=='1') {
              item.order_status = '+'
            }
            this.listData.push({
              order_type: item.order_type,
              balance_left: item.balance_left,
              generate_time: item.generate_time,
              price: item.price,
              order_status: item.order_status,
            })
          })
          this.allNum = res.data.payments_num;
          if(this.isRefresh==true) {
            this.isRefresh = false;
            this.$refs.my_scroller.finishPullToRefresh()
          }
          this.hasMore = !(this.listData.length==this.allNum)
          this.$refs.my_scroller.finishInfinite(!this.hasMore)
          this.$store.commit('showLoading',false)
        })
      },
      refresh(){this.isRefresh=true;this.listData=[];this.currentPage=1;this._getList()},
      infinite(){if(this.hasMore==true){this._getList()}else{this.$refs.my_scroller.finishInfinite(true)}},
    
      scrollTotop() {
        this.$refs.my_scroller.scrollTo(0,0,0)
      }
    },
    activated() {
      this.$store.commit('showLoading',true)
      this.currentPage = 1;
      this._getList();
      this.listenTotop = setInterval(()=>{
        // let top = this.$refs.my_scroller.getPosition().top;
        // this.showTotop = top>100?true:false;
      },500)
    },
    deactivated() {
      window.clearInterval(this.listenTotop);
      this.listenTotop = null;
    }
  }
</script>

<style scoped>
  .detail {
    width: 100vw;
    height: calc(100vh - 60px);
    position: relative;
  }
  .header {
    z-index: 1000;
  }
  .back, .link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e9e9e9aa;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
  }
  .back {top: 10px;left: 10px;}
  .header img {
    width: 30px;
    height: 30px;
  }
  .header .title {
    font-size: 24px;
    text-align: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .my_scroller {
    margin-top: 60px;
  }
  .cardItem {
    width: 100vw;
    height: 10vh;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #aaa;
  }
  .cardItem .name {
    font-size: 18px;
  }
  .cardItem .balance {
    margin-top: 5px;
    font-size: 12px;
  }
  .cardItem .time {
    text-align: right;
    font-size: 12px;
    color: #888;
  }
  .cardItem .change {
    margin-top: 5px;
    text-align: right;
    font-size: 18px;
    color: #000;
    font-weight: bold;
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