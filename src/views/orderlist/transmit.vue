<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">入库订单</div>
      <div v-if="inCD==false" :class="isRefresh?'refreshTrue refresh':'refresh'" @click="refresh"><img src="~/assets/images/refresh.png" alt=""></div>
      <div v-else class="refresh" @click="$store.commit('showTip','刷新冷却时间还未结束')">{{CDTime}}s</div>
    </div>
    <div class="tableSearch">
      <span>
        <select id="group" v-model="filter">
          <option value="expressid">单号</option>
          <option value="email">邮箱</option>
          <option value="apply_status">状态</option>
          <option value="brand">品牌</option>
        </select>
      </span>
      <input type="search" v-model="search">
      <span><img src="~/assets/images/search.png" alt="" @click="goSearch"></span>
      <span class="cancle" @click="goBack" v-if="isSearch">×</span>
    </div>
    <div class="tableBox">
      <div class="tableItem">
        <table>
          <thead>
            <tr>
              <th>单号</th>
              <th>订单</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">        
              <td>{{item.apply_ID}}</td>
              <td>{{item.expressid}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableItem">
        <table>
          <thead>
            <tr>
              <th>邮箱</th>
              <th>时间</th>
              <!-- <th>订单</th> -->
              <th>客户</th>
              <th>价格</th>
              <th>礼品卡</th>
              <th>样式</th>
              <th>尺寸</th>
              <th>数量</th>
              <th>状态</th>
              <th>快递</th>
              <th>邮编</th>
              <th>地址一</th>
              <th>地址二</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{item.email}}</td>
              <td>{{item.op_date}}</td>
              <!-- <td>{{item.expressid}}</td> -->
              <td></td>
              <td>￡{{item.price}}</td>
              <td>{{item.gift}}</td>
              <td>{{item.style}}</td>
              <td>{{item.size}}</td>
              <td>{{item.op_quantity}}</td>
              <td>{{item.rolledUpStatus}}</td>
              <td>{{item.tracker}}</td>
              <td>{{item.postal}}</td>
              <td>{{item.first_address}}</td>
              <td>{{item.second_address}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="tableItem">
        <table>
          <thead>
            <th v-for="(item,index) in 20" :key="index">{{item}}</th>
          </thead>
          <tbody>
            <td v-for="(item,index) in 20" :key="index">{{item}}</td>
          </tbody>
        </table>
      </div> -->
      <!-- <table v-if="tableData.length>0">
        <thead>
          <tr>
            <th style="width:10vw;font-size:18px">申报<br>单号</th>
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
          </tr>
        </tbody>
      </table>
      <div v-else style="font-size:20px;line-height:642px;text-align:center;">查询无果</div> -->
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
  import {getApplyList,filterApplyList} from '@/network/transship.js'
  export default {
    name: "TransmitOrderlist",
    data () {
      return {
        isSearch: false,
        filter: 'expressid',
        search: '',
        tableData: [],
        currentIndex: 1,
        pageNum: null,
        isRefresh: false,
        inCD: false,
        CDTime: 0,
      }
    },
    methods:{
      _getApplyList() {
        if(this.isSearch==false) {
          getApplyList(this.currentIndex).then(res=>{
            console.log(res);
            if(res.data.status=='200') {
              this.tableData = res.data.data;
              this.tableData.map(data=>{
                if(typeof(data.op_date)=='string') {
                  data.op_date = data.op_date.split(',')[0]
                }
              })
              this.pageNum = Math.ceil(res.data.applications_num/10);
              this.$store.commit('showLoading',false);
            }
          })
        } else {
          filterApplyList(this.filter,this.search,this.currentIndex).then(res=>{
            if(res.data.status=='200') {
              this.tableData = res.data.data;
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
          this._getApplyList();
        } else if(index==0&&this.currentIndex!=this.pageNum) {
          this.$store.commit('showLoading',true);
          this.currentIndex++;
          this._getApplyList();
        } else if(index!=0&&index!=-1) {
          this.$store.commit('showLoading',true);
          this.currentIndex = index;
          this._getApplyList();
        }
      },
      goSearch() {
        if(this.search=='') {
          this.$store.commit('showTip','请输入搜索关键词')
        } else {
          this.$store.commit('showLoading',true);
          this.isSearch = true;
          this.currentIndex = 1;
          this._getApplyList();
        }
      },
      goBack() {
        this.$store.commit('showLoading',true);
        this.isSearch = false;
        this.search = '';
        this.filter = 'expressid';
        this.currentIndex = 1;
        this._getApplyList();
      },
      guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      refresh() {
        if(this.isRefresh==false) {
          this.isRefresh = true;
          getApplyList(0).then(res=>{
            let Alldata = res.data.data;
            let Handledata = Alldata.filter(item=>{return item.apply_status=='0'&&item.op_date!=null})
            let handleTimes = 0;

            Handledata.map(item=>{
              let returnItem = {
                order_time: [],
                price: [],
                maxOrderLineStatus:[],
                minOrderLineStatus:[],
                rolledUpStatus:[],
                size:[],
                style:[],
                op_date:[],
                op_description:[],
                op_quantity:[],
                first_address:[],
                second_address:[],
                city:[],
                postal:[],
                country:[],
                gift:[],
                tracker:[],
              }
              for(let key in returnItem) {
                let value = this.tableData.filter(tableItem=>{return tableItem.apply_ID==item.apply_ID})[0];
                if(value[key]) {
                  value[key] = 'pending'
                }
              }
              if(item.brand=='N') {
                console.log(item.expressid);
                let id = item.expressid;
                let email = item.email;
                let headers = {
                  "Content-Type": "application/x-www-form-urlencoded;",
                  "accept":"application/json",
                  "accept-language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5",
                  "appid":"orders",
                  "x-nike-visitid":"1",
                  "x-nike-visitorid":this.guid(),
                }
                let url1 = "https://api.nike.com/order_mgmt/user_order_details/v2/" + id + "?filter=email(" + email + ")";
                let url2 = "https://api.nike.com/ship/user_shipments/v1?locale=en_us&filter=orderNumber(" + id +")&filter=email("+email+")";
                
                this.$axios.all([
                  this.$axios.get(url1, {
                    headers: headers,
                  }),
                  this.$axios.get(url2, {
                    headers: headers,
                  })
                ]).then(this.$axios.spread((res1,res2)=>{

                  handleTimes++;

                  let data = res1.data;
                  returnItem.order_time.push(data.orderCreateDate?data.orderCreateDate:'');
                  returnItem.price.push(data.totalAmount?data.totalAmount:'');
                  data.orderLines.map(orderline=>{
                    returnItem.maxOrderLineStatus.push(orderline.maxOrderLineStatus?orderline.maxOrderLineStatus:'');
                    returnItem.minOrderLineStatus.push(orderline.minOrderLineStatus?orderline.minOrderLineStatus:'');
                    returnItem.rolledUpStatus.push(orderline.rolledUpStatus?orderline.rolledUpStatus:'');
                    returnItem.size.push(orderline.displaySize?orderline.displaySize:'');
                    returnItem.style.push(orderline.styleNumber?orderline.styleNumber+'-'+orderline.colorCode:'');
                    if(orderline.statuses) {
                      orderline.statuses.map(status=>{
                        returnItem.op_date.push(status.date?status.date:'');
                        returnItem.op_description.push(status.description?status.description:'');
                        returnItem.op_quantity.push(status.quantity?status.quantity:'');
                      });
                    }
                    if(orderline.shipTo&&orderline.shipTo.address) {
                      returnItem.first_address.push(orderline.shipTo.address.address1?orderline.shipTo.address.address1:'');
                      returnItem.second_address.push(orderline.shipTo.address.address2?orderline.shipTo.address.address2:'');
                      returnItem.city.push(orderline.shipTo.address.city?orderline.shipTo.address.city:'');
                      returnItem.postal.push(orderline.shipTo.address.zipCode?orderline.shipTo.address.zipCode:'');
                      returnItem.country.push(orderline.shipTo.address.country?orderline.shipTo.address.country:'');
                    }
                  });
                  if(data.paymentMethods) {
                    data.paymentMethods.map(paymentMethod=>{
                      returnItem.gift.push(paymentMethod.displayGiftCardNumber?paymentMethod.displayGiftCardNumber:'');
                    });
                  }
                  data = res2.data;
                  if(data.objects) {
                    data.objects.map(object=>{
                      if(object.containers) {
                        object.containers.map(container=>{
                          returnItem.tracker.push(container.trackingNumber?container.trackingNumber:'')
                        })
                      }
                    })
                  }
                  for(let key in returnItem) {
                    this.tableData.filter(tableItem=>{return tableItem.apply_ID==item.apply_ID})[0][key] = returnItem[key].join(',')
                  }
                  if(handleTimes==Handledata.length) {
                    this.isRefresh = false;
                    this.inCD = true;
                    this.CDTime = 10;
                    this.refreshCD();
                  }
                  console.log('ok');
                }))
              } else if(item.brand=='A') {
                
                  handleTimes++;
              
              } else if(item.brand=='JD') {

                  handleTimes++;

              }
            })
          })
        } else {
          this.$store.commit('showTip','请稍后，正在刷新');
        }
      },
      refreshCD() {
        if(this.CDTime>0) {
          this.CDTime--;
          setTimeout(() => {          
            this.refreshCD();
          }, 1000);
        } else {
          this.inCD = false
        }
      },
    },
    activated() {
      this.$store.commit('showLoading',true);
      this.currentIndex = 1;
      this._getApplyList();
    },
  }
</script>

<style scoped>
  @keyframes iconRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .transmit {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .header {
    z-index: 1000;
  }
  .back, .refresh {
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
  .refresh {top: 10px;right: 10px;}
  .refreshTrue {
    animation: iconRotate infinite 2s linear;
  }
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
  /* .tableBox {
    width: 100vw;
    height: 642px;
  }
  td {word-break:break-all;}
  tbody tr {
    height: 60px;
  }

  table {font-size:11px;color:#333333;border-collapse: collapse;}
  table th {background-color: #dedede;}
  table td {border-bottom: 1px solid #999;background-color: #ffffff;text-align:center;} */

  .tableBox {
    width: 100vw;
    height: 642px;
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
    width: 30vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .tableBox .tableItem:nth-child(1) td {
    width: 20vw;
  }
  .tableBox .tableItem:nth-child(2) {
    width: 70vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .tableBox .tableItem:nth-child(2) td {
    padding: 0 3px;
  }
  .tableBox .tableItem:nth-child(3) {
    width: 10vw;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .tableBox .tableItem:nth-child(3) yd {
    width: 10vw;
  }
</style>