<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.push({name:'Application'})"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">出库订单</div>
    </div>
    <div class="tableSearch">
      <span>
        <select id="group" v-model="filter">
          <option value="outbound_ID">单号</option>
          <option value="outbound_type">种类</option>
          <option value="outbound_status">状态</option>
        </select>
      </span>
      <input type="search" v-model="search">
      <span><img src="~/assets/images/search.png" alt="" @click="goSearch"></span>
      <span class="cancle" @click="goBack" v-if="isSearch">×</span>
    </div>
    <div class="tableBox">
      <table v-if="tableData.length>0">
        <thead>
          <tr>
            <th style="width:10vw;font-size:18px">出库<br>单号</th>
            <th style="width:20vw;font-size:18px">货物<br>编号</th>
            <th style="width:20vw;font-size:18px">地址</th>
            <th style="width:10vw;font-size:18px">材料</th>
            <th style="width:10vw;font-size:18px">种类</th>
            <th style="width:20vw;font-size:18px">提交<br>时间</th>
            <th style="width:10vw;font-size:18px">状态</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in tableData" :key="index">
            <td style="width:10vw;">{{item.outbound_ID}}</td>
            <td style="width:20vw;">{{item.storage_nums}}</td>
            <td style="width:20vw;">{{item.address}}</td>
            <td style="width:10vw;">
              <img class="material" v-for="(i,index2) in item.material.slice(0,1)" 
               @click="$store.commit('showImg',[i,true])"
              :key="index2" :src="i" alt="">
            </td>
            <td style="width:10vw;">
              <span v-if="item.outbound_type=='0'">普通</span>
              <span v-else-if="item.outbound_type=='1'">退税</span>
            </td>
            <td style="width:20vw;">{{item.outbound_apply_time}}</td>
            <td style="width:10vw;">
              <span v-if="item.outbound_status==0">待付款
                <div style="margin-top:5px" @click="goPay(item)">
                  <span style="background-color:var(--color-all);color:#fff;padding:3px">付款</span>
                </div>
              </span>
              <span v-else-if="item.outbound_status==1">待审核</span>
              <span v-else-if="item.outbound_status==2">已驳回</span>
              <span v-else-if="item.outbound_status==3">已取消</span>
              <span v-else-if="item.outbound_status==4">运输中</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else style="font-size:20px;line-height:642px;text-align:center;">查询无果</div>
    </div>
    <div class="tableFooter" v-if="pageNum>1">
      <div class="pageIndex" @click="changePage(-1)" :style="{'color':(currentIndex==1)?'#aaa':'var(--color-all)'}">◂</div>
      <div class="pageIndex" v-for="(item,index) in pageNum" :key="index"
        @click="changePage(item)"
        :style="{'display':(
          ((item==currentIndex)||((currentIndex<5)&&(item<6)))||
          (pageNum<7||item==1||item==pageNum||(currentIndex-2<=item&&item<=currentIndex+2))||
          (currentIndex<5&&item==6)||
          (currentIndex==4&&item==7)||
          (currentIndex>4&&item==currentIndex-3)||
          (currentIndex>4&&item==currentIndex+3)
        )?'':'none',
        'color':(item==currentIndex)?'var(--color-all)':'#777',
        'font-weight':(item==currentIndex)?'bolder':'',
        'font-size':(item==currentIndex)?'18px':'14px'}"
      >
        <span :style="{'font-size':(item==currentIndex)?'18px':'14px'}" v-if="(item==currentIndex)||((currentIndex<5)&&(item<6))">{{item}}</span>
        <span :style="{'font-size':(item==currentIndex)?'18px':'14px'}" v-else-if="pageNum<7||item==1||item==pageNum||(currentIndex-2<=item&&item<=currentIndex+2)">{{item}}</span>
        <span :style="{'font-size':(item==currentIndex)?'18px':'14px'}" v-else-if="currentIndex<5&&item==6">···</span>
        <span :style="{'font-size':(item==currentIndex)?'18px':'14px'}" v-else-if="currentIndex==4&&item==7">···</span>
        <span :style="{'font-size':(item==currentIndex)?'18px':'14px'}" v-else-if="currentIndex>4&&item==currentIndex-3">···</span>
        <span :style="{'font-size':(item==currentIndex)?'18px':'14px'}" v-else-if="currentIndex>4&&item==currentIndex+3">···</span>
      </div>
      <div class="pageIndex" @click="changePage(0)" :style="{'color':(currentIndex==pageNum)?'#aaa':'var(--color-all)'}">▸</div>
    </div>
  </div>
