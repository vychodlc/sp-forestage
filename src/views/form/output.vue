<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">{{kind}}出库</div>
    </div>
    <!-- <iframe id="payment" src="" frameborder="0"></iframe> -->
    <div class="progress">
      <div class="linebox">
        <div class="line line-not" v-for="(item,index) in stepNum-1" :key="index"></div>
      </div>
      <div class="step step-ing" id="step1">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">1</div>
        </div>
        <div class="text">出库选择</div>
      </div>
      <div class="step step-not" id="step2">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">2</div>
        </div>
        <div class="text">信息确认</div>
      </div>
      <div class="step step-not" id="step3">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">3</div>
        </div>
        <div class="text">提交表单</div>
      </div>
    </div>
    <div class="formbox" id="formbox1" v-show="currentStep==1">
      <div class="formboxHead">
        <table>
          <thead>
            <tr>
              <th style="width:10vw;font-size:18px">编号</th>
              <th style="width:20vw;font-size:18px">单号</th>
              <th style="width:10vw;font-size:18px">重量</th>
              <th style="width:10vw;font-size:18px">尺寸</th>
              <th style="width:20vw;font-size:18px">图片</th>
              <th style="width:20vw;font-size:18px">入库时间</th>
              <th style="width:10vw;font-size:18px">
                <!-- <input class="checkbox" type="checkbox" @click="checkAll()"> -->
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="formboxBody">
        <table>
          <tbody id="tbody">
            <tr v-for="(item,index) in storageList" :key="index">
              <td style="width:10vw;">{{item.storage_ID}}</td>
              <td style="width:20vw;">{{item.apply_id}}</td>
              <td style="width:10vw;">{{item.weight}}</td>
              <td style="width:10vw;">{{item.size}}</td>
              <td style="width:20vw;" @click="showImg(item.pic)"><img :src="item.pic" alt="" style="width:20vw"></td>
              <td style="width:20vw;">{{item.storage_time}}</td>
              <td style="width:10vw;">
                <input class="checkbox" type="checkbox" name="select" 
                :value="item.storage_ID" @click="clickCheckbox(item)">
              </td>
            </tr>
            <!-- <tr v-for="(item,index) in 100" :key="index">
              <td style="width:10vw;font-size:18px">编号</td>
              <td style="width:20vw;font-size:18px">单号</td>
              <td style="width:10vw;font-size:18px">重量</td>
              <td style="width:10vw;font-size:18px">尺寸</td>
              <td style="width:20vw;font-size:18px">图片</td>
              <td style="width:20vw;font-size:18px">入库时间</td>
              <td style="width:10vw;font-size:18px"></td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <div class="tableTip">
        <div class="ok" id="tableTip">
          <div class="title">选中数据</div>
          <div class="info">
            <span>共{{selectList.length}}条</span>
          </div>
        </div>
      </div>
    </div>
    <div class="formbox" v-show="currentStep==2">
      <!-- <div class="addressbox">
        <div class="content">
          <div class="text" v-if="$store.state.address.default==null&&selectAddr==null">
            <span style="line-height:20vw;text-align:center;font-size:20px">未设置默认地址</span>
          </div>
          <div class="text" v-else-if="selectAddr!=null">
            <span class="name">{{selectAddr.user_name}}</span>
            <span class="phone">{{selectAddr.phone}}</span>
            <div class="address">{{selectAddr.addr}}</div>
          </div>
          <div class="edit" @click="$store.commit('changeShow',{name:'showAddr',value:true});"><img src="~/assets/images/application/arrow-right.png" alt=""></div>
        </div>
      </div> -->
      <div class="addressbox">
        <div class="content">
          <div class="text" v-if="$store.state.address.select==null">
            <span style="line-height:20vw;text-align:center;font-size:20px">未设置默认地址</span>
          </div>
          <div class="text" v-else-if="$store.state.address.select!=null">
            <span class="name">{{$store.state.address.select.user_name}}</span>
            <span class="phone">{{$store.state.address.select.phone}}</span>
            <div class="address">{{$store.state.address.select.addr}}</div>
          </div>
          <!-- <div class="edit" @click="$store.commit('changeShow',{name:'showAddr',value:true});"><img src="~/assets/images/application/arrow-right.png" alt=""></div> -->
          <!-- <div class="edit" @click="showDialog=true"><img src="~/assets/images/application/arrow-right.png" alt=""></div> -->
          <div class="edit" @click="goAddress()"><img src="~/assets/images/application/arrow-right.png" alt=""></div>
        </div>
      </div>
      <div class="addressbox">
        <div class="goodsCard" v-for="(item,index) in selectList" :key="index">
          <div class="goodsImg"><img :src="item.pic" alt="" @click="showImg(item.pic)"></div>
          <div class="content">
            <div class="name">库存编号：{{item.storage_ID}}</div>
            <div class="info">
              <span>尺寸</span><span>{{item.size}}</span>
              <span>重量</span><span>{{item.weight}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="addressbox">
        <div class="text">
          <span class="name">金额</span>
          <span class="money" style="color:#000;margin-left:10px;font-size:18px">￡{{parseFloat(price/100).toFixed(2)}}</span>
        </div>
      </div>
      <!-- <div class="addressbox">
        <div class="text">
          <span class="name">支付方式</span>
          <div class="method">
            <input type="radio" v-model="paymethod" value="0" id="m1" v-if='parseInt(price)<=parseInt(money)'/>
            <input type="radio" v-model="paymethod" value="2" id="m1" v-else-if="parseInt(price)>parseInt(money)&&parseInt(money)>0"/>
            <input type="radio" value="-1" id="m1" v-else disabled/>
            <label for="m1" v-if='parseInt(price)<=parseInt(money)'>余额支付
              <span style="color:var(--color-all)">余额:￡{{parseFloat(money/100).toFixed(2)}}</span>
            </label>
            <label for="m1" v-else-if="parseInt(price)>parseInt(money)&&parseInt(money)>0">混合支付
              <span style="color:var(--color-all)">余额:￡{{parseFloat(money/100).toFixed(2)}}</span>
            </label>
            <label for="m1" v-else>余额不足
              <span style="color:red">余额:￡{{parseFloat(money/100).toFixed(2)}}</span>
            </label>
          </div>
          <div class="method">          
            <input type="radio" v-model="paymethod" value="1" id="method1"/><label for="method1">聚合支付</label>
          </div>
        </div>
      </div> -->
    </div>
    <div class="formbox" v-show="currentStep==3">
      <div class="resultBox">
        <div class="icon" style="background-color:var(--color-all)">✓</div>
        <div class="text">
          出库申请上传成功
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- <div class="btnbox" @click="changeStep(0)" v-if="currentStep!=3">
        <div class="btn" v-if="currentStep==1">取消</div>
        <div class="btn" v-else>上一步</div>
      </div> -->
      <div class="btnbox" @click="changeStep(1)">
        <div class="btn" v-if="currentStep==stepNum">完成</div>
        <div class="btn" v-else>下一步</div>
      </div>
    </div>
    <div class="dialog" v-if="showDialog">
      <div class="content">
        <div class="close" @click="showDialog=false">×</div>
        <div class="addrCards" v-if="$store.state.address.list.length>0">
          <div class="addrCard" v-for="(item,index) in $store.state.address.list" :key="index">
            <div class="cardTop">
              <div class="cardLeft">
                <div class="icon">{{item.user_name.slice(0,1)}}</div>
              </div>
              <div class="cardRight">
                <div class="addrText">
                  <span class="title">{{item.user_name}}</span>
                  <span class="phone">{{item.phone}}</span>
                  <div style="margin-top:10px;width:60vw;">
                    <span class="address">{{item.addr}}</span>
                  </div>
                </div>
                <div class="editIcon">
                  <img src="~/assets/images/edit.png" alt="">
                </div>
              </div>
            </div>
            <div class="cardBottom">
              <div class="bottomLeft">
                <div v-if="item.default==1" class="checked">✓</div>
                <div v-else class="nocheck"></div>
                <span>默认地址</span>
              </div>
              <div class="bottomRight">
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tip" v-else>暂无收货地址</div>
      </div>
    </div>
    <div class="editBox" v-if="showEdit">
      <div class="header">
        <div class="back" @click="showEdit=false"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
        <div class="title">修改地址信息</div>
      </div>
      <div class="form">
        <div class="formItem"><span>收货人</span><input type="text" v-model="editform.name"></div>
        <div class="formItem"><span>手机号码</span><input type="text" v-model="editform.phone"></div>
        <!-- <div class="formItem"><span>详细地址</span><input type="text" v-model="editform.address"></div> -->
        <div class="formItem"><span>详细地址</span><textarea v-model="editform.address" rows="2"></textarea></div>
      </div>
      <div class="editBtn" @click="addrEdit">保存</div>
    </div>
  </div>
</template>

<script>
  import {getStorageList,filterStorageList,addOutput} from '@/network/transship.js'
  import {putOrder,paymentBalance,checkPayment} from '@/network/payment.js'
  import {getBalance} from '@/network/user.js'
  import {getAddress} from '@/network/address'

  export default {
    name: "Transmit",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'普通',
        currentStep: 1,
        stepNum: 3,
        storageList: [],
        storageNum: null,
        pageIndex: 1,
        selectList: [],
        defaultAddr: 0,
        showDialog: false,
        addrIndex: 0,
        showEdit: false,
        editform: {name: '',phone: '',address: ''},
        selectAddr: null,
        paymethod: 0,
        useBalance: 0,
        money: 0,
        price: 0
      }
    },
    computed: {
      getTax() {
        return 1000*this.selectList.length
      }
    },
    methods:{
      changeStep(direction) {
        if(this.currentStep==1&&direction==0) {
          this.$router.go(-1)
        } else if(this.currentStep==1&&direction==1){
          if(this.selectList.length==0) {
            this.$store.commit('showTip', '请选择出库商品')
          } else {
            let weight = 0;
            this.selectList.map(item=>weight+=parseFloat(item.weight));
            weight = parseInt(weight/0.5);
            if(weight>59) {
              this.price = 11800;
            } else {
              this.price = this.$store.state.expressPrice[weight]*100;
            }
            getBalance().then(res=>{
              this.money = parseInt(res.data.balance);
              if(this.money<this.price) {
                this.useBalance = 1;
                this.paymethod = 1;
              }
              // if(this.$store.state.address.default!=null) {
              //   this.selectAddr = this.$store.state.address.default[0]
              // } else if(this.$store.state.address.list.length>0){
              //   this.selectAddr = this.$store.state.address.list[0]
              // }
              let list = this.$store.state.address.list;
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
              this.$store.commit('showLoading',false);
              document.getElementById('step1').className = 'step step-ed'
              document.getElementById('step2').className = 'step step-ing'
              document.getElementsByClassName('line')[0].className = 'line line-ed'
              this.currentStep+=1;
            })
          }
        } else if(this.currentStep==2&&direction==0){
          document.getElementById('step1').className = 'step step-ing'
          document.getElementById('step2').className = 'step step-not'
          document.getElementsByClassName('line')[0].className = 'line line-not'
          this.currentStep-=1
        } else if(this.currentStep==2&&direction==1){
          if(this.$store.state.address.select==null) {
            this.$store.commit('showTip','请选择收货地址')
          } else {
            this.$store.commit('showLoading',true);
            addOutput({
              storage_nums:this.selectList.map(item=>(item.storage_ID)),
              outbound_type:'0',
              material:'',
              address: this.$store.state.address.select.addr,
              price: this.price,
            }).then(res=>{
              if(res.data.status=='200') {                
                this.currentStep=3;
                document.getElementById('step2').className = 'step step-ed'
                document.getElementById('step3').className = 'step step-ing'
                document.getElementsByClassName('line')[1].className = 'line line-ed';
                this.$store.commit('showLoading',false);
                // this.$store.commit('handlePay',{order_type:'o',price:this.price,id:res.data.outbound_id});
                // let info = {
                //   order_type: 'o',
                //   id: res.data.outbound_id,
                //   pay_type: '',
                // }
                // if(this.paymethod=='0') {
                //   getBalance().then(res=>{
                //     this.$store.commit('handleUser',{balance:res.data.balance})
                //     this.$store.commit('handlePay',{success:false,state:true,show:true,info:info,method:false,pay_type:'balance'});
                //     this.$store.commit('showLoading',false);
                //   })
                // } else if(this.paymethod=='1'){
                //   info.pay_type = 'Globepay'
                //   putOrder(info).then(resPay=>{
                //     if(resPay.data.status=='302') {
                //       this.$store.commit('showTip','您有未支付的订单')
                //       if(this.$route.path!='/application') {
                //         this.$router.replace({name:'Application'})
                //       }
                //       this.$router.push({name:'OutputOrderlist'})
                //     } else if(resPay.data.status=='200') {
                //       let url = resPay.data.RedirectUrl;
                //       window.location.replace(url);
                //     }
                //   })
                // } else if(this.paymethod=='2'){
                //   getBalance().then(res=>{
                //     this.$store.commit('handleUser',{balance:res.data.balance})
                //     this.$store.commit('handlePay',{success:false,state:true,show:true,info:info,method:false,pay_type:'mix'});
                //     this.$store.commit('showLoading',false);
                //   })
                // }
              }
            })
          }
        } else if(this.currentStep==3&&direction==0){
          // document.getElementById('step2').className = 'step step-ing'
          // document.getElementById('step3').className = 'step step-not'
          // document.getElementsByClassName('line')[1].className = 'line line-not'
          // this.currentStep-=1
        } else if(this.currentStep==3&&direction==1){
          document.getElementById('step3').className = 'step step-ed';
          document.getElementsByClassName('footer')[0].style.display = 'none';
          this.$router.go(-1);
        }
      },
      _getStorageList() {
        getStorageList().then(res=>{
          if(res.data.status=='200') {
            this.storageList = res.data.data;
            for(let i=this.storageList.length-1;i>-1;i--) {
              if(this.storageList[i].storage_status=='1') {
                this.storageList.splice(i,1)
              }
            }
            this.$store.commit('showLoading', false);
          } else {
            this.$store.commit('showLoading', false);
            this.$store.commit('showTip','数据获取失败'+res.data.msg);
          }
        })
        // getStorageList(this.pageIndex).then(res=>{
        //   this.storageList = this.storageList.concat(res.data.data);
        //   this.storageNum = res.data.storages_num;
        //   if(this.storageNum==this.storageList.length) {
        //     this.$store.commit('showLoading', false);
        //     for(let i=this.storageList.length-1;i>-1;i--) {
        //       if(this.storageList[i].storage_status=='1') {
        //         this.storageList.splice(i,1)
        //       }
        //     }
        //   } else {
        //     this._getStorageList();
        //   }
        // })
      },
      clickCheckbox(item) {
        let index = -1;
        for(let i=0;i<this.selectList.length;i++) {
          if(this.selectList[i].storage_ID==item.storage_ID) {
            index = i;
          }
        }
        if(index==-1) {
          this.selectList.push(item);
        } else {
          this.selectList.splice(index,1)
        }
      },
      goEdit() {
        this.showEdit = true;
      },
      changeDefault(id) {
        console.log(id);
      },
      addrEdit() {
        // 提交位置修改信息
        this.showEdit = false;
      },
      goAddress() {
        localStorage.cache = JSON.stringify({
          'selectList': this.selectList,
          'currentStep': this.currentStep,
        })
        this.$router.push({name:'Address'})
      },
      showImg(url) {
        window.history.pushState(null,null,'#')
        this.$store.commit('showImg',[url,true])
      }
    },
    
    beforeDestroy() {
      window.removeEventListener('popstate', e=>{
        this.$store.commit('showImg',['',false])
      }, false)
    },
    activated() {
      window.addEventListener('popstate', e=>{
        this.$store.commit('showImg',['',false])
      }, false)
      this.kind = this.$route.params.name?this.$route.params.name:'普通';
      if(localStorage.cache&&(localStorage.cache!='')) {
        document.getElementsByClassName('footer')[0].style.display = '';
        document.getElementsByClassName('step')[0].className = 'step step-ed'
        document.getElementsByClassName('step')[1].className = 'step step-ing'
        document.getElementsByClassName('step')[2].className = 'step step-not'
        document.getElementsByClassName('line')[0].className = 'line line-ed'
        document.getElementsByClassName('line')[1].className = 'line line-not'
        let cache = JSON.parse(localStorage.cache);
        this.currentStep=cache.currentStep;
        this.storageList = [];
        this.selectList = cache.selectList;
        this.$store.commit('showLoading', true);
        localStorage.cache = ''
      } else {
        document.getElementsByClassName('footer')[0].style.display = '';
        document.getElementsByClassName('step')[0].className = 'step step-ing'
        document.getElementsByClassName('step')[1].className = 'step step-not'
        document.getElementsByClassName('step')[2].className = 'step step-not'
        document.getElementsByClassName('line')[0].className = 'line line-not'
        document.getElementsByClassName('line')[1].className = 'line line-not'
        this.currentStep=1;
        this.storageList = [];
        this.selectList = [];
        this.$store.commit('showLoading', true);
      }
      
      getAddress().then(res=>{
        this.$store.commit('handleAddress',{name:'updateList',value:res.data.data});
        this._getStorageList();
        // console.log(this.$store.state);
      })
      
      if(this.$store.state.address.default!=null) {
        this.selectAddr = this.$store.state.address.default[0];
      } else {
        this.selectAddr= null;
      }
      
      this.$bus.$on('selectAddress',(item)=>{
        if(this.$route.name=='Output') {
          this.selectAddr = item;
          this.$store.commit('changeShow',{name:'showAddr',value:false});
        }
      })
      this.$bus.$on('paystatus', (info)=>{
        if(info.order_type=='o') {
          if(info.status=='ok') {
            if(document.getElementById('step2')&&document.getElementById('step2').className) {
              this.currentStep=3;
              document.getElementById('step2').className = 'step step-ed'
              document.getElementById('step3').className = 'step step-ing'
              document.getElementsByClassName('line')[1].className = 'line line-ed';
            }
            this.$store.commit('showLoading',false);
            this.$store.commit('showTip', '支付成功');
          } else {
            this.$store.commit('showTip', '支付失败')
            if(this.$route.path!='/application') {
              this.$router.replace({name:'Application'})
            }
            this.$router.push({name:'OutputOrderlist'})
          }
        }
      })
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
    line-height: 30px;
    text-align: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .progress {
    width: 100vw;
    height: 10vh;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .progress .linebox {
    position: absolute;
    width: 100%;
    height: 50%;
    display: flex;
  }
  .progress .linebox .line {
    flex: 1;
  }
  .line-ed {border-bottom: 2px solid var(--color-all);}
  .line-not {border-bottom: 2px solid #999;}
  .progress .step {
    width: 18vw;
    height: 10vh;
    margin-right: 9.5vw;
    background-color: var(--color-background);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .progress .step:last-child {
    margin-right: 0;
  }
  .step img {
    width: 30px;
    height: 30px;
  }
  .step .text {
    padding-top: 5px;
    font-weight: bold;
  }
  .step-index {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }
  .step-ed .step-index {
    display: none;
  }
  .step-ing .step-index {
    background-color: #ff9800;
    color: #fff;
  }
  .step-not {
    color: #999;
  }
  .step-not .step-index {
    border: 2px solid #999;
    color: #999;
  }
  .step-ing .step-icon,
  .step-not .step-icon {
    display: none;
  }

  .formbox {
    width: 100vw;
    height: calc(100vh - 10vh - 60px - 80px);
    overflow-y: scroll;
    /* border: 2px solid #000; */
  }
  #formbox1 {
    overflow-y: hidden;
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

  
  table {table-layout:fixed;}
  td {word-break:break-all;}
  .formboxBody {
    height: 500px;
    overflow-y: scroll;
  }
  thead tr {
    height: 30px;
  }
  tbody tr {
    height: 60px;
  }

  table {font-size:11px;color:#333333;border-width: 1px;border-color: #666666;border-collapse: collapse;}
  table th {border: 1px solid #666666;background-color: #dedede;}
  table td {border: 1px solid #666666;background-color: #ffffff;text-align:center;}

  
  .tableTip {
    width: 100vw;
    height: 70px;
    padding: 5px;
    display: flex;
    align-items: center;
  }
  .tableTip .ok {
    width: 100%;
    border: 1px solid var(--color-all);
    padding: 5px 20px;
    background-color: #f5fcf6;
    border-radius: 5px;
  }
  .tableTip .wrong {
    width: 100%;
    border: 1px solid red;
    padding: 5px 20px;
    background-color: #fff5f4;
    border-radius: 5px;
  }
  .tableTip .title {
    font-size: 18px;
    line-height: 20px;
    font-weight: bold;
  }
  .tableTip .info {
    font-size: 14px;
  }
  .tableTip .info span {
    font-size: 16px;
  }
  .tableTip #number {
    font-weight: bold;
    padding: 0 5px;
  }
  .checkbox {
    width: 15px;
    height: 15px;
  }

  .addressbox {
    width: 90vw;
    margin: 0 auto;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #999;
    position: relative;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .addressbox:nth-child(2) {
    max-height: 200px;
    overflow-y: scroll;
  }
  .addressbox .content {
    height: 75px;
    width: 100%;
  }
  .addressbox .text .name{font-size: 18px;color:var(--color-all);font-weight: bold;}
  .addressbox .text .phone{color: #777;margin-left: 10px;}
  .addressbox .text .address{margin-top: 10px;font-size: 16px;color: #000;width: 75vw;}
  .addressbox .edit {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #777;
  }
  .addressbox .edit img {
    width: 20px;
    height: 20px;
  }

  .goodsCard {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  .goodsCard:last-child {
    margin-bottom: 0;
  }
  .goodsImg img {
    width: 80px;
    height: 80px;
  }
  .goodsCard .content {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .goodsCard .content .name {
    font-size: 18px;
    color: #000;
  }
  .goodsCard .content .info {
    margin-top: 10px;
  }
  .goodsCard .content .info span {
    font-size: 14px;
    color: #888;
  }

  .dialog {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #77777777;
  }
  .dialog .content {
    width: 100vw;
    height: 80vh;
    overflow-y: scroll;
    margin-top: 20vh;
    padding-top: 50px;
    background-color: #fff;
    border-top-left-radius: 10vw;
    border-top-right-radius: 10vw;
    position: relative;
  }
  .dialog .content .close {
    position: fixed;
    top: 22vh;
    z-index: 100;
    right: 20px;
    font-size: 50px;
    color: #fff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: #888;
  }

  .editBox {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: var(--color-background);
    z-index: 1000;
  }
  .editBox .form {
     display: flex;
     flex-direction: column;
  }
  .editBox .form .formItem {
    display: flex;
    align-items: center;
    width: 92vw;
    padding: 20px 0;
    margin-left: 4vw;
    border-bottom: 1px solid #aaa;
  }
  .editBox .form .formItem span {
    font-size: 18px;
    width: 100px;
    font-weight: bold;
  }
  .editBox .form .formItem input,
  .editBox .form .formItem textarea {
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 18px;
  }
  .editBtn {
    width: 90vw;
    height: 40px;
    margin-left: 5vw;
    margin-top: 100px;
    border-radius: 20px;
    background-color: var(--color-all);
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 20px;
  }

  .formbox .resultBox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50%;
  }
  .formbox .resultBox .icon {
    height: 100px;
    width: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    margin-top: 50px;
    background-color: #999;
    border-radius: 50%;
    font-size: 80px;
    font-weight: bolder;
  }
  .formbox .resultBox .text {
    font-size: 18px;

  }


  .addressbox .method {
    margin-top: 10px;
    margin-left: 10vw;
  }
  .addressbox .method label {
    font-size: 16px;
  }
  .addressbox .method span {
    margin-left: 10px;
    font-size: 16px;
    color: var(--color-all);
    text-align: right;
  }
  .addressbox .method #nomoney {
    color: red;
  }
  .addressbox .method input[type="radio"]:checked + label::before {
    background-color: #f07000;
    padding: 3px;
    background-clip: content-box;
  }


  
  .addrCard {
    width: 100vw;
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
</style>