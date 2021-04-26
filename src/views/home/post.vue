<template>
  <div class="post">
    <div class="header">
      <div class="logo">SMART</div>
      <div class="search">
        <input type="text" name="search" id="search" placeholder="搜索资讯 ~">
      </div>
    </div>
    <div class="navtab">
      <div class="navtabItem active"><span>推荐</span></div>
      <div class="navtabItem"><span>品牌</span></div>
      <div class="navtabItem"><span>种类</span></div>
      <div class="navtabItem"><span>年代</span></div>
    </div>
    <div class="content">
      <!-- swiper -->
      <div class=""></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Post",
    data () {
      return {}
    },
    methods:{}
  }
</script>

<style scoped>
  .post {
    width: 100%;
    height: calc(100vh - 50px);
  }
  .header {
    width: 100vw;
    display: flex;
    height: 40px;
    background-color: #fff;
  }
  .header .logo {
    width: 30vw;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    color: #e66b75;
  }
  .header .search {
    flex: 1;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header .search input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    border: none;
    background-color: #f0f0f0;
    padding: 0 30px;
  }
  .header .search input:focus {
    border: none;
    outline: none;
  }
  .navtab {
    width: 100vw;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .navtabItem {
    flex: 1;
    font-size: 16px;
    text-align: center;
  }
  .navtab .active span {
    color: #e66b75;
    border-bottom: 2px solid #e66b75;
    padding: 4px 10px;
  }
  
</style>