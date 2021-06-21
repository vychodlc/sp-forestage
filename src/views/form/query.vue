<template>
  <div class="query">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">礼品卡查询</div>
    </div>
    <div class="formbox">
      <div class="formItem">
        <div class="name">品牌</div>
        <div class="inputBox">
          <div class="inputContent">
            <div :class="cardInfo.brand=='N'?'radioItemActive':'radioItem'" @click="changeRadio(0)">Nike</div>
            <div :class="cardInfo.brand=='A'?'radioItemActive':'radioItem'" @click="changeRadio(1)">Adidas</div>
            <div :class="cardInfo.brand=='JD'?'radioItemActive':'radioItem'" @click="changeRadio(2)">JD</div>
          </div>
        </div>
      </div>
      <div class="formItem">
        <div class="name">卡号</div>
        <input type="text" id="card_num" @input="isCommit=false" v-model="cardInfo.card_num">
      </div>
      <div class="formItem">
        <div class="name">PIN</div>
        <input type="text" id="pin" @input="isCommit=false" v-model="cardInfo.pin">
      </div>
      <div class="formItem" v-if="isCommit">
        <div class="name">有效性</div>
        <span class="cardStatus1" v-if="!isValid">无效</span>
        <span class="cardStatus2" v-else>有效：余额 ￡{{money}}</span>
      </div>
    </div>
    <div class="footer">
      <div class="btnbox">
        <div class="btn" @click="submit()">查询</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { crawlerGiftcard } from '@/network/agency.js'
  export default {
    name: "Query",
    data () {
      return {
        cardInfo: {
          brand: '',
          card_num: '',
          pin: '',
        },
        cardVal: '',
        isCommit: false,
        isValid: '',
        money: '',
      }
    },
    activated() {
      this.isValid = '';
      this.cardInfo = {
        brand: '',
        card_num: '',
        pin: '',
      };
      this.isCommit = false;
    },
    methods:{
      changeRadio(val) {
        let brands = ['N','A','JD']
        this.cardInfo.brand = brands[val]
      },
      submit() {
        if(this.cardInfo.brand=='') {
          this.$store.commit('showTip','请选择礼品卡品牌')
        } else if(this.cardInfo.card_num=='') {
          this.$store.commit('showTip','请输入礼品卡卡号')
        } else if(this.cardInfo.pin=='') {
          this.$store.commit('showTip','请输入礼品卡PIN码')
        } else {
          this.$store.commit('showLoading',true)
          if(this.cardInfo.brand=='JD') {
            crawlerGiftcard(this.cardInfo).then(res=>{
              console.log(res);
              this.isCommit = true;
              if(res.data.status=='503') {
                this.isValid = false
              } else if(res.data.status=='200') {
                this.isValid = true;
                this.money = res.data.balance;
              } else if(res.data.status=='501') {
                console.log('eeee');
              }
              this.$store.commit('showLoading',false)
            })
          } else {
            this.$store.commit('showTip','当前仅支持JD查询')
            this.$store.commit('showLoading',false)
          }
        }
      },
    },
  }
</script>

<style scoped>  
  .query {
    width: 100vw;
    height: 100vh;
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

  
  .formbox {
    width: 100vw;
    height: calc(100vh - 60px - 80px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }

  .formbox .formItem {
    font-size: 16px;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px 5px;
    border-radius: 10px;
  }
  .formbox .formItem .name {
    width: 80px;
    font-size: 16px;
    display: inline-block;
    padding-right: 10px;
    /* border: 1px solid #9d9; */
    text-align: right;
    color: #999;
  }
  .formbox .formItem input[type="text"] {
    font-size: 14px;
    width: calc(100vw - 40px - 80px - 10px);
    background: none;
    border: none;
    border-bottom: 1px solid #999;
    outline: none;
    padding: 2px 10px;
  }
  .formbox .formItem input:focus {
    border-bottom: 1px solid var(--color-all);
  }
  .formItem .inputBox {
    display: inline-block;
    width: calc(100vw - 40px - 80px - 10px);
  }
  .formItem .inputBox .inputContent {
    width: 100%;
    display: flex;
    flex-flow: wrap;
  }
  .inputContent .checkboxItem {
    width: 12vw;
  }
  .inputContent .checkboxItem .checkboxContent {
    background-color:#f0f1f2;
    color:#777;
    width:10vw;
    border-radius:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    font-size: 12px;
  }
  .inputContent .checkboxItem .checkboxContentActive {
    background-color:#d5ebe7;
    color: var(--color-all);
    width:10vw;
    border-radius:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    font-size: 12px;
  }  .formItem .inputBox .inputContent .radioItem {
    background-color:#f0f1f2;
    color:#777;
    padding: 2px 5px;
    border-radius:5px;
    height:22px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    margin-left: 10px;
    font-size: 12px;
  }
  .formItem .inputBox .inputContent .radioItemActive {
    background-color:#d5ebe7;
    color: var(--color-all);
    padding: 2px 5px;
    border-radius:5px;
    height:22px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    margin-left: 10px;
    font-size: 12px;
  }

  
  .footer {
    width: 100vw;
    height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    /* border: 1px solid #000; */
    display: flex;
    flex-direction: row;
  }
  .footer .btnbox {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer .btn {
    width: 35vw;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  .footer .btnbox:first-child .btn {
    border: 1px solid var(--color-all);
    color: var(--color-all);
  }
  .footer .btnbox:last-child .btn {
    background-color: var(--color-all);
    color: #fff;
  }
  .cardStatus1 {
    background-color: #e6a23c;
    color: #fff;
    margin-right: 10px;
    padding: 2px 5px;
  }
  .cardStatus2 {
    background-color: #67c23a;
    color: #fff;
    margin-right: 10px;
    padding: 2px 5px;
  }
</style>