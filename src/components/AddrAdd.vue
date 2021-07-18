<template>
  <div class="addradd">
    <div class="header">
      <!-- <div class="back" @click="$store.commit('changeShow',{name:'addrAdd',value:false})"><img src="~/assets/images/arrow-left-bold.png" alt=""></div> -->
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">添加收货地址</div>
    </div>
    <div class="content">
      <div class="inputItem">
        <div class="inputItemTitle">收货人</div>
        <div class="inputItemText"><input type="text" placeholder="名字" v-model="newAddress.name"></div>
      </div>
      <div class="inputItem">
        <div class="inputItemTitle">手机号码</div>
        <div class="inputItemText"><input type="text" placeholder="手机号" v-model="newAddress.phone"></div>
      </div>
      <div class="inputItem">
        <div class="inputItemTitle">详细地址</div>
        <div class="inputItemText"><input type="text" placeholder="省、市、区、街道、小区楼栋/乡村名称" v-model="newAddress.address"></div>
      </div>
    </div>
    <div class="footer">
      <div @click="_addAddress()">保存</div>
    </div>
  </div>
</template>

<script>
  import {addAddress,delAddress,changeAddressDefault,editAddress,getAddress} from '@/network/address'
  export default {
    name: "AddrAdd",
    data () {
      return {
        newAddress: {
          name: '',
          phone: '',
          address: '',
        }
      }
    },
    methods:{
      _addAddress() {
        if(this.newAddress.name=='') {
          this.$store.commit('showTip','请输入收货人')
        } else if(this.newAddress.phone=='') {
          this.$store.commit('showTip','请输入手机号码')
        } else if(this.newAddress.phone!=parseInt(this.newAddress.phone)) {
          this.$store.commit('showTip','请输入正确的手机号码')
        } else if(this.newAddress.address=='') {
          this.$store.commit('showTip','请输入收货地址')
        } else {
          this.$store.commit('showLoading',true)
          addAddress(this.newAddress).then(res=>{
            if(res.data.status='200') {
              getAddress().then(res=>{
                this.$store.commit('handleAddress',{name:'updateList',value:res.data.data});
                // this.$store.commit('changeShow',{name:'addrAdd',value:false});
                this.$router.go(-1)
                this.$bus.$emit("addrChange");
                this.$store.commit('showLoading',false)
                this.newAddress =  {
                  name: '',
                  phone: '',
                  address: '',
                }
              })
            } else {
              this.$store.commit('showTip','新增地址失败'+msg)
              this.$store.commit('showLoading',false)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .addradd {
    border: 1px solid transparent;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 100vw;
    height: 100%;
    /* overflow-y: scroll; */
    background-color: var(--color-background);
    padding-top: 60px;
  }
  .header {
    z-index: 1000;
    background-color: var(--color-background);
    position: fixed;
    top: 0;
    width: 100vw;
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
    line-height: 30px;
    text-align: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .content {
    width: 100vw;
    height: 100%;
    border: 1px solid transparent;
    background-color: #fff;
  }
  .content .inputItem {
    width: 90vw;
    margin-left: 5vw;
    border-bottom: 1px solid #bbb;
    padding: 20px 0;
  }
  .inputItem .inputItemTitle {
    display: inline-block;
    width: 80px;
    /* border: 1px solid #000; */
    font-size: 16px;
    font-weight: bold;
  }
  .inputItem .inputItemText {
    display: inline-block;
  }
  .inputItem .inputItemText input {
    border: none;
    outline: none;
    font-size: 16px;
  }
  
  .footer {
    width: 100vw;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }
  .footer div {
    width: 96vw;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    margin-left: 2vw;
    background-color: var(--color-all);
    border-radius: 20px;
    color: #fff;
  }
</style>