<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">{{kind}}出库</div>
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
          <thead><tr><th style="width:48vw;font-size:18px">快递单号</th><th style="width:40vw;font-size:18px">邮箱地址</th></tr></thead>
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
              <td><input v-on:input="checkForm()" type="text" :style="{border:(item.right[0]==true?'1px solid var(--color-all)':'1px solid #f00')}" v-model='item.id' :id="index+'-1id'"></td>
              <td><input v-on:input="checkForm()" type="text" :style="{border:(item.right[1]==true?'1px solid var(--color-all)':'1px solid #f00')}" v-model='item.email' :id="index+'-1email'"></td>
              <td><div class="delete" v-if='orders.length!=1' @click="delItem(index)">×</div></td>
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
        <div v-else class="okbox">
          <img src="~assets/images/ok.png" alt="">
          <p>您所申报的单号已经上传完毕！</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btnbox" @click="changeStep(0)" v-if="currentStep!=3">
        <div class="btn" v-if="currentStep==1">取消</div>
        <div class="btn" v-else-if="currentStep==2&&wrongDataStatus==true">重新校验</div>
        <div class="btn" v-else>上一步</div>
      </div>
      <div class="btnbox" @click="changeStep(1)">
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
  export default {
    name: "Transmit",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'Nike',
        currentStep: 1,
        stepNum: 3,
        orders: [
          {id:'',email:'',right:[true,true]},
          {id: '123123', email: '12313@23', right: [true,true]},
          {id: '123123', email: '123@13123', right: [true,true]},
          // {id: '', email: '12313123', right: [true,true]},
          // {id: '', email: '12313123', right: [true,true]},
          // {id: '', email: '12313123', right: [true,true]},
          // {id: '', email: '12313123', right: [true,true]},
          // {id: '打球的青蛙', email: '12313123', right: [true,true]},
          // {id: '请问请问', email: '12313@123', right: [true,true]},
          // {id: '恶趣味', email: '12313123', right: [true,true]},
          // {id: '123123', email: '12313@123', right: [true,true]},
          // {id: '123123', email: '12313123', right: [true,true]}
        ],
        dialogShow: false,
        dialogText: '',
        wrongDataStatus: false,
        wrongDataNum: 0,
        loading: false,
      }
    },
    methods:{
      test() {
        console.log('focus');
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
            }
          }
          if(canGo==false) {
            this.$store.commit('showTip', '请输入申报信息')
          } else {
            document.getElementById('step1').className = 'step step-ed'
            document.getElementById('step2').className = 'step step-ing'
            document.getElementsByClassName('line')[0].className = 'line line-ed'
            this.checkForm();
            this.currentStep+=1
          }
        } else if(this.currentStep==2&&direction==0){
          // 第二步 向左
          if(this.wrongDataStatus==true) {
            this.checkForm();
          } else {
            document.getElementById('step1').className = 'step step-ing'
            document.getElementById('step2').className = 'step step-not'
            document.getElementsByClassName('line')[0].className = 'line line-not'
            this.currentStep-=1
          }
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
            /*
              上传数据的函数
            */
            setTimeout(() => {
              this.loading = false
            }, 3000);
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
      addOne() {
        console.log(123);
        this.orders.push({id:'',email:'',right:[true,true]});
        let orderTable = document.getElementById('orderTable')
        this.$nextTick(()=>{
          orderTable.scrollTo(0,orderTable.scrollHeight)
        })
      },
      delItem(index) {
        this.orders.splice(index,1);
      },
      enterOrder() {
        let rows = this.dialogText.split('\n');
        let input = [];
        for(let i=0;i<rows.length;i++) {
          let splitRow = rows[i].split(' ').filter(item=>item==''?false:true);
          if(splitRow.length>2) {
            input.push(splitRow.slice(0,2))
          }else if(splitRow.length==2) {
            input.push(splitRow)
          }
        }
        for(let i=0;i<input.length;i++) {
          this.orders.push({id: input[i][0], email: input[i][1]});
        }
        this.dialogShow = false;
        this.dialogText = '';
        this.$nextTick(()=>{
          orderTable.scrollTo(0,orderTable.scrollHeight)
        })
      },
      checkForm() {
        console.log('开始校验');
        let wrongNum = 0;
        let rightNum = 0;
        for(let i=this.orders.length-1;i>=0;i--) {
          let item = this.orders[i];
          if(item.id==''&&item.email=='') {
            this.orders.splice(i,1);
          } else if(item.email.indexOf('@')==-1) {
            this.orders[i].right[1] = false;
            wrongNum++;
          } else {
            this.$set(this.orders,i,{id:this.orders[i].id,email:this.orders[i].email,right:[true,true]})
            rightNum++;
          }
        }
        this.wrongDataNum = wrongNum;
        if(wrongNum==0) {
          this.wrongDataStatus = false;
          document.getElementById('tableTip').className = 'ok'
        }else {
          this.wrongDataStatus = true;
          document.getElementById('tableTip').className = 'wrong'
        }
        console.log(wrongNum,rightNum);
      }
    },
    activated() {
      this.kind = this.$route.params.name?this.$route.params.name:'Nike';
      document.getElementsByClassName('footer')[0].style.display = '';
      document.getElementsByClassName('step')[0].className = 'step step-ing'
      document.getElementsByClassName('step')[1].className = 'step step-not'
      document.getElementsByClassName('step')[2].className = 'step step-not'
      document.getElementsByClassName('line')[0].className = 'line line-not'
      document.getElementsByClassName('line')[1].className = 'line line-not'
      this.currentStep=1;
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
  .formbox .upload .okbox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .formbox .upload p {
    text-align: center;
    font-size: 20px;
    line-height: 50px;
  }
</style>