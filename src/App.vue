<template>
  <div id="app">
    <router-view/>
    <!-- <div class="messageHover">
      <div class="messageBox"></div>
    </div> -->
    <div class="messageTip" v-show="$store.state.message.tip.show">
      {{$store.state.message.tip.text}}
    </div>
  </div>
</template>

<style scoped>
  @import "assets/css/base.css";
  #app {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .messageHover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .messageHover .messageBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 200px;
    height: 50px;
    background-color: #fff;
  }
  .messageTip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    background-color: #666;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px 10px;
  }
</style>
