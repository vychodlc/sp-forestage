<template>
  <div class="post">
    <div class="header">
      <div class="logo">SMART</div>
      <div class="search">
        <input type="text" name="search" id="search" @focus="$router.push({name:'Search'})" placeholder="搜索资讯 ~">
      </div>
    </div>
    <div class="navtab">
      <div @click="changeTab(0)" class="navtabItem"><span :class="this.currentTab==0?'active':''">推荐</span></div>
      <div @click="changeTab(1)" class="navtabItem"><span :class="this.currentTab==1?'active':''">品牌</span></div>
      <div @click="changeTab(2)" class="navtabItem"><span :class="this.currentTab==2?'active':''">种类</span></div>
      <div @click="changeTab(3)" class="navtabItem"><span :class="this.currentTab==3?'active':''">年代</span></div>
    </div>
    <div class="content" style="padding-top:0px">
      <swiper :options="swiperOption1" ref="tabSwiper" style="transform: translateY(-0px);">
        <swiper-slide class="tabSlide">
          <div id="my_scroller0">
            <scroller :on-infinite="infinite0" :on-refresh="refresh0" ref="my_scroller0">
              <div class="banners">
                <swiper v-if="this.postData[0].length>5" :options="swiperOption2" ref="bannerSwiper">
                  <swiper-slide v-for="(item,index) in this.postData[0].slice(0,5)" :key="index">
                    <div class="bannerSlide" @click='$router.push({name:"PostDetail",params:{id:item.ID}})'>
                      <img :src="item.cover_img" alt="">
                      <span class="bannerTitle">{{item.post_title}}</span>
                    </div>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
              </div>
              <div class="PostCards">
                <post-card v-for="(item,index0) in postData[0].slice(5)" :key="index0" :data="item"></post-card>
              </div>
            </scroller>
          </div>
        </swiper-slide>
        <swiper-slide class="tabSlide">
          <scroller :on-infinite="infinite1" :on-refresh="refresh1" ref="my_scroller1">
            <div class="PostCards">
              <post-card v-for="(item,index1) in postData[1]" :key="index1" :data="item"></post-card>
            </div>
          </scroller>
        </swiper-slide>
        <swiper-slide class="tabSlide">
          <scroller :on-infinite="infinite2" :on-refresh="refresh2" ref="my_scroller2">
            <div class="PostCards">
              <post-card v-for="(item,index1) in postData[2]" :key="index1" :data="item"></post-card>
            </div>
          </scroller>
        </swiper-slide>
        <swiper-slide class="tabSlide">
          <scroller :on-infinite="infinite3" :on-refresh="refresh3" ref="my_scroller3">
            <div class="PostCards">
              <post-card v-for="(item,index1) in postData[3]" :key="index1" :data="item"></post-card>
            </div>
          </scroller>
        </swiper-slide>
      </swiper>
    </div>
    <div class="backTotop" @click="scrollTotop" v-show="showTotop">
      <img src="~/assets/images/back-to-top.png" alt="">
    </div>
  </div>
</template>

