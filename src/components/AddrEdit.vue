<template>
  <div class="addrEdit">
    <div class="header">
      <div class="back" @click="$store.commit('changeShow',{name:'addrEdit',value:false})"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">编辑收货地址</div>
    </div>
    <div class="content">
      <div class="inputItem">
        <div class="inputItemTitle">收货人</div>
        <div class="inputItemText"><input type="text" placeholder="名字" v-model="$store.state.address.edit.name"></div>
      </div>
      <div class="inputItem">
        <div class="inputItemTitle">手机号码</div>
        <div class="inputItemText"><input type="text" placeholder="手机号" v-model="$store.state.address.edit.phone"></div>
      </div>
      <div class="inputItem">
        <div class="inputItemTitle">详细地址</div>
        <div class="inputItemText"><input type="text" placeholder="省、市、区、街道、小区楼栋/乡村名称" v-model="$store.state.address.edit.address"></div>
      </div>
    </div>
    <div class="footer">
      <div @click="_editAddress()">保存</div>
    </div>
  </div>
</template>

<script>
  import {addAddress,delAddress,changeAddressDefault,editAddress,getAddress} from '@/network/address'
  export default {
    name: "AddrEdit",
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
      _editAddress() {
        if(this.$store.state.address.edit.name=='') {
          this.$store.commit('showTip','请输入收货人')
        } else if(this.$store.state.address.edit.phone=='') {
          this.$store.commit('showTip','请输入手机号码')
        } else if(this.$store.state.address.edit.address=='') {
          this.$store.commit('showTip','请输入收货地址')
        } else {
          editAddress(this.$store.state.address.edit).then(res=>{
            if(res.data.status='200') {
              this.$store.commit('changeShow',{name:'addrEdit',value:false});
              this.$bus.$emit("addrChange");
            } else {
              this.$store.commit('showTip','修改地址失败'+msg)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .addrEdit {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 375px;
    height: 810px;
    overflow-y: scroll;
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