<template>
  <div class="application">
    <div class="formCard">
      <div class="header" id="header1">
        <div class="title">转运</div>
        <div class="code" v-if="code&&code.code_status=='1'">{{code.code}}</div>
      </div>
      <div class="options" id="options1">
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">申报</div>
          </div>
          <div class="optiondetail">
            <div class="item" @click="routerGo('Transmit','Nike')"><img src="~/assets/images/application/fenlei.png" alt=""> Nike</div>
            <div class="item" @click="routerGo('Transmit','Adidas')"><img src="~/assets/images/application/fenlei.png" alt=""> Adidas</div>
            <div class="item" @click="routerGo('Transmit','JD')"><img src="~/assets/images/application/fenlei.png" alt=""> JD</div>
            <!-- <div class="item" @click="routerGo('Transmit','通用')"><img src="~/assets/images/application/fenlei.png" alt=""> 通用</div> -->
          </div>
          <div class="more" @click="routerGo('TransmitOrderlist','')"><img src="~/assets/images/application/arrow-right.png" alt=""></div>
        </div>
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/kucun.png" alt=""></div>
            <div class="name">仓库</div>
          </div>
          <div class="optiondetail">
            <div class="item" @click="routerGo('StorageOrderlist','')"><img src="~/assets/images/application/fenlei.png" alt=""> 库存</div>
            <div class="item" @click="routerGo('Output','普通')"><img src="~/assets/images/application/fenlei.png" alt=""> 普通出库</div>
            <div class="item" @click="routerGo('Outputtax','退税')"><img src="~/assets/images/application/fenlei.png" alt=""> 退税出库</div>
          </div>
          <div class="more" @click="routerGo('OutputOrderlist','')"><img src="~/assets/images/application/arrow-right.png" alt=""></div>
        </div>
      </div>
    </div>
    <div class="formCard">
      <div class="header" id="header2">
        <div class="title">代购</div>
      </div>
      <div class="options" id="options2">
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">下单</div>
          </div>
          <div class="optiondetail">
            <div class="item" @click="routerGo('Agency','Nike')"><img src="~/assets/images/application/fenlei.png" alt=""> Nike</div>
            <div class="item" @click="routerGo('Agency','Adidas')"><img src="~/assets/images/application/fenlei.png" alt=""> Adidas</div>
            <div class="item" @click="routerGo('Agency','JD')"><img src="~/assets/images/application/fenlei.png" alt=""> JD</div>
          </div>
          <div class="more" @click="routerGo('AgencyOrderlist','')"><img src="~/assets/images/application/arrow-right.png" alt=""></div>
        </div>
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">服务</div>
          </div>
          <div class="optiondetail">
            <div class="item" @click="routerGo('Query','')"><img src="~/assets/images/application/fenlei.png" alt=""> 礼品卡查询</div>
          </div>
        </div>
      </div>
    </div>
    <div class="formCard">
      <div class="header" id="header3">
        <div class="title">银行卡</div>
      </div>
      <div class="options" id="options3">
        <div class="option" v-if="cardStatus==0||cardStatus==4">
          <div class="optionheader" @click="routerGo('Bankcard','')">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">提交申请</div>
          </div>
        </div>
        <div class="option" v-if="cardStatus==1">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">已有卡(可使用)</div>
            <div class="name"></div>
          </div>
          <div class="optionheader">
            <div class="name">{{cardNum}}</div>
          </div>
        </div>
        <div class="option" v-if="cardStatus==2">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">已有卡(已冻结)</div>
            <div class="name"></div>
          </div>
          <div class="optionheader">
            <div class="name">{{cardNum}}</div>
          </div>
        </div>
        <div class="option" v-if="cardStatus==3">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">申请状态</div>
          </div>
          <div class="optionheader">
            <div class="name">待审批</div>
          </div>
        </div>
        <div class="option" v-if="cardStatus==4">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">申请状态</div>
          </div>
          <div class="optionheader">
            <div class="name">已驳回</div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm" v-show="showDialog">
      <div class="box">
        <div class="title">尚未登录</div>
        <div class="context">是否前往登陆页面从而获取更多权限</div>
        <div class="btns">
          <div class="btn" @click="hideDialog()">取消</div>
          <div class="btn" @click="$router.replace({name:'Login'})">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getBankcard } from '@/network/bankcard.js'
  import { getCode } from '@/network/user.js'
  export default {
    name: "Application",
    data () {
      return {
        cardStatus: 0,
        cardNum: '',
        token: '',
        showDialog: '',
        code: null,
      }
    },
    methods:{
      routerGo(route,param) {
        if(this.token=='') {
          this.showDialog = true;
          window.history.pushState(null,null,'#')
        } else {
          if(param=='') {
           this.$router.push({name:route})
          } else {
           this.$router.push({name:route,params:{name:param}})
          }
        }
      },
      hideDialog() {
        this.showDialog = false
        this.$router.go(-1)
      },
      _getBankcard() {
        getBankcard().then(res=>{
          if(res.data.status=='200') {
            if(res.data.msg=='Apply') {
              this.cardStatus = 3;
            }
            if(res.data.msg=='Reject') {
              this.cardStatus = 4;
            }
            if(res.data.msg=='OK') {
              this.cardStatus = 1;
              this.cardNum = res.data.data.cardnum
            }
            if(res.data.msg=='Block') {
              this.cardStatus = 2;
              this.cardNum = res.data.data.cardnum
            }
            if(res.data.msg=='Pass'&&res.data.data.bankcard_id==null) {
              this.cardStatus = 0
            }
          }
        })
      }
    },
    created() {
      this.token = localStorage.token;
      this.showDialog=false;
      if(localStorage.token=='') {
        window.addEventListener('popstate', e=>{
          if(this.showDialog) {
            this.showDialog = !this.showDialog
          }
        }, false)
      } else {
        this._getBankcard();
        getCode().then(res=>{
          if(res.data.status=='200') {
            this.code = res.data;
          }
        })
      }
    },
    activated() {
      this.token = localStorage.token;
      this.showDialog=false;
      this.$store.commit('showLoading',false);
      if(localStorage.token=='') {
        window.addEventListener('popstate', e=>{
          if(this.showDialog) {
            this.showDialog = !this.showDialog
          }
        }, false)
      } else {
        this._getBankcard()
        getCode().then(res=>{
          if(res.data.status=='200') {
            this.code = res.data;
          }
        })
      }
    },
    beforeDestroy() {
      window.removeEventListener('popstate', e=>{
        if(this.showDialog) {
          this.showDialog = !this.showDialog
        }
      }, false)
    }
  }
