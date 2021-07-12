<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">{{kind}}申报</div>
    </div>
    <div class="progress">
      <div class="linebox">
        <div class="line line-not" v-for="(item,index) in stepNum-1" :key="index"></div>
      </div>
      <div class="step step-ing" id="step1">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">1</div>
        </div>
        <div class="text">填写单号</div>
      </div>
      <div class="step step-not" id="step2">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">2</div>
        </div>
        <div class="text">资料审核</div>
      </div>
      <div class="step step-not" id="step3">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">3</div>
        </div>
        <div class="text">上传资料</div>
      </div>
    </div>
    <div class="formbox" v-show="currentStep==1">
      <div>
        <table>
          <thead><tr><th style="width:48vw;font-size:18px">单号</th><th style="width:40vw;font-size:18px">邮箱地址</th></tr></thead>
        </table>
      </div>
      <div class="table" id="orderTable">
        <table>
          <tbody id="tbody">
            <tr v-for="(item,index) in orders" :key="index">
              <td><input style="width: 100%" type="text" name="" v-model='item.id' :id="index+'-id'"></td>
              <td><input style="width: 100%" type="text" name="" v-model='item.email' :id="index+'-email'"></td>
              <td><div class="delete" v-if='orders.length!=1' @click="delItem(index)">×</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="option">
        <div class="btn" id="addmany" @click="dialogShow=true">批量导入</div>
        <div class="btn" id="addone" @click="addOne">+</div>
      </div>
    </div>
    <div class="formbox" v-show="currentStep==2">
      <div>
        <table>
          <thead><tr><th style="width:48vw;font-size:18px">快递单号</th><th style="width:40vw;font-size:18px">邮箱地址</th></tr></thead>
        </table>
      </div>
      <div class="table">
        <table>
          <tbody id="tbody">
            <tr v-for="(item,index) in orders" :key="index">
              <td><input type="text" 
              :disabled='item.right'
              :style="{border:(item.right==true?'1px solid var(--color-all)':'1px solid #f00')}"
              v-model='item.id' :id="index+'-1id'"></td>
              <td><input type="text" 
              :disabled='item.right'
              :style="{border:(item.right==true?'1px solid var(--color-all)':'1px solid #f00')}"
              v-model='item.email' :id="index+'-1email'"></td>
              <td><div class="delete" v-if='orders.length!=1&&item.right==false' @click="delItem(index)">×</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableTip">
        <div class="ok" id="tableTip">
          <div class="title">校验数据</div>
          <div class="info">
            <span>共导入数据{{orders.length}}条，其中有</span>
            <span id="number" :style="{color:(wrongDataStatus==true?'#f00':'#000')}">{{wrongDataNum}}</span>
            <span>条错误</span>
          </div>
        </div>
      </div>
    </div>
    <div class="formbox" v-show="currentStep==3">
      <div class="upload">
        <img v-if="loading==true" src="~assets/loading.gif" alt="">
        <div v-else class="resultBox">
          <div class="boxItem" v-if="wrongOrders.length==0">
            <div class="icon" style="background-color:var(--color-all)">✓</div>
            <div class="text">
              您所申报的单号已经上传完毕！
              <!-- <div v-if="resultStatus==1" style="font-size:18px;color:#f00;margin-top:20px">但存在部分重复单号</div> -->
            </div>
          </div>
          <div class="boxItem" v-if="wrongOrders.length!=0">
            <div class="icon" style="background-color:#fccb0d">!</div>
            <div class="text">
              存在以下由于重复而提交失败的单号
            </div>
          </div>
          <div class="boxItem" v-if="wrongOrders.length!=0">
            <div class="failOrders">
              <span v-for="(item,index) in wrongOrders" :key="index" style="font-size:16px">
                {{item}} <span v-if="index!=wrongOrders.length-1" style="color:#f00;font-size:16px;font-weight:bold">,</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btnbox" @click="changeStep(0)" v-if="currentStep==1">
        <div class="btn">取消</div>
      </div>
      <div class="btnbox" @click="changeStep(0)" v-if="currentStep==2&&wrongDataStatus==true">
        <div class="btn">重新校验</div>
      </div>
      <div v-if="currentStep==2&&wrongDataStatus==true"></div>
      <div class="btnbox" @click="changeStep(1)" v-else>
        <div class="btn" v-if="currentStep==stepNum">完成</div>
        <div class="btn" v-else>下一步</div>
      </div>
    </div>

    <div class="dialog" v-if="dialogShow">
      <div class="dialogBox">
        <div class="dialogHeader">
          <div class="title">批量导入单号</div>
          <div class="cancel" @click="dialogShow=false">×</div>
          <div class="information">请注意导入格式，否则你的批量导入可能会失败，同一个订单的快递单号和邮箱号请间隔一个空格；不同订单请换行</div>
        </div>
        <div class="dialogContent">
          <textarea name="inputMany" id="inputMany" v-model="dialogText"></textarea>
        </div>
        <div class="dialogBtns">
          <div class="btn" @click="dialogShow=false"><span>取消</span></div>
          <div class="btn" @click="enterOrder"><span>确认导入</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addApply} from '@/network/transship.js'
  export default {
    name: "Transmit",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'Nike',
        brand: '',
        currentStep: 1,
        stepNum: 3,
        orders: [
          {id:'',email:'',right:false},
        ],
        dialogShow: false,
        dialogText: '',
        wrongDataStatus: true,
        wrongDataNum: 0,
        loading: false,
        resultStatus: 2,
        wrongOrders: [],
        handleTimes: 0,

        okOrders: []
      }
    },
    methods:{
      test() {
        console.log(this.brand);
      },
      changeStep(direction) {
        if(this.currentStep==1&&direction==0) {
          // 第一步 向左
          this.$router.go(-1)
        } else if(this.currentStep==1&&direction==1){
          // 第一步 向右
          let canGo = false;
          for(let i=0;i<this.orders.length;i++) {
            if(this.orders[i].email!=''||this.orders[i].id!='') {
              canGo = true;
              break;
            }
          }
          if(canGo==false) {
            this.$store.commit('showTip', '请输入申报信息')
          } else {
            this.$store.commit('showLoading', true);
            this.checkOrder();
          }
        } else if(this.currentStep==2&&direction==0){
          // 第二步 向左
          // 重新校验
          this.checkOrder();
        } else if(this.currentStep==2&&direction==1){
          // 第二步 向右
          if(this.wrongDataStatus==true) {
            this.$store.commit('showTip', '请修改或删除错误的数据项')
          } else {            
            this.loading = true;
            document.getElementById('step2').className = 'step step-ed'
            document.getElementById('step3').className = 'step step-ing'
            document.getElementsByClassName('line')[1].className = 'line line-ed'
            this.currentStep+=1;
            addApply(this.brand,this.okOrders).then(res=>{
              if(res.data.status=='200') {
                this.loading = false
              } else {
                this.wrongOrders = res.data.repeat_id.split(',')
                this.loading=false;
              }
            })
          }
        } else if(this.currentStep==3&&direction==0){
          // 第三步 向左
          document.getElementById('step2').className = 'step step-ing'
          document.getElementById('step3').className = 'step step-not'
          document.getElementsByClassName('line')[1].className = 'line line-not'
          this.currentStep-=1
        } else if(this.currentStep==3&&direction==1){
          // 第三步 向右
          if(this.loading==true) {
            this.$store.commit('showTip', '数据还未上传完毕，请等待')
          } else {
            document.getElementById('step3').className = 'step step-ed';
            document.getElementsByClassName('footer')[0].style.display = 'none';
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        }
      },
      guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      addOne() {
        this.orders.push({id:'',email:'',right:false});
        let orderTable = document.getElementById('orderTable')
        this.$nextTick(()=>{
          orderTable.scrollTo(0,orderTable.scrollHeight)
        })
      },
      delItem(index) {
        this.orders.splice(index,1);
      },
      enterOrder() {
        if(this.dialogText=='') {
          this.$store.commit('showTip','请输入申报信息')
        } else {
          let rows = this.dialogText.split('\n');
          let input = [];
          for(let i=0;i<rows.length;i++) {
            let splitRow = rows[i].split(' ').filter(item=>item==''?false:true);
            if(splitRow.length>2) {
              input.push(splitRow.slice(0,2))
            }else if(splitRow.length==2) {
              input.push(splitRow)
            } else if(splitRow.length==1) [
              input.push([splitRow[0],''])
            ]
          }
          for(let i=0;i<input.length;i++) {
            this.orders.push({id: input[i][0], email: input[i][1], right: false});
          }
          this.dialogShow = false;
          this.dialogText = '';
          this.$nextTick(()=>{
            orderTable.scrollTo(0,orderTable.scrollHeight)
          })
        }
      },
      checkOrder() {
        this.$store.commit('showLoading', true);
        let falseList = [];
        let trueList = [];
        this.handleTimes = 0;
        for(let i=0;i<this.orders.length;i++) {
          if(this.orders[i].right==false) {
            falseList.push(this.orders[i])
          } else {
            trueList.push(this.orders[i])
          }
        }
        if(falseList.length==0) {
          this.wrongDataStatus = false;
          this.wrongDataNum = 0;
          this.$store.commit('showLoading', false);
        }
        if(this.brand=='N') {
          falseList.map(order=>{
            let id = order.id;
            let email = order.email;
            let headers = {
              "Content-Type": "application/x-www-form-urlencoded;",
              "accept":"application/json",
              "accept-language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5",
              "appid":"orders",
              "x-nike-visitid":"1",
              "x-nike-visitorid":this.guid(),
            }
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
            let url1 = "https://api.nike.com/order_mgmt/user_order_details/v2/" + id + "?filter=email(" + email + ")";
            let url2 = "https://api.nike.com/ship/user_shipments/v1?locale=en_us&filter=orderNumber(" + id +")&filter=email("+email+")";
            
            this.$axios.all([
              this.$axios.get(url1, {
                headers: headers,
              }).catch(e=>{
                order.right = false;
                this.handleTimes++;
                this.wrongDataNum = this.orders.filter(item=>{return item.right==false}).length;
                
                if(this.handleTimes==falseList.length) {
                  this.$store.commit('showLoading', false);
                  document.getElementById('step1').className = 'step step-ed'
                  document.getElementById('step2').className = 'step step-ing'
                  document.getElementsByClassName('line')[0].className = 'line line-ed'
                  if(falseList.length==0) {
                    this.wrongDataStatus = false
                    console.log('all ok');
                  }
                  if(this.currentStep==1) {
                    this.currentStep+=1;
                  }
                }
              }),
              this.$axios.get(url2, {
                headers: headers,
              })
            ]).then(this.$axios.spread((res1,res2)=>{
              order.right = true;
              this.handleTimes++;
              this.wrongDataNum = this.orders.filter(item=>{return item.right==false}).length;
              if(this.handleTimes==falseList.length) {
                this.$store.commit('showLoading', false);
                document.getElementById('step1').className = 'step step-ed'
                document.getElementById('step2').className = 'step step-ing'
                document.getElementsByClassName('line')[0].className = 'line line-ed'
                if(falseList.length==0) {
                  this.wrongDataStatus = false;
                  console.log('all ok');
                }
                if(this.currentStep==1) {
                  this.currentStep+=1;
                }
              }

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
              for(let item in returnItem) {
                returnItem[item] = returnItem[item].join(',')
              }
              returnItem.id = order.id;
              returnItem.email = order.email;
              this.okOrders.push(returnItem)
            }))
          })
        } else if(this.brand=='JD') {
          falseList.map(order=>{
            let id = order.id;
            let email = order.email;
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
            let url = "https://data.smartagent.io/v1/jdsports/track-my-order?orderNumber=" + id + "&facia=jdsportsuk&emailAddress=" + email;

            this.$axios.get(url).catch(e=>{
              order.right = false;
              this.handleTimes++;
              this.wrongDataNum = this.orders.filter(item=>{return item.right==false;}).length;
              
              if(this.handleTimes==falseList.length) {
                this.$store.commit('showLoading', false);
                document.getElementById('step1').className = 'step step-ed'
                document.getElementById('step2').className = 'step step-ing'
                document.getElementsByClassName('line')[0].className = 'line line-ed'
                if(falseList.length==0) {
                  this.wrongDataStatus = false
                  console.log('all ok');
                }
                if(this.currentStep==1) {
                  this.currentStep+=1;
                }
              }
            }).then(res=>{
              if(res!=undefined) {
                order.right = true;
                this.handleTimes++;
                this.wrongDataNum = this.orders.filter(item=>{return item.right==false}).length;
                if(this.handleTimes==falseList.length) {
                  this.$store.commit('showLoading', false);
                  document.getElementById('step1').className = 'step step-ed'
                  document.getElementById('step2').className = 'step step-ing'
                  document.getElementsByClassName('line')[0].className = 'line line-ed'
                  if(falseList.length==0) {
                    this.wrongDataStatus = false
                    console.log('all ok');
                  }
                  if(this.currentStep==1) {
                    this.currentStep+=1;
                  }
                }
                
                let data = res.data;
                returnItem.order_time.push(data.date?data.date.toString():'');
                returnItem.price.push(data.totals?data.totals.total.amount.toString():'');
                if(data.status&&data.status.full) {
                  data.status.full.map(fullItem=>{
                    if(fullItem.state=='done') {
                      returnItem.op_description.push(fullItem.description?fullItem.description:fullItem.title);
                      returnItem.op_date.push(fullItem.date?fullItem.date.toString():'')
                    }
                  })
                }
                if(data.vendors&&data.vendors[0]&&data.vendors[0].items) {
                  data.vendors[0].items.map(item=>{
                    returnItem.op_quantity.push(item.qty?item.qty.toString():'')
                    returnItem.size.push(item.size?item.size.toString():'')
                    returnItem.style.push(item.sku?item.sku.toString():'')
                    returnItem.rolledUpStatus.push(item.status?item.status.toString():'')
                  })
                }
                if(data.addresses&&data.addresses.billing) {
                  returnItem.first_address.push(data.addresses.billing.address1)
                  returnItem.second_address.push(data.addresses.billing.address2)
                  returnItem.city.push(data.addresses.billing.town)
                  returnItem.postal.push(data.addresses.billing.postcode)
                  returnItem.country.push(data.addresses.billing.locale)
                }
                if(data.delivery) {
                  returnItem.tracker.push(data.delivery.trackingURL?data.delivery.trackingURL.toString():'');
                }
                if(data.payment&&data.payment.giftCard) {
                  returnItem.gift.push(data.payment.giftCard.cardNumber?data.payment.giftCard.cardNumber.toString():'');
                }
                for(let item in returnItem) {
                  returnItem[item] = returnItem[item].join(',')
                }
                
                returnItem.id = order.id;
                returnItem.email = order.email;
                this.okOrders.push(returnItem)
              }
            })
          })
        } else if(this.brand=='A') {
          falseList.map(order=>{
            let id = order.id;
            let email = order.email;
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
            let url = "https://data.smartagent.io/v1/jdsports/track-my-order?orderNumber=" + id + "&facia=jdsportsuk&emailAddress=" + email;

            this.$axios.get(url).catch(e=>{
              order.right = false;
              this.handleTimes++;
              this.wrongDataNum = this.orders.filter(item=>{return item.right==false}).length;
              
              if(this.handleTimes==falseList.length) {
                this.$store.commit('showLoading', false);
                document.getElementById('step1').className = 'step step-ed'
                document.getElementById('step2').className = 'step step-ing'
                document.getElementsByClassName('line')[0].className = 'line line-ed'
                if(falseList.length==0) {
                  this.wrongDataStatus = false
                  console.log('all ok');
                }
                if(this.currentStep==1) {
                  this.currentStep+=1;
                }
              }
            }).then(res=>{
              if(res!=undefined) {
                order.right = true;
                this.handleTimes++;
                this.wrongDataNum = this.orders.filter(item=>{return item.right==false}).length;
                if(this.handleTimes==falseList.length) {
                  this.$store.commit('showLoading', false);
                  document.getElementById('step1').className = 'step step-ed'
                  document.getElementById('step2').className = 'step step-ing'
                  document.getElementsByClassName('line')[0].className = 'line line-ed'
                  if(falseList.length==0) {
                    this.wrongDataStatus = false
                    console.log('all ok');
                  }
                  if(this.currentStep==1) {
                    this.currentStep+=1;
                  }
                }
                
                let data = res.data;
                returnItem.order_time.push(data.creationDate?data.creationDate:'');
                returnItem.price.push(data.totalAmount?data.totalAmount:'');
                if(data.productLineItems) {
                  data.productLineItems.map(productLineItem=>{
                    returnItem.op_description.push(productLineItem.productName?productLineItem.productName:'');
                    returnItem.op_date.push(productLineItem.statusDate?productLineItem.statusDate:'')
                    returnItem.style.push((productLineItem.articleNumber&&productLineItem.color)?(productLineItem.articleNumber+productLineItem.color):'')
                    returnItem.size.push(productLineItem.literalSize?productLineItem.literalSize:'')
                    returnItem.rolledUpStatus.push(productLineItem.status?productLineItem.status:'')
                  })
                }
                if(data.paymentMethods) {
                  data.paymentMethods.map(paymentMethod=>{
                    returnItem.gift.push(paymentMethod.giftCardNumber)
                  })
                }
                if(data.shipping&&data.shipping.shippingAddress) {
                  returnItem.first_address.push(data.shipping.shippingAddress.addressLine1?data.shipping.shippingAddress.addressLine1:'')
                  returnItem.second_address.push(data.shipping.shippingAddress.addressLine2?data.shipping.shippingAddress.addressLine2:'')
                  returnItem.city.push(data.shipping.shippingAddress.city?data.shipping.shippingAddress.city:'')
                  returnItem.country.push(data.shipping.shippingAddress.country?data.shipping.shippingAddress.country:'')
                  returnItem.postal.push(data.shipping.shippingAddress.postalCode?data.shipping.shippingAddress.postalCode:'')
                }
                if(data.shipments) {
                  data.shipments.map(shipment=>{
                    returnItem.tracker.push(shipment.trackingNo?shipment.trackingNo:'')
                  })
                }
                for(let item in returnItem) {
                  returnItem[item] = returnItem[item].join(',')
                }
                
                returnItem.id = order.id;
                returnItem.email = order.email;
                this.okOrders.push(returnItem)
              }
            })
          })
        } else {
          this.$store.commit('showTip','当前仅支持 Nike 和 JD 申报');
          this.$store.commit('showLoading',false);
        }
      },
    },
    activated() {
      this.kind = this.$route.params.name?this.$route.params.name:'Nike';
      switch(this.kind){
        case 'Nike':
          this.brand = 'N';
          break;
        case 'Adidas':
          this.brand = 'A';
          break;
        case 'JD':
          this.brand = 'JD';
          break;
        case '通用':
          this.brand = 'U';
          break;
      }
      this.orders = [
        {id:'C00622025833',email:'huang.xi.ng77888877@gmail.com',right:false},
        {id:'C00627066000',email:'di.nglingguan.gdangdang@gmail.com',right:false},
        {id:'478003919',email:'d.nkasj.ndondsk@gmail.com',right:false},
        {id:'12322',email:'123@123.com',right:false},
      ]
      this.okOrders = [];
      document.getElementsByClassName('footer')[0].style.display = '';
      document.getElementsByClassName('step')[0].className = 'step step-ing'
      document.getElementsByClassName('step')[1].className = 'step step-not'
      document.getElementsByClassName('step')[2].className = 'step step-not'
      document.getElementsByClassName('line')[0].className = 'line line-not'
      document.getElementsByClassName('line')[1].className = 'line line-not'
      this.currentStep=1;
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
    display: flex;
    flex-direction: column;
  }
  .formbox input {
    background-color: var(--color-background);
    border: 1px solid #777;
    height: 30px;
    font-size: 16px;
  }
  .table {
    /* max-height: 50vh; */
    height: calc(100vh - 10vh - 80px - 60px - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid #777;
    margin-top: 10px;
  }
  .table table th {
    font-size: 19px;
    padding: 5px 0;
  }
  tbody input {
    width: 100%;
  }
  tbody .delete {
    font-size: 30px;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    background-color: var(--color-all);
  }
  .formbox .option {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    flex-direction: row;
  }
  #addone {
    font-size: 30px;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background-color: var(--color-all);
  }
  #addmany {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid var(--color-all);
    color: var(--color-all);
    padding: 0 8px;
    border-radius: 10px;
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
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
  }
  .tableTip .info {
    font-size: 14px;
  }
  .tableTip #number {
    font-weight: bold;
    padding: 0 5px;
  }

  .formbox .upload {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .formbox .upload .resultBox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 80%;
  }
  .formbox .upload .boxItem {
    width: 100vw;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .formbox .upload .boxItem .icon {
    height: 100px;
    width: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    background-color: #999;
    border-radius: 50%;
    font-size: 80px;
    font-weight: bolder;
    margin-right: 20px;
  }
  .formbox .upload .text {
    width: 60%;
    font-size: 20px;
  }
  .failOrders {
    width: 90vw;
    height: 20vh;
    padding: 5px;
    overflow-y: scroll;
    border: 1px solid #999;
  }
</style>