<script>
  import PostCard from "@/components/PostCard"
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import { getPostList,getPostFilter } from "@/network/post.js";
  import { getTag } from "@/network/tag.js";

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
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          observer:true,
          observeParents:true,
        },
        bannerData: [],      
        currentPage: [1,1,1,1],
        postData: [[],[],[],[]],
        hasMore: [false,false,false,false],
        loadflag: [false,false,false,false],
        _refreshText: [],
        isRefresh: false,

        totop: [0,0,0,0],
        showTotop: false,
        listenTotop: null,
      }
    },
    methods:{
      refresh0(){this.isRefresh=true;this.postData[0]=[];this.currentPage[0]=1;this._getPostList(0)},
      refresh1(){this.isRefresh=true;this.postData[1]=[];this.currentPage[1]=1;this._getPostList(1)},
      refresh2(){this.isRefresh=true;this.postData[2]=[];this.currentPage[2]=1;this._getPostList(2)},
      refresh3(){this.isRefresh=true;this.postData[3]=[];this.currentPage[3]=1;this._getPostList(3)},
      infinite0(){if(this.hasMore[0]==true){this._getPostList(0)}else{this.$refs.my_scroller0.finishInfinite(true)}},
      infinite1(){if(this.hasMore[1]==true){this._getPostList(1)}else{this.$refs.my_scroller1.finishInfinite(true)}},
      infinite2(){if(this.hasMore[2]==true){this._getPostList(2)}else{this.$refs.my_scroller2.finishInfinite(true)}},
      infinite3(){if(this.hasMore[3]==true){this._getPostList(3)}else{this.$refs.my_scroller3.finishInfinite(true)}},
      changeTab(tabIndex) {
        this.currentTab = tabIndex;
        this.tabSwiper.slideTo(tabIndex,300,false)
      },
      _getPostList(index) {
        if(index==0) {
          getPostList(this.currentPage[index]).then(res=>{
            if(res.data.status=="200") {
              this.currentPage[index]+=1;
              let data = res.data.data;
              this.hasMore[index] = res.data.more;
              this.$refs.my_scroller0.finishInfinite(!res.data.more)
              for(let item of data) {
                this.postData[index].push(item)
              }
            }else{
              this.$store.commit('showTip', res.data.msg)
            }
            this.loadflag[index] = false;
            if(this.isRefresh==true) {
              this.isRefresh = false;
              this.$refs.my_scroller0.finishPullToRefresh()
            }
          })
        }else{
          const menulist = ['品牌','种类','年代'];
          getPostFilter('menu',menulist[index-1],this.currentPage[index]).then(res=>{
            if(res.data.status=="200") {
              this.currentPage[index]+=1;
              let data = res.data.data;
              this.hasMore[index] = res.data.more;
              if(index==1){this.$refs.my_scroller1.finishInfinite(!res.data.more)}
              if(index==2){this.$refs.my_scroller2.finishInfinite(!res.data.more)}
              if(index==3){this.$refs.my_scroller3.finishInfinite(!res.data.more)}
              for(let item of data) {
                this.postData[index].push(item)
              }
            }else{
              this.$store.commit('showTip', res.data.msg)
            }
            this.loadflag[index] = false;
            if(this.isRefresh==true) {
              this.isRefresh = false;
              if(index==1){this.$refs.my_scroller1.finishPullToRefresh()}
              if(index==2){this.$refs.my_scroller2.finishPullToRefresh()}
              if(index==3){this.$refs.my_scroller3.finishPullToRefresh()}
            }
          })          
        }
      },
      scrollTotop() {
        if(this.currentTab==0){this.$refs.my_scroller0.scrollTo(0,0,100)}
        if(this.currentTab==1){this.$refs.my_scroller1.scrollTo(0,0,100)}
        if(this.currentTab==2){this.$refs.my_scroller2.scrollTo(0,0,100)}
        if(this.currentTab==3){this.$refs.my_scroller3.scrollTo(0,0,100)}
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
    created() {
      getTag().then(res=>{
        this.$store.commit('setTags',res.data.data)
        this._getPostList(0);
        this._getPostList(1);
        this._getPostList(2);
        this._getPostList(3);
      })
    },
    mounted() {
      
    },
    activated() {
      this.$store.commit('showLoading',false);
      this.listenTotop = setInterval(()=>{
        let top;
        if(this.currentTab==0){top = this.$refs.my_scroller0.getPosition().top}
        if(this.currentTab==1){top = this.$refs.my_scroller1.getPosition().top}
        if(this.currentTab==2){top = this.$refs.my_scroller2.getPosition().top}
        if(this.currentTab==3){top = this.$refs.my_scroller3.getPosition().top}
        this.showTotop = top>200?true:false;
      },500)
    },
    deactivated() {
      window.clearInterval(this.listenTotop);
      this.listenTotop = null;
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
    /* margin-top: 10px; */
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
    /* bottom: 50%; */
    top: 0;
    /* transform: translateY(50%); */
    color: #fff;
    font-size: 16px;
    padding: 10px 30px;
    text-align: left;
    line-height: 20px;
    background-color: #77777777;
    left: 0;
  }
  .banners >>> .swiper-pagination-bullet-active {
    background-color: var(--color-all);
  }
  .post-content {
    height: calc(100vh - 80px - 50px);
    overflow-y: scroll;
    padding-bottom: 20px;   
  }
  .bannerSlide img {
    max-height: 200px;
    width: 100%;
  }
  .bannerSlide span {
    width: 100vw;
  }
  .tip {
    color: #999
  }
  .refreshText {
    /* line-height: 30px; */
  }
  .refreshDiv {
    width: 20px;
    height: 30px;
    position: absolute;
    top: 0;
    transform: translateY(-20px);
    background-color: #f0f;
  }

  .backTotop {
    position: fixed;
    right: 10px;
    bottom: 80px;
    width: 40px;
    height: 40px;
    z-index: 4000;
    background-color: #fff;
    border-radius: 50%;
  }
  .backTotop img {
    width: 100%;
    height: 100%;
  }
</style>