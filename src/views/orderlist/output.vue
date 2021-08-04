<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
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
      <div class="tableItem" v-if="tableData.length>0">
        <table>
          <thead>
            <tr>
              <th>单号</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">        
              <td>{{item.outbound_ID}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableItem" v-if="tableData.length>0">
        <table>
          <thead>
            <tr>
              <th>货物编号</th>
              <th>地址</th>
              <th>种类</th>
              <th>材料</th>
              <th>价格</th>
              <th>支付方式</th>
              <th>提交时间</th>
              <th>出库时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{item.storage_nums}}</td>
              <td>{{item.address}}</td>
              <td>
                <span v-if="item.outbound_type=='0'">普通</span>
                <span v-if="item.outbound_type=='1'">退税</span>
              </td>
              <td style="width:10vw;">
                <img class="material" v-for="(i,index2) in item.material.slice(0,1)" 
                @click="showImg(i)"
                :key="index2" :src="i" alt="">
              </td>
              <td>{{parseFloat(item.price/100).toFixed(2)}}</td>
              <td>
                <span v-if="item.pay_type=='balance'">余额</span>
                <span v-else>聚合</span>
              </td>
              <td>{{item.outbound_apply_time}}</td>
              <td>{{item.outbound_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableItem" v-if="tableData.length>0">
        <table>
          <thead>
            <tr>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>
                <span v-if="item.pay_status==0">待支付</span>
                <span v-else-if="item.outbound_status=='0'">待审核</span>
                <span v-else-if="item.outbound_status=='1'">已取消</span>
                <span v-else-if="item.outbound_status=='2'">已驳回</span>
                <span v-else-if="item.outbound_status=='3'">待出库</span>
                <span v-else-if="item.outbound_status=='4'">转运中</span>
                <span v-else-if="item.outbound_status=='5'">已完成</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="tableData.length==0" style="font-size:20px;line-height:642px;text-align:center;width:100vw">查询无果</div>
    </div>
    <div class="tableFooter" v-if="pageNum>0">
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
    <div class="dialogChangePay" v-if="showChangePay">
      <div class="content">
        <div class="title">是否为未支付订单继续支付</div>
        <div class="text" style="width:100%;text-align:center;">
          <div class="textItem" style="font-size:16px">订单编号：{{pay302.order_id}}</div>
        </div>
        <div class="option">
          <div class="btn" @click="showChangePay=false">否</div>
          <div class="btn" @click="goPay()">是</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getOutputList,filterOutputList} from '@/network/transship.js'
  import {getOrder,checkPayment} from '@/network/payment.js'
  import {getBalance} from '@/network/user.js'
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
        showChangePay: false,
        pay302: null,
      }
    },
    methods:{
      _getOutputList() {
        if(this.isSearch==false) {
          getOutputList(this.currentIndex).then(res=>{
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              this.tableData.map(item=>{
                item.material = item.material.split(',')
              })
              this.pageNum = Math.ceil(res.data.outbounds_num/10);
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
      handlePay(item) {
        this.$store.commit('showLoading',true);
        checkPayment({
          order_type: 'o',
          id: item.outbound_ID
        }).then(res=>{
          if(res.data.status=='302') {
            this.pay302 = res.data;
            getBalance().then(res=>{
              this.$store.commit('handleUser',{balance:res.data.balance})
              if(this.pay302.order_id==item.outbound_ID) {
                this.showChangePay = false;
                this.$store.commit('handlePay',{show:true,method:true,id:this.pay302.order_id,order_type:this.pay302.order_type,price:this.pay302.price});
              } else {
                this.showChangePay = true;
                this.$store.commit('handlePay',{price:res.data.price,order_type:res.data.order_type,id:res.data.order_id});
              }
              this.$store.commit('showLoading',false);
            })
          } else if(res.data.status=='200') {
            getBalance().then(res=>{
              this.$store.commit('handleUser',{balance:res.data.balance})
              this.$store.commit('handlePay',{price:item.price,order_type:'o',id:item.outbound_ID,show:true,method:true});
              this.$store.commit('showLoading',false);
            })
          }
        })
      },
      goPay() {
        this.showChangePay = false;
        this.$store.commit('handlePay',{show:true,method:true,id:this.pay302.order_id,order_type:this.pay302.order_type,price:this.pay302.price});
        // if(item.pay_type=="balance") {
        //   this.$store.commit('handlePay',{
        //     order_type:'o',
        //     price:item.price,
        //     id:item.outbound_ID,
        //     success:false,
        //     state:true,
        //     show:true
        //   });
        // } else if(item.pay_type=="Globepay") {
        //   getOrder({
        //     order_type: 'o',
        //     id: item.outbound_ID
        //   }).then(res=>{
        //     let url = res.data.RedirectUrl;
        //     window.location.replace(url);
        //   })
        // }
      },
      showImg(url) {
        window.history.pushState(null,null,'#')
        this.$store.commit('showImg',[url,true])
      }
    },
    activated() {
      window.addEventListener('popstate', e=>{
        this.$store.commit('showImg',['',false])
      }, false)
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
    beforeDestroy() {
      window.removeEventListener('popstate', e=>{
        this.$store.commit('showImg',['',false])
      }, false)
    }
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
    height: calc(100vh - 150px);
    display: flex;
    flex-direction: row;
  }
  
  table {font-size:11px;color:#333333;border-collapse: collapse;}
  
  .tableBox thead th,
  .tableBox tbody tr {
    white-space: nowrap;
    height: calc((100vh - 150px) / 11);
    border-bottom: 1px solid #999;
    text-align:center;
  }
  .tableBox thead th {
    background-color: #dedede;
    padding: 0 3px;
    height: calc((100vh - 150px) / 11);
  }

  .tableBox .tableItem:nth-child(1) {
    width: 15vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    box-shadow:5px 0 10px -5px #ccc;
  }
  .tableBox .tableItem:nth-child(2) {
    width: 70vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .tableBox .tableItem:nth-child(3) {
    width: 15vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    box-shadow:-5px 0 10px -5px #ccc;
  }
  .tableBox .tableItem:nth-child(1) td,
  .tableBox .tableItem:nth-child(2) td,
  .tableBox .tableItem:nth-child(3) td {
    width: 15vw;
    padding: 0 8px;
  }
  .material {
    height: calc((100vh - 150px) / 11 - 10px);
  }

  .dialogChangePay {
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
  .dialogChangePay .content {
    width: 80vw;
    height: 200px;
    background-color: #fff;
    border-radius: 5px;
  }
  .dialogChangePay .content .title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 20px;
    text-align: center;
  }
  .dialogChangePay .option {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .dialogChangePay .option .btn {
    width: 40%;
    margin-top: 30px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
  }
  .dialogChangePay .option .btn:first-child {
    color: var(--color-all);
    border: 1px solid var(--color-all);
  }
  .dialogChangePay .option .btn:last-child {
    background-color: var(--color-all);
    color: #fff;
  }
</style>