</script>

<style scoped>
  .application {
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
  }
  .formCard {
    width: 90vw;
    margin-top: 5vh;
    margin-left: 5vw;
    border-radius: 20px;
    box-shadow: 0 0 10px #999;
    position: relative;
  }
  .formCard .header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 10vh;
  }
  #header1 {background: url('../../assets/backimage/bg1.jpg');background-size:100% auto;background-position:center;}
  #header2 {background: url('../../assets/backimage/bg2.jpg');background-size:100% auto;background-position:center;}
  #header3 {background: url('../../assets/backimage/bg3.jpg');background-size:100% auto;background-position:center;}
  .formCard .header .title {
    color: #fff;
    padding: 20px;
    font-size: 25px;
  }
  .header .code {
    position: absolute;
    right: 10px;
    top: 5vh;
    color: #fff;
    transform: translateY(-50%);
    font-size: 20px;
  }
  .icon img {
    width: 30px;
    height: 30px;
    margin-right: 1vw;
  }
  .optionheader .name {
    color: #666;
    font-weight: bold;
    font-size: 14px;
  }
  .item {
    font-size: 12px;
    color: #333;
  }
  .item img {
    width: 15px;
    height: 15px;
    margin-right: 1vw;
  }
  .formCard .options {
    display: flex;
    flex-direction: column;
  }
  .formCard .options .option {
    height: 7.5vh;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #888;
  }
  .formCard .options .option:last-child {
    border-bottom: none;
  }
  .formCard .options .option .optionheader {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 25%;
  }
  .formCard .options .option .optiondetail {
    width: 70%;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .optiondetail .item {
    display: flex;
    margin-left: 2vw;
    border-bottom: 1px solid #ccc;
    padding: 1px 0;
  }
  .item span {
    font-size: 30px;
    font-weight: bold;
    color: var(--color-all);
    text-decoration: none;
    margin-right: 5px;
  }
  #options3 .option {
    display: flex;
    flex-direction: row;
  }
  #options3 .optionheader {
    flex: 1;
    display: flex;
    flex-direction: row;
  }

  .more {
    height: 100%;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .more img {
    width: 20px;
    height: 20px;
  }
</style>