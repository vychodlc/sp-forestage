<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">转运订单</div>
    </div>
    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <th style="width:20vw;font-size:18px">申报<br>单号</th>
            <th style="width:20vw;font-size:18px">单号</th>
            <th style="width:20vw;font-size:18px">邮箱</th>
            <th style="width:10vw;font-size:18px">品牌</th>
            <th style="width:20vw;font-size:18px">提交<br>时间</th>
            <th style="width:10vw;font-size:18px">状态</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in tableData" :key="index">
            <td>{{item.apply_ID}}</td>
            <td>{{item.expressid}}</td>
            <td>{{item.email}}</td>
            <td>
              <span v-if="item.brand=='N'">Nike</span>
              <span v-else-if="item.brand=='A'">Adidas</span>
              <span v-else-if="item.brand=='JD'">JD</span>
              <span v-else-if="item.brand=='U'">通用</span>
            </td>
            <td>{{item.apply_time}}</td>
            <td>
              <span v-if="item.apply_status==0">未入库</span>
              <span v-else-if="item.apply_status==1">已入库</span>
              <span v-else-if="item.apply_status==2">已驳回</span>
            </td>
            <!-- <td><div class="delete" v-if='tableData.length!=1' @click="delItem(index)">×</div></td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tableFooter">
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
  import {getApplyList} from '@/network/transship.js'
  export default {
    name: "TransmitOrderlist",
    data () {
      return {
        tableData: [],
        currentIndex: 1,
        pageNum: null,
      }
    },
    methods:{
      _getApplyList() {
        getApplyList(this.currentIndex).then(res=>{
          if(res.data.status=='200') {
            this.tableData = res.data.data;
            this.pageNum = Math.ceil(res.data.applications_num/10);
            console.log(this.tableData);
          }
        })
      },
      changePage(index) {
        if(index==-1&&this.currentIndex!=1) {
          this.currentIndex--;
          this._getApplyList();
        } else if(index==0&&this.currentIndex!=this.pageNum) {
          this.currentIndex++;
          this._getApplyList();
        } else if(index!=0&&index!=-1) {
          this.currentIndex = index;
          this._getApplyList();
        }
      }
    },
    activated() {
      this.currentIndex = 1;
      this._getApplyList();
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
  .tableBox {
    width: 100vw;
    height: 700px;
    border: 3px solid #000;
  }
  tbody tr {
    height: 60px;
  }
</style>