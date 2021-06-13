<template>
  <div class="agency">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title" @click="test">{{kind}}代购</div>
    </div>
    <div class="formbox">
      <div class="formItem">
        <div class="name">商品链接</div>
        <input type="text" id="storage_link" v-model="newItem.storage_link">
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
                    <th>品牌</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in newItem.giftcards" :key="index">
                    <td>{{item.card_num}}</td>
                    <td>{{item.pin}}</td>
                    <td>{{item.brand}}</td>
                    <!-- <td>{{item.right==true?'ok':'×'}}</td> -->
                    <td v-if="item.right==true"><div style="color:#fff;background-color:var(--color-all);width:12px;height:12px;border-radius:5px;texa-align:center;line-height:12px">✔</div></td>
                    <td v-else><div @click="delGiftcard(index)" style="color:#fff;background-color:#f56c6c;width:12px;height:12px;border-radius:5px;texa-align:center;line-height:12px">×</div></td>
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
              <input type="text" v-model="newItem.discount_code" style="border: 1px solid #ccc;margin-top:5px;font-size:12px;padding:5px 10px" :placeholder="newItem.discount_type=='2'?'输入单次码，用逗号隔开':'输入复用码'">
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
        <input type="text" id="order_num" v-model="newItem.order_num"></div>
      <div class="formItem">
        <div class="name">时限</div>
        <input type="text" id="interval" v-model="newItem.interval"></div>
    </div>
    <div class="footer">
      <div class="btnbox">
        <div class="btn" @click="submit()">下一步</div>
      </div>
    </div>

    <div class="dialog" v-if="dialogShow">
      <div class="dialogBox">
        <div class="dialogHeader">
          <div class="title">批量导入礼品卡</div>
          <div class="cancel" @click="dialogShow=false">×</div>
        </div>
        <div class="dialogContent">
          <textarea name="inputMany" id="dialogText" v-model="dialogText" placeholder="xxxx xxxx xxxx
xxxx xxxx xxxx
卡号 PIN 品牌"></textarea>
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
  import { addAgency } from '@/network/agency.js'
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
          storage_link: 'www.baidu.com',
          price: '123',
          size: [],
          account_type: '0',
          discount_type: '0',
          discount_code: '',
          giftcard_type: '0',
          giftcards: [
            {'card_num':123,'pin':213,'brand':'Nike','right':true},
            {'card_num':123,'pin':213,'brand':'Nike','right':true},
            {'card_num':123,'pin':213,'brand':'Nike','right':false},
            {'card_num':123,'pin':213,'brand':'Nike','right':false},
            {'card_num':123,'pin':213,'brand':'Nike','right':true},
          ],
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

        okOrders: []
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
          let rows = this.dialogText.split('\n');
          rows.map(row=>{
            if(row!='') {
              let rowData = row.split(' ').filter(iii=>{return iii!=''&&iii!=' '});
              this._addGiftcard({card_num:rowData[0],pin:rowData[1],brand:rowData[2],right:false});
              this.dialogShow = false;
            }
          })
          this.dialogText = '';
        }
      },
      _addGiftcard(card) {
        this.newItem.giftcards.push({card_num:card.card_num,pin:card.pin,brand:card.brand,right:card.right})
      },
      delGiftcard(index) {
        this.newItem.giftcards.splice(index,1);
      },
      submit() {
        if(this.newItem.storage_link=='') {
          this.$store.commit('showTip','请填写商品链接')
        } else if(this.newItem.size.length==0) {
          this.$store.commit('showTip','请选择尺寸')
        } else if(this.newItem.giftcard_type=='') {
          this.$store.commit('showTip','请选择礼品卡类别')
        } else if(this.newItem.giftcard_type=='2'&&this.newItem.giftcards.length==0) {
          this.$store.commit('showTip','请添加礼品卡信息')
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
        } else if(this.newItem.interval=='') {
          this.$store.commit('showTip','请选择代购时限')
        } else {
          this.newItem.brand = this.brand;
          addAgency(this.newItem).then(res=>{
            if(res.data.status=='200') {
              this.dialogAddVisible = false;
              this.$router.push({name:'Application'});
              this.$router.push({name:'AgencyOrderlist'});
            }
          })
          
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
      
      this.newItem = {
        user_email: '1@1.com',
        user_id: '',
        brand: '',
        storage_link: 'www.baidu.com',
        price: '123',
        size: [],
        account_type: '0',
        discount_type: '0',
        discount_code: '',
        giftcard_type: '0',
        giftcards: [
          {'card_num':123,'pin':213,'brand':'Nike','right':true},
          {'card_num':123,'pin':213,'brand':'Nike','right':true},
          {'card_num':123,'pin':213,'brand':'Nike','right':false},
          {'card_num':123,'pin':213,'brand':'Nike','right':false},
          {'card_num':123,'pin':213,'brand':'Nike','right':true},
        ],
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