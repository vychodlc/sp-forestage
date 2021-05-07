<template>
  <div class="transmit">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">申报-{{kind}}</div>
    </div>
    <div class="progress">
      <div class="line" id="line1"></div>
      <div class="line" id="line2"></div>
      <div class="step step-ed">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">1</div>
        </div>
        <div class="text">
          <div style="font-weight:bold">上传资料</div>
          <div style="transform:translateY(5px)">填写单号</div>
        </div>
      </div>
      <div class="step step-ing">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">2</div>
        </div>
        <div class="text">
          <div style="font-weight:bold">上传资料</div>
          <div style="transform:translateY(5px)">填写单号</div>
        </div>
      </div>
      <div class="step step-not">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">3</div>
        </div>
        <div class="text">
          <div style="font-weight:bold">上传资料</div>
          <div style="transform:translateY(5px)">填写单号</div>
        </div>
      </div>
    </div>
    <div class="formbox"></div>
    <div class="footer">
      <div class="btn">取消</div>
      <div class="btn">下一步</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Transmit",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'Nike',
      }
    },
    methods:{},
    activated() {
      this.kind = this.$route.params.name?this.$route.params.name:'Nike'
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
    /* border: 1px solid #000; */
    position: relative;
    display: flex;
  }
  .progress .line {
    position: absolute;
    width: 50%;
    height: 50%;
    border-bottom: 3px solid var(--color-all);
  }
  #line1 {left: 0;border-bottom: 2px solid var(--color-all);}
  #line2 {left: 50vw;border-bottom: 2px solid #999;}
  .progress .step {
    width: 27vw;
    margin-right: 9.5vw;
    background-color: var(--color-background);
    z-index: 100;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
  }
  .progress .step:last-child {
    margin-right: 0;
  }
  .step img {
    width: 30px;
    height: 30px;
  }
  .step .text {
    padding-left: 5px;
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
  .footer .btn {
    width: 35vw;
    height: 40px;
    margin-left: 10vw;
    margin-top: 15px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  .footer .btn:first-child {
    border: 1px solid var(--color-all);
    color: var(--color-all);
  }
  .footer .btn:last-child {
    background-color: var(--color-all);
    color: #fff;
  }
</style>