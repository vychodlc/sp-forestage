<template>
  <div class="agency">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title" @click="test">{{kind}}代购</div>
    </div>
    <div class="formbox">
      <div class="formItem">
        <div class="name">商品链接</div>
        <input @input="priceOk=false" type="text" id="storage_link" v-model="newItem.storage_link">
      </div>
      <div class="formItem">
        <div class="name">尺码</div>
        <div class="inputBox">
          <div class="inputContent">
            <div class="checkboxItem" @click="checkAll()"><div id="sizeAll" :class="checkall?'checkboxContentActive':'checkboxContent'">全选</div></div>
            <div class="checkboxItem" v-for="(item,index) in sizeList" :key="index" @click="checkOne(item)">
              <div class="checkboxContent" :id="'size-'+item">{{item}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="formItem">
        <div class="name">礼品卡</div>
        <div class="inputBox">
          <div class="inputContent" id="giftcardBox">
            <div :class="newItem.giftcard_type=='0'?'radioItemActive':'radioItem'" @click="changeRadio('giftcard_type',0)">不使用</div>
            <div :class="newItem.giftcard_type=='1'?'radioItemActive':'radioItem'" @click="changeRadio('giftcard_type',1)">平台提供</div>
            <div :class="newItem.giftcard_type=='2'?'radioItemActive':'radioItem'" @click="changeRadio('giftcard_type',2)">自行提供</div>
            <div class="radioItem" style="color:var(--color-all);background-color:#fff;margin:0" v-if="newItem.giftcard_type=='2'">
              <span @click="dialogShow=true" style="border:1px solid var(--color-all);border-radius:3px;padding:2px">导入</span>
            </div>
            <div v-if="newItem.giftcard_type=='2'">
              <table class="giftcardTable">
                <thead>
                  <tr>
                    <th>卡号</th>
                    <th>PIN</th>
                    <th>余额</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in newItem.giftcards" :key="index">
                    <td>{{item.card_num}}</td>
                    <td>{{item.pin}}</td>
                    <td>{{item.balance}}</td>
                    <!-- <td>{{item.right==true?'ok':'×'}}</td> -->
                    <!-- <td v-if="item.right==true"><div style="color:#fff;background-color:var(--color-all);width:12px;height:12px;border-radius:5px;texa-align:center;line-height:12px">✔</div></td> -->
                    <!-- <td v-else><div @click="delGiftcard(index)" style="color:#fff;background-color:#f56c6c;width:12px;height:12px;border-radius:5px;texa-align:center;line-height:12px">×</div></td> -->
                    <td><div @click="delGiftcard(index)" style="color:#fff;background-color:#f56c6c;width:12px;height:12px;border-radius:5px;texa-align:center;line-height:12px">×</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="formItem">
        <div class="name">折扣码</div>
        <div class="inputBox">
          <div class="inputContent" id="discountBox">
            <div :class="newItem.discount_type=='0'?'radioItemActive':'radioItem'" @click="changeRadio('discount_type',0)">不使用</div>
            <div :class="newItem.discount_type=='1'?'radioItemActive':'radioItem'" @click="changeRadio('discount_type',1)">平台提供</div>
            <div :class="newItem.discount_type=='2'?'radioItemActive':'radioItem'" @click="changeRadio('discount_type',2)">单次码</div>
            <div :class="newItem.discount_type=='3'?'radioItemActive':'radioItem'" @click="changeRadio('discount_type',3)">复用码</div>
            <div v-if="['2','3'].indexOf(newItem.discount_type)!=-1">            
              <input @input="priceOk=false" type="text" v-model="newItem.discount_code" style="border: 1px solid #ccc;margin-top:5px;font-size:12px;padding:5px 10px" :placeholder="newItem.discount_type=='2'?'输入单次码，用逗号隔开':'输入复用码'">
            </div>
          </div>
        </div>
      </div>
      <div class="formItem">
        <div class="name">购物账号</div>
        <div class="inputBox">
          <div class="inputContent" id="accountBox">
            <div :class="newItem.account_type=='0'?'radioItemActive':'radioItem'" @click="changeRadio('account_type',0)">不使用</div>
            <div :class="newItem.account_type=='1'?'radioItemActive':'radioItem'" @click="changeRadio('account_type',1)">普通账号</div>
            <div :class="newItem.account_type=='2'?'radioItemActive':'radioItem'" @click="changeRadio('account_type',2)">生日账号</div>
          </div>
        </div>
      </div>
      <div class="formItem">
        <div class="name">单数</div>
        <input @input="priceOk=false" type="text" id="order_num" v-model="newItem.order_num"></div>
      <div class="formItem">
        <div class="name">时限</div>
        <input @input="priceOk=false" type="text" id="interval" v-model="newItem.interval"></div>
      <div class="formItem" v-if="priceOk==true">
        <div class="name">价钱</div>
        <input @input="priceOk=false" disabled type="text" id="price" v-model="newItem.price"></div>
    </div>
    <div class="footer">
      <div class="btnbox">
        <div class="btn" v-if="priceOk==false" @click="submit()">生成价格</div>
        <div class="btn" v-else @click="submit()">下一步</div>
      </div>
    </div>

    <div class="dialog" v-if="dialogShow">
      <div class="dialogBox">
        <div class="dialogHeader">
          <div class="title">批量导入礼品卡</div>
          <div class="cancel" @click="dialogShow=false">×</div>
        </div>
        <div class="dialogContent">
          <textarea name="inputMany" id="dialogText" v-model="dialogText" placeholder="xxxx xxxx
xxxx xxxx
卡号 PIN"></textarea>
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
  import { addAgency,getOption,getCrawlerGiftcard } from '@/network/agency.js'
  export default {
    name: "Agency",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'Nike',
        brand: '',
        newItem: {
          user_email: '1@1.com',
          user_id: '',
          brand: '',
          storage_link: '',
          price: '0',
          size: [],
          account_type: '0',
          discount_type: '0',
          discount_code: '',
          giftcard_type: '0',
          giftcards: [],
          order_num: '',
          interval: '',
        },
        checkall: false,
        sizeList: ['30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48'],

        dialogShow: false,
        dialogText: '',
        wrongDataStatus: true,
        wrongDataNum: 0,
        loading: false,
        resultStatus: 2,
        wrongOrders: [],
        handleTimes: 0,

        options: null,
        priceOk: false,      
      }
    },
    methods:{
      test() {
      },
      checkOne(item) {
        if(this.checkall==true) {
          this.checkAll();
        }
        let btn = document.getElementById('size-'+item);
        if(btn.className=='checkboxContent') {
          btn.className = 'checkboxContentActive';
          this.newItem.size.push(item);
        } else if(btn.className=='checkboxContentActive') {
          btn.className = 'checkboxContent';
          this.newItem.size.splice(this.newItem.size.findIndex(e=>e==item),1)
        }
        this.newItem.size.sort();
        this.priceOk = false;
      },
      checkAll() {
        this.checkall = !this.checkall;
        if(this.checkall==true) {
          this.sizeList.map(size=>{
            document.getElementById('size-'+size).className = 'checkboxContentActive';
          })
          this.newItem.size = this.sizeList;
        } else {
          this.sizeList.map(size=>{
            document.getElementById('size-'+size).className = 'checkboxContent';
          })
          this.newItem.size = []
        }
        this.priceOk = false;
        // if(this.checkall==true) {
        //   this.newItem.size = this.sizeList
        // } else {
        //   this.newItem.size = [];
        // }
      },
      changeRadio(name,value) {
        value = ''+value;
        if(name=='discount_type') {
          if((this.newItem.discount_type=='2'&&value=='3')||(this.newItem.discount_type=='3'&&value=='2')) {
            this.newItem.discount_code = ''
          }
        }
        this.newItem[name] = value;
      },
      enterOrder() {
        if(this.dialogText=='') {
          this.$store.commit('showTip','请输入礼品卡信息')
        } else {
          let rows = this.dialogText.split('\n').filter(row=>{return row!=''});
          this.enterNum = rows.length;
          rows.map(row=>{
            this.$store.commit("showLoading",true)
            let rowData = row.split(' ').filter(iii=>{return iii!=''&&iii!=' '});
            if(rowData.length==2) {
              let flag = false;
              this.newItem.giftcards.map(card=>{
                if(card.card_num==rowData[0]){flag=true;};
              })
              if(flag==true) {
                this.enterNum--;
                this.newItem.giftcards.push({card_num:rowData[0],pin:rowData[1],balance:'重复',right:false})
              } else {
                this._addGiftcard({card_num:rowData[0],pin:rowData[1]});
              }
            } else {
              this.enterNum--;
              this.newItem.giftcards.push({card_num:rowData[0],pin:rowData[1]?rowData[1]:'',balance:'无效',right:false})
              if(this.enterNum==0) {
                this.$store.commit('showLoading',false)
              }
            }
            this.dialogShow = false;
          })
          this.dialogText = '';
        }
      },
      _addGiftcard(item) {
        // this.newItem.giftcards.push({card_num:item.card_num,pin:item.pin,brand:item.brand,right:item.right})
        if(this.brand=='N') {
          this.brand = 'N'
          this.$axios({
            method: 'post',
            url: 'https://api.nike.com/payment/giftcard_balance/v1/',
            data: JSON.stringify({
              'accountNumber': item.card_num.toString(),
              'currency': 'GBP',
              'pin': item.pin.toString(),
            }),
            headers: {
              "Content-Type": "application/json",
              "appid":"orders",
              "x-nike-visitid":"3",
              "x-nike-visitorid":this.guid(),
            }
          }).then(res=>{
            item.balance = res.data.balance;
            item.right = true;
            let flag = false;
            this.newItem.giftcards.map(card=>{
              if(card.card_num==item.card_num){flag=true};
            })
            if(flag==true) {
              item.balance = '重复'
              item.right = false
            }
            this.newItem.giftcards.push(item);
            this.enterNum--;
            if(this.enterNum==0) {
              this.$store.commit('showLoading',false);
            }
          }).catch(e=>{
            item.balance = '无效';
            item.right = false;
            this.newItem.giftcards.push(item);
            this.enterNum--;
            if(this.enterNum==0) {
              this.$store.commit('showLoading',false);
            }
          })
        } else if(this.brand=='JD') {
          let right,balance,flag;
          balance = '无效'
          getCrawlerGiftcard({card_num:item.card_num,pin:item.pin.toUpperCase(),brand:'JD'}).then(res=>{
            right = false
            if(res.data.status=='200') {
              balance = parseFloat(parseInt(res.data.balance)/100).toFixed(2);
              right = true
            }
            this.newItem.giftcards.map(card=>{
              if(card.card_num==item.card_num){flag=true};
            })
            if(flag==true) {
              balance = '重复'
              right = false
            }
            this.newItem.giftcards.push({card_num:item.card_num,pin:item.pin.toUpperCase(),brand:'JD',right:right,balance:balance});
            this.enterNum--;
            if(this.enterNum==0) {
              this.$store.commit('showLoading',false);
            }
          });
        // } else if(item.brand=='A') {
        }
      },
      guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      delGiftcard(index) {
        this.newItem.giftcards.splice(index,1);
      },
      submit() {
        let linkMsg = {
          'N': {link:'www.nike.com/gb',msg:'请填写https://www.nike.com/gb中的商品链接'},
          'A': {link:'www.adidas.co.uk',msg:'请填写https://www.adidas.co.uk/中的商品链接'},
          'JD': {link:'www.jdsports.co.uk',msg:'请填写https://www.jdsports.co.uk/中的商品链接'},
        }
        this.newItem.brand = this.brand;
        if(this.newItem.storage_link=='') {
          this.$store.commit('showTip','请填写商品链接')
        } else if(this.newItem.storage_link.indexOf(linkMsg[this.brand].link)==-1) {
          this.$store.commit('showTip',linkMsg[this.brand].msg)
        } else if(this.newItem.size.length==0) {
          this.$store.commit('showTip','请选择尺寸')
        } else if(this.newItem.giftcard_type=='') {
          this.$store.commit('showTip','请选择礼品卡类别')
        } else if(this.newItem.giftcard_type=='2'&&this.newItem.giftcards.length==0) {
          this.$store.commit('showTip','请添加礼品卡信息')
        } else if(this.newItem.giftcard_type=='2'&&this.newItem.giftcards.filter(card=>{return card.right==true}).length==0) {
          this.$store.commit('showTip','请添加有效礼品卡信息')
        } else if(this.newItem.discount_type=='') {
          this.$store.commit('showTip','请选择折扣码类别')
        } else if(this.newItem.discount_type=='2'&&this.newItem.discount_code=='') {
          this.$store.commit('showTip','请填写单次礼品卡')
        } else if(this.newItem.discount_type=='3'&&this.newItem.discount_code=='') {
          this.$store.commit('showTip','请填写复用礼品卡')
        } else if(this.newItem.account_type=='') {
          this.$store.commit('showTip','请选择购物账号类别')
        } else if(this.newItem.order_num=='') {
          this.$store.commit('showTip','请选择单数')
        } else if(this.newItem.order_num!=parseInt(this.newItem.order_num)) {
          this.$store.commit('showTip','请确保单数是正整数')
        } else if(this.newItem.interval=='') {
          this.$store.commit('showTip','请选择代购时限')
        } else if(this.newItem.interval!=parseFloat(this.newItem.interval)) {
          this.$store.commit('showTip','请确保代购时限是数字')
        } else if(parseFloat(this.newItem.interval)<20||parseFloat(this.newItem.interval)>300) {
          this.$store.commit('showTip','请确保代购时限的范围为 20~300 小时')
        } else {
          if(this.priceOk==false) {
            this.$store.commit('showLoading',true)
            if(this.brand=='N') {
              this.$axios({
                method: 'get',
                url: this.newItem.storage_link,
              }).then(res=>{
                let index = res.data.indexOf('currentPrice')
                let price = res.data.slice(index,index+20).split(':')[1].split(',')[0]
                price = parseFloat(price)
                this.options = {}
                getOption().then(res=>{
                  res.data.data.map(opt=>{
                    this.options[opt.option] = parseFloat(opt.value)
                  })
                  if(this.options.k&&this.options.account_birthday&&this.options.account_common&&this.options.discount&&this.options.giftcard) {
                    let totalPrice = parseFloat((this.newItem.account_type==2?this.options.account_birthday:0)
                    + (this.newItem.account_type==1?this.options.account_common:0)
                    + (this.newItem.discount_type==1?this.options.discount:0)
                    + (price * this.options.k)
                    + (this.newItem.giftcard_type==1?price*this.options.giftcard:0))
                    this.newItem.price = parseFloat(totalPrice*parseInt(this.newItem.order_num)).toFixed(2)
                    this.priceOk = true;                
                  } else {
                    this.$store.commit('showTip', "代购参数后台设置错误")
                  }
                  this.$store.commit('showLoading',false)
                })
              }).catch(e=>{
                this.$store.commit('showLoading',false)
                this.$store.commit('showTip','获取商品价格失败')
              })
            } else {
              let price;
              price = parseFloat(10.00)
              this.options = {}
              getOption().then(res=>{
                res.data.data.map(opt=>{
                  this.options[opt.option] = parseFloat(opt.value)
                })
                let totalPrice = parseFloat((this.newItem.account_type==2?this.options.account_birthday:0)
                + (this.newItem.account_type==1?this.options.account_common:0)
                + (this.newItem.discount_type==1?this.options.discount:0)
                + (price * this.options.k)
                + (this.newItem.giftcard_type==1?price*this.options.giftcard:0))
                this.newItem.price = parseFloat(totalPrice*parseInt(this.newItem.order_num)).toFixed(2)
                this.priceOk = true; 
                this.$store.commit('showLoading',false)
              })
            }
          } else {
            addAgency(this.newItem).then(res=>{
              if(res.data.status=='200') {
                this.dialogAddVisible = false;
                if(this.$route.path!='/application') {
                  this.$router.replace({name:'Application'})
                }
                this.$router.push({name:'AgencyOrderlist'});
              }
            })
          }          
        }
      }
      
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
      };
      
      this.sizeList.map(size=>{
        document.getElementById('size-'+size).className = 'checkboxContent';
      })

      this.newItem = {
        user_email: '1@1.com',
        user_id: '',
        brand: '',
        storage_link: '',
        price: '0',
        size: [],
        account_type: '0',
        discount_type: '0',
        discount_code: '',
        giftcard_type: '0',
        giftcards: [],
        order_num: '',
        interval: '',
      }
    }
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

  .formbox {
    width: 100vw;
    height: calc(100vh - 60px - 80px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }

  .formbox .formItem {
    font-size: 16px;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px 5px;
    border-radius: 10px;
  }
  .formbox .formItem .name {
    width: 80px;
    font-size: 16px;
    display: inline-block;
    padding-right: 10px;
    /* border: 1px solid #9d9; */
    text-align: right;
    color: #999;
  }
  .formbox .formItem input[type="text"] {
    font-size: 14px;
    width: calc(100vw - 40px - 80px - 10px);
    background: none;
    border: none;
    border-bottom: 1px solid #999;
    outline: none;
    padding: 2px 10px;
  }
  .formbox .formItem input:focus {
    border-bottom: 1px solid var(--color-all);
  }
  .formItem .inputBox {
    display: inline-block;
    width: calc(100vw - 40px - 80px - 10px);
  }
  .formItem .inputBox .inputContent {
    width: 100%;
    display: flex;
    flex-flow: wrap;
  }
  .inputContent .checkboxItem {
    width: 12vw;
  }
  .inputContent .checkboxItem .checkboxContent {
    background-color:#f0f1f2;
    color:#777;
    width:10vw;
    border-radius:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    font-size: 12px;
  }
  .inputContent .checkboxItem .checkboxContentActive {
    background-color:#d5ebe7;
    color: var(--color-all);
    width:10vw;
    border-radius:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    font-size: 12px;
  }
  .formItem .inputBox #giftcardBox,
  .formItem .inputBox #discountBox,
  .formItem .inputBox #accountBox {
    /* justify-content: space-around; */
  }

  .formItem .inputBox .inputContent .radioItem {
    background-color:#f0f1f2;
    color:#777;
    padding: 2px 5px;
    border-radius:5px;
    height:22px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    margin-left: 10px;
    font-size: 12px;
  }
  .formItem .inputBox .inputContent .radioItemActive {
    background-color:#d5ebe7;
    color: var(--color-all);
    padding: 2px 5px;
    border-radius:5px;
    height:22px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    margin-left: 10px;
    font-size: 12px;
  }

  .giftcardTable {
    width: calc(100vw - 40px - 80px - 10px);
    max-height: 100px;
    overflow-y: scroll;
    /* border-top: 1px dotted #999; */
    /* border-bottom: 1px dotted #999; */
    padding: 5px 0;
  }
  .giftcardTable thead tr th {
    padding: 10px 0;
  }
  .giftcardTable tbody {
    text-align: center;
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
</style>