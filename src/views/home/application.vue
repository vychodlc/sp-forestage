<template>
  <div class="application">
    <div class="formCard">
      <div class="header" id="header1">
        <div class="title">转运</div>
      </div>
      <div class="options" id="options1">
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">申报</div>
          </div>
          <div class="optiondetail">
            <div class="item" @click="$router.push({name:'Transmit',params:{name:'Nike'}})"><img src="~/assets/images/application/fenlei.png" alt=""> Nike</div>
            <div class="item" @click="$router.push({name:'Transmit',params:{name:'通用'}})"><img src="~/assets/images/application/fenlei.png" alt=""> 通用</div>
            <div class="item" @click="$router.push({name:'Transmit',params:{name:'Adidas'}})"><img src="~/assets/images/application/fenlei.png" alt=""> Adidas</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> 记录/状态</div>
            <div class="item" @click="$router.push({name:'Transmit',params:{name:'JD'}})"><img src="~/assets/images/application/fenlei.png" alt=""> JD</div>
          </div>
        </div>
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/kucun.png" alt=""></div>
            <div class="name">仓库</div>
          </div>
          <div class="optiondetail">
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> 普通出库</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> 记录/状态</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> 退税出库</div>
          </div>
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
            <div class="name">申请</div>
          </div>
          <div class="optiondetail">
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> Nike</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> Adidas</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> JD</div>
          </div>
        </div>
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/youhuiquan.png" alt=""></div>
            <div class="name">礼品卡</div>
          </div>
          <div class="optiondetail">
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> Nike</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> Adidas</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> JD</div>
          </div>
        </div>
        <div class="option">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/fenlei.png" alt=""></div>
            <div class="name">订单</div>
          </div>
          <div class="optiondetail">
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> Nike</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> Adidas</div>
            <div class="item"><img src="~/assets/images/application/fenlei.png" alt=""> JD</div>
          </div>
        </div>
      </div>
    </div>
    <div class="formCard">
      <div class="header" id="header3" @click="hasCard=!hasCard">
        <div class="title">银行卡</div>
      </div>
      <div class="options" id="options3">
        <div class="option" v-if="!hasCard">
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">申请/修改资料</div>
          </div>
        </div>
        <div class="option" v-else>
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">充值</div>
          </div>
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">提现</div>
          </div>
          <div class="optionheader">
            <div class="icon"><img src="~/assets/images/application/biaodan.png" alt=""></div>
            <div class="name">记录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Application",
    data () {
      return {
        hasCard: false,
      }
    },
    methods:{},
    created() {
      console.log('application');
    }
  }
</script>

<style scoped>
  .application {
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
  }
  .formCard {
    width: 90vw;
    margin-top: 5vh;
    height: 25vh;
    margin-left: 5vw;
    border-radius: 20px;
    box-shadow: 0 0 10px #999;
    position: relative;
  }
  .formCard .header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 40%;
  }
  #header1 {background: url('../../assets/backimage/bg1.jpg');background-size:100% auto;background-position:center;}
  #header2 {background: url('../../assets/backimage/bg2.jpg');background-size:100% auto;background-position:center;}
  #header3 {background: url('../../assets/backimage/bg3.jpg');background-size:100% auto;background-position:center;}
  .formCard .header .title {
    color: #fff;
    padding: 20px;
    font-size: 25px;
  }
  .icon img {
    width: 30px;
    height: 30px;
    margin-right: 1vw;
  }
  .optionheader .name {
    color: #333;
    font-size: 16px;
  }
  .item {
    font-size: 12px;
    text-decoration: underline;
  }
  .item img {
    width: 15px;
    height: 15px;
    margin-right: 1vw;
  }
  .formCard .options {
    height: 60%;
    display: flex;
  }
  .formCard .options .option {
    flex: 1;
    border-right: 1px solid #ccc;
    padding-top: 5px;
  }
  .formCard .options .option:last-child {
    border-right: none;
  }
  .formCard .options .optionheader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #options1 .optiondetail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 44vw;
    height: calc(100% - 40px);
  }
  #options2 .optiondetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 40px);
  }
  #options1 .item,
  #options2 .item {
    width: 22vw;
    padding-left: 2vw;
    line-height: 20px;
    display: flex;
    align-items: center;
  }
  #options3 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 90vw;
  }
  #options3 .option {
    width: 90vw;
    border-right: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
  }
</style>