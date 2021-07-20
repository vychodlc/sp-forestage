<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive exclude="PostDetail">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- <div class="messageHover">
      <div class="messageBox"></div>
    </div> -->
    <div class="loading" v-show="$store.state.message.loading.show">
      <div class="sun-loading"></div>
    </div>
    <div class="messageTip" v-show="$store.state.message.tip.show">
      {{$store.state.message.tip.text}}
    </div>
    <div class="bigImg" v-if="$store.state.bigImg.show" @click="$store.commit('showImg',['',false]);$router.go(-1)">
      <img :src="$store.state.bigImg.url" alt="">
    </div>
    <Pay v-if="$store.state.pay.show"></Pay>
    <!-- <AddrManage v-if="$store.state.show.showAddr"></AddrManage>
    <AddrEdit v-if="$store.state.show.addrEdit"></AddrEdit>
    <AddrAdd v-if="$store.state.show.addrAdd"></AddrAdd> -->
  </div>
</template>

<script>
  import {spider} from '@/utils/spider'
  import Pay from '@/components/Pay'
  import AddrManage from "@/components/AddrManage"
  import AddrEdit from "@/components/AddrEdit"
  import AddrAdd from "@/components/AddrAdd"

  import {getUserInfo} from '@/network/user'
  import axios from 'axios'

  export default({
    name: 'App',
    components: {Pay,AddrManage,AddrEdit,AddrAdd},
    data() {
      return {
        transitionName:''
      }
    },
    created() {
      const Height = window.innerHeight;
      // console.log(Height);
      window.onresize = () => {
        return (() => {
          window.innerHeight = Height
        })()
      }
    },
    methods: {
      gogogo() {
        console.log('gogogo');
      },
    },
    mounted() {
      this.$store.commit('showLoading',false)
      getUserInfo().then(res=>{
        if(res.data.status=='200') {
          this.$store.commit('setBalance',res.data.data.balance)
          localStorage.balance = res.data.data.balance
        }
      });
    },
    watch: {
      $route(to, from) {
        // this.transitionName = "fade"
        // if(
        //   to.name=='Search'&&from.name=='Post'
        //   ||to.name=='PostDetail'&&from.name=='Post'
        //   ||to.name=='PostDetail'&&from.name=='Search'
        // ) {
        //   this.transitionName = 'slide-left'
        //   console.log(from.name,to.name);
        // } else if (
        //   from.name=='Search'&&to.name=='Post'
        //   ||from.name=='PostDetail'&&to.name=='Post'
        //   ||from.name=='PostDetail'&&to.name=='Search'
        // ){
        //   this.transitionName = 'slide-right';
        //   console.log(from.name,to.name);
        // }
      }
    }
  })
</script>


<style scoped>
  @import "assets/css/base.css";
  @import "assets/css/custom.css";
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

  .loading {
    position: absolute;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .sun-loading {
    width: 100px;
    height: 100px;
    display: block;
    background: url('assets/loading.gif');
    background-size: 100%;
    margin:auto;
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right:0;
  }
  
  .messageTip {
    z-index: 10000;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    background-color: #666;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px 10px;
  }

  .bigImg {
    z-index: 3000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #444444ee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bigImg img {
    width: 100vw;
  }

  /* 路由切换动画 */
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-top-enter-active,
  .slide-top-leave-active,
  .slide-bottom-enter-active,
  .slide-bottom-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {opacity: 0; transform: translate3d(-100%, 0, 0);}
  .slide-right-leave-active {opacity: 0;transform: translate3d(100%, 0, 0);}
  .slide-left-enter {opacity: 0;transform: translate3d(100%, 0, 0);}
  .slide-left-leave-active {opacity: 0;transform: translate3d(-100%, 0, 0);}

  .fade-enter-active {transition: opacity .5s;}
  .fade-enter {opacity: 0;}
  .fade-leave {opacity: 1;}
  .fade-leave-active {opacity:0; transition: opacity .5s;}
</style>