</template>

<script>
  import {getOutputList,filterOutputList} from '@/network/transship.js'
  import {getOrder} from '@/network/payment.js'
  export default {
    name: "TransmitOrderlist",
    data () {
      return {
        isSearch: false,
        filter: 'outbound_ID',
        search: '',
        tableData: [],
        currentIndex: 1,
        pageNum: null,
      }
    },
    methods:{
      _getOutputList() {
        if(this.isSearch==false) {
          getOutputList(this.currentIndex).then(res=>{
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              console.log(res);
              this.tableData.map(item=>{
                item.material = item.material.split(',')
              })
              this.pageNum = Math.ceil(res.data.outbounds_num/10);
              // console.log(this.tableData);
              this.$store.commit('showLoading',false);
            }
          })
        } else {
          filterOutputList(this.filter,this.search,this.currentIndex).then(res=>{
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              this.tableData.map(item=>{
                item.material = item.material.split(',')
              })
              this.pageNum = Math.ceil(res.data.applications_num/10);
              console.log(this.tableData);
              this.$store.commit('showLoading',false);
            }
          })
        }
      },
      changePage(index) {
        if(index==-1&&this.currentIndex!=1) {
          this.$store.commit('showLoading',true);
          this.currentIndex--;
          this._getOutputList();
        } else if(index==0&&this.currentIndex!=this.pageNum) {
          this.$store.commit('showLoading',true);
          this.currentIndex++;
          this._getOutputList();
        } else if(index!=0&&index!=-1) {
          this.$store.commit('showLoading',true);
          this.currentIndex = index;
          this._getOutputList();
        }
      },
      goSearch() {
        if(this.search=='') {
          this.$store.commit('showTip','请输入搜索关键词')
        } else {
          this.$store.commit('showLoading',true);
          this.isSearch = true;
          this.currentIndex = 1;
          this._getOutputList();
        }
      },
      goBack() {
        this.$store.commit('showLoading',true);
        this.isSearch = false;
        this.search = '';
        this.filter = 'outbound_ID';
        this.currentIndex = 1;
        this._getOutputList();
      },
      goPay(item) {
        if(item.pay_type=="balance") {
          this.$store.commit('handlePay',{
            order_type:'o',
            price:item.price,
            id:item.outbound_ID,
            success:false,
            state:true,
            show:true
          });
        } else if(item.pay_type=="Globepay") {
          getOrder({
            order_type: 'o',
            id: item.outbound_ID
          }).then(res=>{
            let url = res.data.RedirectUrl;
            window.location.replace(url);
          })
        }
      }
    },
    activated() {
      this.$store.commit('showLoading',true);
      this.currentIndex = 1;
      this._getOutputList();
      
      this.$bus.$on('paystatus', (info)=>{
        if(info.order_type=='o') {
          if(info.status=='ok') {
            this.$store.commit('showTip', '支付成功')
          } else {
            this.$store.commit('showTip', '支付失败')
          }
          this._getOutputList();
        }
      })
    },
  }
</script>

<style scoped>
  .transmit {
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
  .tableSearch {
    height: 40px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .tableSearch select {
    width: 20vw;
    height: 30px;
    border-radius: 10px;
    outline: none;
    padding: 0 5px;
    font-size: 16px;
  }
  .tableSearch input {
    width: 50vw;
    height: 30px;
    margin-left: 5vw;
    border-radius: 10px;
    outline: none;
    padding: 0 10px;
    font-size: 16px;
  }
  .tableSearch img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
  .tableSearch .cancle {
    font-size: 30px;
    color: #000;
    line-height: 30px;
    margin-left: 10px;
  }
  .tableBox {
    width: 100vw;
    height: 642px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    /* border: 3px solid #000; */
  }
  td {word-break:break-all;}
  tbody tr {
    height: 60px;
  }

  table {font-size:11px;color:#333333;border-collapse: collapse;}
  table th {background-color: #dedede;}
  table td {border-bottom: 1px solid #999;background-color: #ffffff;text-align:center;}

  .material {
    width: 10vw;
  }
</style>