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
        <div class="text">上传资料</div>
      </div>
      <div class="step step-not" id="step2">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">2</div>
        </div>
        <div class="text">上传资料</div>
      </div>
      <div class="step step-not" id="step3">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">3</div>
        </div>
        <div class="text">上传资料</div>
      </div>
      <div class="step step-not" id="step3">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">3</div>
        </div>
        <div class="text">上传资料</div>
      </div>
    </div>
    <div class="formbox"></div>
    <div class="footer">
      <div class="btnbox" @click="changeStep(0)">
        <div class="btn" v-if="currentStep==1">取消</div>
        <div class="btn" v-else>上一步</div>
      </div>
      <div class="btnbox" @click="changeStep(1)">
        <div class="btn" v-if="currentStep==stepNum">完成</div>
        <div class="btn" v-else>下一步</div>
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
        stepNum: 4,
      }
    },
    methods:{
      changeStep(direction) {
        if(this.currentStep==1&&direction==0) {
          this.$router.go(-1)
        } else if(this.currentStep==1&&direction==1){
          document.getElementById('step1').className = 'step step-ed'
          document.getElementById('step2').className = 'step step-ing'
          document.getElementById('line1').className = 'line line-ed'
          this.currentStep+=1
        } else if(this.currentStep==2&&direction==0){
          document.getElementById('step1').className = 'step step-ing'
          document.getElementById('step2').className = 'step step-not'
          document.getElementById('line1').className = 'line line-not'
          this.currentStep-=1
        } else if(this.currentStep==2&&direction==1){
          document.getElementById('step2').className = 'step step-ed'
          document.getElementById('step3').className = 'step step-ing'
          document.getElementById('line2').className = 'line line-ed'
          this.currentStep+=1
        } else if(this.currentStep==3&&direction==0){
          document.getElementById('step2').className = 'step step-ing'
          document.getElementById('step3').className = 'step step-not'
          document.getElementById('line2').className = 'line line-not'
          this.currentStep-=1
        } else if(this.currentStep==3&&direction==1){
          document.getElementById('step3').className = 'step step-ed';
          document.getElementsByClassName('footer')[0].style.display = 'none';
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }
      }
    },
    activated() {
      this.kind = this.$route.params.name?this.$route.params.name:'Nike';
      document.getElementsByClassName('footer')[0].style.display = '';
      document.getElementsByClassName('step')[0].className = 'step step-ing'
      document.getElementsByClassName('step')[1].className = 'step step-not'
      document.getElementsByClassName('step')[2].className = 'step step-not'
      document.getElementsByClassName('line').className = 'line line-not'
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
    border: 2px solid #000;
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