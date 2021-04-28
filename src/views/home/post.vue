<template>
  <div class="post">
    <div class="header">
      <div class="logo">SMART</div>
      <div class="search">
        <input type="text" name="search" id="search" placeholder="搜索资讯 ~">
      </div>
    </div>
    <div class="navtab">
      <div @click="changeTab(0)" class="navtabItem"><span :class="this.currentTab==0?'active':''">推荐</span></div>
      <div @click="changeTab(1)" class="navtabItem"><span :class="this.currentTab==1?'active':''">品牌</span></div>
      <div @click="changeTab(2)" class="navtabItem"><span :class="this.currentTab==2?'active':''">种类</span></div>
      <div @click="changeTab(3)" class="navtabItem"><span :class="this.currentTab==3?'active':''">年代</span></div>
    </div>
    <div class="content">
      <swiper :options="swiperOption1" ref="tabSwiper">
        <swiper-slide class="tabSlide">
          <div class="post-content">
            <div class="banners">
              <swiper :options="swiperOption2" ref="bannerSwiper">
                <swiper-slide v-for="(bannerImg,index) in bannerImgs" :key="index">
                  <div class="bannerSlide">
                    <img :src="bannerImg.src" alt="">
                    <span class="bannerTitle">{{bannerImg.title}}</span>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="PostCards">
              <post-card v-for="(item,index1) in postData[0]" :key="index1" :data="item"></post-card>
              <!-- <post-card v-for="(item,index2) in postData[0]" :key="index2" :data="item"></post-card>
              <post-card v-for="(item,index3) in postData[0]" :key="index3" :data="item"></post-card> -->
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="tabSlide">品牌</swiper-slide>
        <swiper-slide class="tabSlide">种类</swiper-slide>
        <swiper-slide class="tabSlide">年代</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import PostCard from "@/components/PostCard"
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import { getPostList } from "@/network/post.js";

  import "swiper/dist/css/swiper.css";
  export default {
    name: "Post",
    components: {
      swiper,
      swiperSlide,
      PostCard,
    },
    data () {
      return {
        currentTab: 0,
        swiperOption1: {
          on: {
            slideChange: () => {
              this.currentTab = this.tabSwiper.activeIndex;
            }
          },
        },
        swiperOption2: {
          loop: true,
          autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
        },
        bannerImgs: [
          {src: 'http://www2.flightclub.cn/news/uploads/allimg/210427/27-21042G34454.jpg', title: '这个牌子侃爷都在穿！已经卖断码！机能党们夏日必备！'},
          {src: 'http://www2.flightclub.cn/news/uploads/allimg/210426/6-210426125001.jpg', title: '又是樱花、又是棉花糖！这些球鞋一曝光，刚中签的「限量鞋」瞬间不香了！'},
          {src: 'http://www2.flightclub.cn/news/uploads/allimg/210425/23-210425132156.jpg', title: '「能玩一天」的鞋又来了！上次发售还是一年前！别等买不到再后悔！'},
          {src: 'http://www2.flightclub.cn/news/uploads/allimg/210423/27-2104231Q245.jpg', title: '王一博带火的「小 FOG」只要三百多！买得起的「明星同款」竟有这么多！'}
        ],      
        currentPage: [1,1,1,1],
        postData: [
          [],[],[],[]
        ],
      }
    },
    methods:{
      changeTab(tabIndex) {
        this.currentTab = tabIndex;
        this.tabSwiper.slideTo(tabIndex,300,false)
      },
      _getPostList(index) {
        getPostList(this.currentPage[index]).then(res=>{
          if(res.data.status=="200") {
            this.currentPage[index]+=1;
            let data = res.data.data
            for(let item of data) {
              this.postData[index].push(item)
            }
          }else{
            this.$store.commit('showTip', res.data.msg)
          }
        })
      }
    },
    computed: {
      tabSwiper() {
        return this.$refs.tabSwiper.swiper;
      },
      bannerSwiper() {
        return this.$refs.bannerSwiper.swiper;
      }
    },
    mounted() {
      this._getPostList(0)
    }
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
    color: var(--color-all);
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
  .active {
    color: var(--color-all);
    border-bottom: 2px solid var(--color-all);
    padding: 4px 10px;
    font-weight: bold;
  }

  .content {
    margin-top: 10px;
  }
  .content .swiper-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 80px - 50px);
  }  
  .content .swiper-container .swiper-slide{
    width: 100%;
    color: #000;
    font-size: 16px;
    text-align: center;
  }


  .banners .swiper-container{
    position: relative;
    width: 95%;
    width: 100%;
    height: 200px;
    /* border-radius: 20px; */
  }  
  .banners .swiper-container .swiper-slide{
    height: 200px;
    width: 100%;
    font-size: 50px;
    position: relative;
  }
  .banners .swiper-container .swiper-slide span {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    color: #fff;
    font-size: 16px;
    padding: 10px 30px;
    text-align: left;
    line-height: 20px;
    background-color: var(--color-all-opacity);
    left: 0;
  }
  .banners >>> .swiper-pagination-bullet-active {
    background-color: var(--color-all);
  }
  .post-content {
    height: calc(100vh - 80px - 50px);
    overflow-y: scroll;    
  }
  .bannerSlide img {
    max-height: 200px;
    width: 100%;
  }
</style>