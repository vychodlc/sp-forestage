<template>
  <div class="purchase">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">申报-{{kind}}</div>
    </div>
    <div class="progress">
      <div class="step step-ed">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">1</div>
        </div>
        <div class="text">
          <div style="font-weight:bold">上传资料</div>
          <div style="transform:translateY(10px)">填写单号</div>
        </div>
      </div>
      <div class="step-line"></div>
      <div class="step step-ing">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">1</div>
        </div>
        <div class="text">
          <div style="font-weight:bold">上传资料</div>
          <div style="transform:translateY(10px)">填写单号</div>
        </div>
      </div>
      <div class="step step-not">
        <div>
          <img class="step-icon" src="~/assets/images/form/checked.png" alt="">
          <div class="step-index">1</div>
        </div>
        <div class="text">
          <div style="font-weight:bold">上传资料</div>
          <div style="transform:translateY(10px)">填写单号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Purchase",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'Nike',
      }
    },
    methods:{},
    mounted() {
      const formName = this.$route.params.name?this.$route.params.name:15
      console.log();
    }
  }
</script>

<style scoped>
  .purchase {
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
    height: 20vh;
    border: 1px solid #000;
    position: relative;
    display: flex;
  }
  .progress .step {
    width: 26vw;
    margin-right: 12vw;
    background-color: var(--color-background);
    z-index: 100;
    /* border: 1px solid #000; */
    display: flex;
    align-items: center;
    padding: 5px;
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
  .step-line {
    border: 1px solid #f0f;
    height: 5px;
  }
</style>