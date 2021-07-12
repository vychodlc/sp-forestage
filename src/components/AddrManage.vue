<template>
  <div class="addrmanager">
    <div class="header">
      <div class="back" @click="$store.commit('changeShow',{name:'showAddr',value:false})"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">我的收货地址</div>
    </div>
    <div class="addrCards" v-if="$store.state.address.list.length>0">
      <div class="addrCard" v-for="(item,index) in $store.state.address.list" :key="index" @click="selectAddress(item)">
        <div class="cardTop">
          <div class="cardLeft">
            <div class="icon">{{item.user_name.slice(0,1)}}</div>
          </div>
          <div class="cardRight">
            <div class="addrText">
              <span class="title">{{item.user_name}}</span>
              <span class="phone">{{item.phone}}</span>
              <div style="margin-top:10px;width:60vw;">
                <!-- <span class="tag">默认</span> -->
                <span class="address">{{item.addr}}</span>
              </div>
            </div>
            <div class="editIcon" @click.stop="_editAddress(item)">
              <img src="~/assets/images/edit.png" alt="">
            </div>
          </div>
        </div>
        <div class="cardBottom">
          <div class="bottomLeft">
            <div v-if="item.default==1" class="checked">✓</div>
            <div v-else class="nocheck" @click.stop="changeDefault(item.address_ID)"></div>
            <span>默认地址</span>
          </div>
          <div class="bottomRight">
            <span @click.stop="showDelete=true;handleAddr=item">删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tip" v-else>暂无收货地址</div>
    <div class="footer">
      <div @click="$store.commit('changeShow',{name:'addrAdd',value:true})"><span style="margin-right:10px;font-size:30px">+</span> 添加收货地址</div>
    </div>
    <div class="delete" v-if="showDelete">
      <div class="content">
        <div class="title">确定要删除该地址吗</div>
        <div class="option">
          <div class="btn" @click="showDelete=false">取消</div>
          <div class="btn" @click="_delAddress()">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addAddress,delAddress,changeAddressDefault,editAddress,getAddress} from '@/network/address'
  export default {
    name: "AddrManage",
    data () {
      return {
        addrList: [],
        handleAddr: null,
        showDelete: false,
      }
    },
    methods:{
      _getAddress() {
        getAddress().then(res=>{
          if(res.data.status=='200') {
            this.$store.commit('handleAddress',{name:'updateList',value:res.data.data})
            let list = this.$store.state.address.list;
            let select = this.$store.state.address.select;
            let has = false;
            list.map(addr=>{
              if(addr.address_ID==select.address_ID) {
                has = true
              }
            })
            if(has==false) {
              let hasDefault = false;
              list.map(addr=>{
                if(addr.default=='1') {
                  hasDefault = true;
                  this.$store.commit('handleAddress',{name:'selectAddress',item:addr})
                }
              })
              if(hasDefault==false) {
                this.$store.commit('handleAddress',{name:'selectAddress',item:list[0]})
              }
            }
          }
        })
      },
      _editAddress(item) {
        this.$store.commit('handleAddress',{name:'updateEdit',value:{
          name: item.user_name,
          address: item.addr,
          phone: item.phone,
          address_ID: item.address_ID
        }});
      },
      _delAddress() {
        delAddress(this.handleAddr.address_ID).then(res=>{
          if(res.data.status=='200') {
            this._getAddress();
            this.$store.commit('showTip','删除地址成功');
          } else {
            this.$store.commit('showTip','删除地址失败——'+res.data.msg)
          }
          this.showDelete=false;
        })
      },
      changeDefault(id) {
        changeAddressDefault(id).then(res=>{
          if(res.data.status=='200') {
            this._getAddress();
            this.$store.commit('showTip','默认地址修改成功');
          } else {
            this.$store.commit('showTip','默认地址修改失败'+res.data.msg)
          }
        })
      },
      selectAddress(item) {
        this.$bus.$emit('selectAddress',item)
        this.$store.commit('handleAddress',{name:'selectAddress',item:item})
      },
    },
  }
</script>

<style scoped>
  .addrmanager {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 375px;
    height: 810px;
    overflow-y: scroll;
    background-color: var(--color-background);
    padding-top: 60px;
    padding-bottom: 80px;
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

  .addrCard {
    width: 96vw;
    margin-left: 2vw;
    background-color: #fff;
    height: 120px;
    margin-top: 15px;
    border-radius: 20px;
  }
  .cardTop {
    /* border: 1px solid #6d6; */
    height: 70%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ccc;
    margin: 0 10px;
  }
  .cardBottom {
    /* border: 1px solid #616; */
    height: 30%;
  }
  .cardLeft {
    /* border: 1px solid #66d; */
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .cardLeft .icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 25px;
    border-radius: 50%;
    background-color: var(--color-all);
  }
  .cardRight {
    width: calc(96vw - 70px);
    /* border: 1px solid #d60; */
    padding-top: 10px;
    position: relative;
  }
  .cardRight .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
  }
  .cardRight .phone {
    font-size: 12px;
    color: #777;
    margin-left: 5px;
  }
  .cardRight .tag {
    padding: 2px;
    margin-top: 5px;
    font-size: 12px;
    border-radius: 5px;
    background-color: var(--color-all);
    color: #fff;
  }
  .cardRight .address {
    margin-left: 5px;
    line-height: 18px;

    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
  }

  .editIcon {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .editIcon img {
    width: 30px;
    height: 30px;
  }
  .cardBottom {
    color: #888;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .cardBottom .checked {
    display: inline-block;
    background-color: var(--color-all);
    width: 15px;
    height: 15px;
    color: #fff;
    line-height: 15px;
    text-align: center;
    border-radius: 50%;
    margin-right: 5px;
  }
  .cardBottom .nocheck {
    display: inline-block;
    border: 1px solid #999;
    width: 15px;
    height: 15px;
    color: #fff;
    line-height: 15px;
    text-align: center;
    border-radius: 50%;
    margin-right: 5px;
  }
  .bottomLeft {
    display: flex;
    align-items: center;
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

  .tip {
    width: 100vw;
    height: 300px;
    text-align: center;
    line-height: 700px;
    font-size: 20px;
  }

  .delete {
    width: 100vw;
    height: 100vh;
    background-color: #77777777;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2001;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .delete .content {
    width: 80vw;
    /* height: 150px; */
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 0;
  }
  .delete .content .title {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin-bottom:50px;
  }
  .delete .content .option {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .delete .content .option .btn {
    width: 40%;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
  }
  .delete .content .option .btn:first-child {
    color: #fff;
    background-color: #ccc;
  }
  .delete .content .option .btn:last-child {
    color: var(--color-all);
    border: 1px solid var(--color-all);
    background-color: #fff;
  }
</style>