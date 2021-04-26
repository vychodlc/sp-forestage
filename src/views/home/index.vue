<template>
  <div class="home">
    <router-view/>
    <div class="navbar">
      <div class="navbarItem">
        <div class="icon"></div>
        <div class="name">资讯</div>
      </div>
      <div class="navbarItem">
        <div class="icon"></div>
        <div class="name">服务</div>
      </div>
      <div class="navbarItem">
        <div class="icon"></div>
        <div class="name">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data () {
      return {}
    },
    methods:{}
  }
</script>

<style scoped>
  .home {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .navbar {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #777;
    display: flex;
    flex-direction: row;
  }
  .navbarItem {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>