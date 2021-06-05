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
          <div class="refreshText" id="refreshText1"></div>
          <!-- <div class="refreshDiv"></div> -->
          <div class="post-content" id="content1" @scroll="scrollBottom($event,0)">
            <div class="banners">
              <swiper v-if="bannerData.length>0" :options="swiperOption2" ref="bannerSwiper">
                <swiper-slide v-for="(item,index) in bannerData" :key="index">
                  <div class="bannerSlide" @click='$router.push({name:"PostDetail",params:{id:item.ID}})'>
                    <img :src="item.cover_img" alt="">
                    <span class="bannerTitle">{{item.post_title}}</span>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="PostCards">
              <post-card v-for="(item,index) in postData[0].slice(5)" :key="index" :data="item"></post-card>
            </div>
            <div class="loadMore">
              <div class="tip" v-if="hasMore[0]==false">没有更多啦 ~</div>
              <div class="tip" v-if="hasMore[0]==true&&loadflag[0]==true">往下滑还有更多资讯哦 ~</div>
              <div class="tip" v-if="hasMore[0]==true&&loadflag[0]==false"><img style="width:40px;height:40px" src="~/assets/images/load.gif" alt=""> ~</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="tabSlide" v-for="(item,index) in 3" :key="index">
          <div class="refreshText" :id="'refreshText'+(index+2)"></div>
          <div class="post-content" :id="'content'+(index+2)" @scroll="scrollBottom($event,item)">
            <div class="PostCards">
              <post-card v-for="(item,index1) in postData[item]" :key="index1" :data="item"></post-card>
            </div>
            <div class="loadMore">
              <div class="tip" v-if="hasMore[item]==false">没有更多啦 ~</div>
              <div class="tip" v-if="hasMore[item]==true&&loadflag[item]==true">往下滑还有更多资讯哦 ~</div>
              <div class="tip" v-if="hasMore[item]==true&&loadflag[item]==false"><img style="width:40px;height:40px" src="~/assets/images/load.gif" alt=""> ~</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
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
      }
    },
    methods:{
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
              for(let item of data) {
                this.postData[index].push(item)
              }
            }else{
              this.$store.commit('showTip', res.data.msg)
            }
            this.loadflag[index] = false;
            if(this.currentPage[index]==2) {
              this._getPostList(0);
              this.bannerData = this.postData[index].slice(0,5)
            }
            if(this._refreshText[index] &&this._refreshText[index].innerText) {
              this._refreshText[index].innerText = '';
            }
          })
        }else{
          const menulist = ['品牌','种类','年代'];
          getPostFilter('menu',menulist[index-1],this.currentPage[index]).then(res=>{
            if(res.data.status=="200") {
              this.currentPage[index]+=1;
              let data = res.data.data;
              this.hasMore[index] = res.data.more;
              for(let item of data) {
                this.postData[index].push(item)
              }
              if(this._refreshText[index] &&this._refreshText[index].innerText) {
                this._refreshText[index].innerText = '';
              }
            }else{
              this.$store.commit('showTip', res.data.msg)
            }
            this.loadflag[index] = false;
          })          
        }
      },
      scrollBottom(e,index) {
        let Scroll = e.target
        // 网页可见区域高：document.body.clientHeight
        // 网页正文全文高：document.body.scrollHeight
        let scrollHeight = Scroll.scrollHeight - Scroll.clientHeight
        // self.scrollTop = Scroll.scrollTop
        if (scrollHeight - Scroll.scrollTop < 20 && !this.loadflag[index] && this.hasMore[index]) {
          // console.log(index+'到底部了')
          this.loadflag[index] = true;
          this._getPostList(index);
        }
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
      var _element = [ 
        document.getElementById('content1'),
        document.getElementById('content2'),
        document.getElementById('content3'),
        document.getElementById('content4')
      ];
      this._refreshText = [
        document.getElementById('refreshText1'),
        document.getElementById('refreshText2'),
        document.getElementById('refreshText3'),
        document.getElementById('refreshText4'),
      ];
      var _startPos = [0,0,0,0];
      var _transitionHeight = [0,0,0,0];

      for(let i=0;i<4;i++) {
        _element[i].addEventListener('touchstart', e=>{
          _startPos[i] = e.touches[0].pageY;
          _element[i].style.position = 'relative';
          _element[i].style.transition = 'transform 0s';
        }, false);

        _element[i].addEventListener('touchmove', e=>{
          _transitionHeight[i] = e.touches[0].pageY - _startPos[i];
          if (_transitionHeight[i] > 0 && _transitionHeight[i] < 30) { 
            this._refreshText[i].innerText = '下拉刷新'; 
            _element[i].style.transform = 'translateY('+_transitionHeight[i]+'px)';
            if (_transitionHeight[i] > 20) {
              this._refreshText[i].innerText = '释放更新';
            } else {
            }
          }                
        }, false);

        _element[i].addEventListener('touchend', e=>{
          if(this._refreshText[i].innerText == '释放更新') {
            _element[i].style.transition = 'transform 0.5s ease 1s';
            _element[i].style.transform = 'translateY(0px)';
            this._refreshText[i].innerText = '更新中...';
            this.currentPage[i] = 1;
            this.$set(this.postData,i,[])
            this._getPostList(i);
          }
        }, false);
      }
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
</style>