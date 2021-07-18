<template>
  <div class="home">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div class="navbar">
      <div :class="$route.name=='Post'?'navbarActive':'navbarItem'">
        <router-link :to="{path:'/post'}" replace>
          <div class="icon" v-if="$route.name=='Post'"><img src="~/assets/images/comment-filling.png" alt=""></div>
          <div class="icon" v-else><img src="~/assets/images/comment.png" alt=""></div>
          <div class="name">资讯</div>
        </router-link>
      </div>
      <div :class="$route.name=='Application'?'navbarActive':'navbarItem'">    
        <router-link :to="{path:'/application'}" replace>
          <div class="icon" v-if="$route.name=='Application'"><img src="~/assets/images/dynamic-filling.png" alt=""></div>
          <div class="icon" v-else><img src="~/assets/images/modular.png" alt=""></div>
          <div class="name">服务</div>
        </router-link>
      </div>
      <div :class="$route.name=='My'?'navbarActive':'navbarItem'">
        <router-link :to="{path:'/my'}" replace>
          <div class="icon" v-if="$route.name=='My'"><img src="~/assets/images/user-filling.png" alt=""></div>
          <div class="icon" v-else><img src="~/assets/images/user.png" alt=""></div>
          <div class="name">我的</div>
        </router-link>
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
    methods:{
    },
    created() {
      this.$store.commit('showLoading',false);
      if((localStorage.token=='')||(localStorage.token==undefined)) {
        this.$store.commit('rmToken');
        if(this.$route.path!='/login') {
          this.$router.replace('/login');
        }
      }
    }
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
    text-align: center;
    z-index: 1000;
  }
  .navbarItem,
  .navbarActive {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .navbarActive .name {
    color: var(--color-all);
  }
  .icon img {
    width: 25px;
    height: 25px;
  }
</style>