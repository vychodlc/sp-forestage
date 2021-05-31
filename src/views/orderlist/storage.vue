<template>
  <div class="Storage">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">库存信息</div>
    </div>
    <div class="tableSearch">
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
    </div>
    <div class="tableBox">
      <table v-if="tableData.length>0">
        <thead>
          <tr>
            <th style="width:10vw;font-size:18px">库存<br>编号</th>
            <th style="width:20vw;font-size:18px">图片</th>
            <th style="width:20vw;font-size:18px">尺寸</th>
            <th style="width:10vw;font-size:18px">重量</th>
            <th style="width:20vw;font-size:18px">入库<br>时间</th>
            <th style="width:10vw;font-size:18px">状态</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in tableData" :key="index">
            <td>{{item.storage_ID}}</td>
            <td @click="$store.commit('showImg',[item.pic,true])"><img :src="item.pic" alt="" style="width:20vw"></td>
            <td>{{item.size}}</td>
            <td>{{item.weight}}</td>
            <td>{{item.storage_time}}</td>
            <td>
              <span v-if="item.storage_status==0">库存中</span>
              <span v-else-if="item.storage_status==1">已出库</span>
            </td>
            <!-- <td><div class="delete" v-if='tableData.length!=1' @click="delItem(index)">×</div></td> -->
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
  import {getStorageList,filterStorageList} from '@/network/transship.js'
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
      _getStorageList() {
        if(this.isSearch==false) {
          getStorageList(this.currentIndex).then(res=>{
            console.log(res);
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              this.pageNum = Math.ceil(res.data.storages_num/10);
              this.$store.commit('showLoading',false);
            }
          })
        } else {
          filterStorageList(this.filter,this.search,this.currentIndex).then(res=>{
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              this.pageNum = Math.ceil(res.data.storages_num/10);
              this.$store.commit('showLoading',false);
            }
          })
        }
      },
      changePage(index) {
        if(index==-1&&this.currentIndex!=1) {
          this.$store.commit('showLoading',true);
          this.currentIndex--;
          this._getStorageList();
        } else if(index==0&&this.currentIndex!=this.pageNum) {
          this.$store.commit('showLoading',true);
          this.currentIndex++;
          this._getStorageList();
        } else if(index!=0&&index!=-1) {
          this.$store.commit('showLoading',true);
          this.currentIndex = index;
          this._getStorageList();
        }
      },
      goSearch() {
        if(this.search=='') {
          this.$store.commit('showTip','请输入搜索关键词')
        } else {
          this.$store.commit('showLoading',true);
          this.isSearch = true;
          this.currentIndex = 1;
          this._getStorageList();
        }
      },
      goBack() {
        this.$store.commit('showLoading',true);
        this.isSearch = false;
        this.search = '';
        this.filter = 'storage_ID';
        this.currentIndex = 1;
        this._getStorageList();
      },
      showImg(url) {
        console.log(url);
      }
    },
    activated() {
      this.$store.commit('showLoading',true);
      this.currentIndex = 1;
      this._getStorageList();
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
  table {table-layout:fixed;}
  td {word-break:break-all;}
  tbody tr {
    height: 60px;
  }

  table {font-size:11px;color:#333333;border-width: 1px;border-color: #666666;border-collapse: collapse;}
  table th {border: 1px solid #666666;background-color: #dedede;}
  table td {border: 1px solid #666666;background-color: #ffffff;text-align:center;}
</style>