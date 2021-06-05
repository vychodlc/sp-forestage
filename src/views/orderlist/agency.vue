<template>
  <div class="agency">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">代购订单</div>
    </div>
    <!-- <div class="tableSearch">
      <span>
        <select id="group" v-model="filter">
          <option value="storage_ID">编号</option>
          <option value="size">尺寸</option>
          <option value="weight">重量</option>
          <option value="storage_status">状态</option>
        </select>
      </span>
      <input type="search" v-model="search">
      <span><img src="~/assets/images/search.png" alt="" @click="goSearch"></span>
      <span class="cancle" @click="goBack" v-if="isSearch">×</span>
    </div> -->
    <div class="tableBox">
      <div class="tableItem" v-if="tableData.length>0">
        <table>
          <thead>
            <tr>
              <th>单号</th>
              <th>订单</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">        
              <td>{{item.agency_ID}}</td>
              <td>{{item.storage_link}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableItem" v-if="tableData.length>0">
        <table>
          <thead>
            <tr>
              <th>价格</th>
              <th>数量</th>
              <th>尺寸</th>
              <th>品牌</th>
              <th>礼品卡</th>
              <th>购物账号</th>
              <th>折扣码</th>
              <th>添加时间</th>
              <th>采购时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>￡{{item.price}}</td>
              <td>{{item.order_num}}</td>
              <td>{{item.size}}</td>
              <td>
                <span v-if="item.brand=='N'">Nike</span>
                <span v-if="item.brand=='A'">Adidas</span>
                <span v-if="item.brand=='JD'">JD</span>
              </td>
              <td>
                <span v-if="item.giftcard_type=='0'">无</span>
                <span v-if="item.giftcard_type=='1'">平台提供</span>
                <span v-if="item.giftcard_type=='2'">自行提供</span>
              </td>
              <td>
                <span v-if="item.account_type=='0'">无</span>
                <span v-if="item.account_type=='1'">普通账号</span>
                <span v-if="item.account_type=='2'">生日账号</span>
              </td>
              <td>
                <span v-if="item.discount_type=='0'">无</span>
                <span v-if="item.discount_type=='1'">平台提供</span>
                <span v-if="item.discount_type=='2'">单次码</span>
                <span v-if="item.discount_type=='3'">复用码</span>
              </td>
              <td>{{item.apply_time}}</td>
              <td>{{item.interval}}</td>
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
                <span v-if="item.agency_status=='0'">待支付</span>
                <span v-if="item.agency_status=='1'">待受理</span>
                <span v-if="item.agency_status=='2'">支付取消</span>
                <span v-if="item.agency_status=='3'">已驳回</span>
                <span v-if="item.agency_status=='4'">进行中</span>
                <span v-if="item.agency_status=='5'">已完成</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="tableData.length==0" style="font-size:20px;line-height:642px;text-align:center;width:100vw;">查询无果</div>
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
  import {getAgency} from '@/network/agency.js'
  export default {
    name: "StorageList",
    data () {
      return {
        isSearch: false,
        filter: 'storage_ID',
        search: '',
        tableData: [],
        currentIndex: 1,
        pageNum: null,
      }
    },
    methods:{
      _getList() {
        if(this.isSearch==false) {
          getAgency(this.currentIndex).then(res=>{
            console.log(res);
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              this.pageNum = Math.ceil(res.data.agencys_num/10);
              this.$store.commit('showLoading',false);
            }
          })
        } else {
          // filterStorageList(this.filter,this.search,this.currentIndex).then(res=>{
          //   if(res.data.status=='200') {
          //     this.tableData = res.data.data;
          //     this.pageNum = Math.ceil(res.data.agencys_num/10);
          //     this.$store.commit('showLoading',false);
          //   }
          // })
        }
      },
      changePage(index) {
        if(index==-1&&this.currentIndex!=1) {
          this.$store.commit('showLoading',true);
          this.currentIndex--;
          this._getList();
        } else if(index==0&&this.currentIndex!=this.pageNum) {
          this.$store.commit('showLoading',true);
          this.currentIndex++;
          this._getList();
        } else if(index!=0&&index!=-1) {
          this.$store.commit('showLoading',true);
          this.currentIndex = index;
          this._getList();
        }
      },
      goSearch() {
        if(this.search=='') {
          this.$store.commit('showTip','请输入搜索关键词')
        } else {
          this.$store.commit('showLoading',true);
          this.isSearch = true;
          this.currentIndex = 1;
          this._getList();
        }
      },
      goBack() {
        this.$store.commit('showLoading',true);
        this.isSearch = false;
        this.search = '';
        this.filter = 'storage_ID';
        this.currentIndex = 1;
        this._getList();
      },
      showImg(url) {
        console.log(url);
      }
    },
    activated() {
      this.$store.commit('showLoading',true);
      this.currentIndex = 1;
      this._getList();
    },
  }
</script>

<style scoped>
  .agency {
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
    height: 700px;
    display: flex;
    flex-direction: row;
  }
  
  table {font-size:11px;color:#333333;border-collapse: collapse;}
  
  .tableBox thead th,
  .tableBox tbody tr {
    white-space: nowrap;
    height: 60px;
    border-bottom: 1px solid #999;
    text-align:center;
  }
  .tableBox thead th {
    background-color: #dedede;
    padding: 0 3px;
    height: 40px;
  }

  .tableBox .tableItem:nth-child(1) {
    width: 25vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    box-shadow:5px 0 10px -5px #ccc;
  }
  .tableBox .tableItem:nth-child(2) {
    width: 60vw;
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
    width: 20vw;
    padding: 0 8px;
  }
</style>