<template>
  <div class="search">
    <div class="close" @click="$router.go(-1)"><img src="~/assets/images/close.png" alt=""></div>
    <div class="search_box">
      <div class="input">  
        <form @submit.prevent>
          <input v-model="search" @keypress="searchGoods" type="search" placeholder="Search" @focus="editSearch">
        </form>
      </div>
      <div class="icon" v-if="search!=''" id="input_close" @click="search='',data=[],isShow = false"><img src="~/assets/images/close-filling.png" alt=""></div>
      <div class="icon"><img src="~/assets/images/search.png" @click="_searchPost" alt=""></div>
    </div>
    <div class="results_nums" v-if="data.length>0">
      共有<span>{{search_number}}</span>条搜索结果
    </div>
    <div class="results">
      <div class="result" v-for="(item,index) in data" :key="index" @click='$router.push({name:"PostDetail",params:{id:item.ID}})'>
        <div class="left">
          <div class="title">{{item.post_title}}</div>
          <div class="info">
            <span class="time">{{item.post_date}}</span>
            <span style="margin:0 5px;color: var(--color-all);font-size:30px;font-weight: bolder"> · </span>
            <span class="author">{{item.author}}</span>
          </div>
        </div>
        <div class="right">
          <img :src="item.cover_img" alt="">
        </div>
      </div>
      <div class="loadMore" style="text-align:center;margin:30px 0" v-show="isShow">
        <div class="tip" v-if="data.length==0">没有找到您想要的 ~</div>
        <div class="tip" v-if="hasMore==false&&data.length>0">没有更多啦 ~</div>
        <div class="tip" v-if="hasMore==true&&loadflag==true">往下滑还有更多资讯哦 ~</div>
        <div class="tip" v-if="hasMore==true&&loadflag==false"><img style="width:40px;height:40px" src="~/assets/images/load.gif" alt=""> ~</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { searchPost } from '@/network/post.js';

  export default {
    name: "Search",
    data () {
      return {
        search: '',
        currentPage: 1,
        hasMore: false,
        loadflag: false,
        data: [],
        search_number: null,
        isShow: false
      }
    },
    methods:{
      _searchPost() {
        if(this.search!='') {
          searchPost(this.search,this.currentPage).then(res=>{
            // console.log(res);
            if(res.data.status=='200') {
              this.hasMore = res.data.more;
              this.data = res.data.data;
              this.search_number = res.data.posts_num;
              this.isShow = true;
              // console.log(this.data);
            }
          }) 
        }
      },
      editSearch() {
        this.isShow = false;
        this.data = [];
      },
      searchGoods(event) { 
        if(event.keyCode == 13) {
          event.preventDefault();
          this._searchPost();
        }
      }
    },
    activated() {
      // this.hasMore = false;
      // this.data = [];
      // this.search_number = null;
      // this.isShow = false;
      // this.search = '';
      console.log(this.$route);
    }
  }
</script>

<style scoped>
  .search {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    padding: 0 20px;
    padding-top: 80px;
  }
  .close {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .close img {
    width: 40px;
    height: 40px;
  }
  .search_box {
    width: 100%;
    height: 60px;
    border-radius: 30px;
    border: 2px solid var(--color-all);
    display: flex;
    flex-direction: row;
  }
  .search_box .icon {
    width: 15vw;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search_box .icon img {
    width: 30px;
    height: 30px;
  }
  .search_box .input {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .search_box .input input {
    width: calc(100vw - 20px * 2 - 15vw * 2);
    height: 50px;
    font-size: 18px;
    line-height: 30px;
    caret-color: var(--color-all);
    background: none;
    border: none;
    padding-left: 30px;
  }
  .search_box .input input:focus {
    outline: none;
  }
  #input_close img {
    width: 20px;
    height: 20px;
  }

  /* 搜索内容样式 */
  .results_nums {
    margin-top: 40px;
    color: #666;
  }
  .results_nums span {
    color: var(--color-all);
    margin: 0 5px;
  }
  .results {
    width: 100%;
    height: calc(100vh - 10vh - 8vh - 100px);
    overflow-y: scroll;
    margin-top: 20px;
  }
  .result {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
  .result .left {
    width: 50vw;
    height: 10vh;
    margin-right: 5vw;
    border-top: 1px solid #aaa;
    padding: 10px 0;
    position: relative;
    color: #000;
  }
  .result .left .info {
    position: absolute;
    bottom: 0;
    display: flex;
  }
  .result .left .info span {
    line-height: 30px;
    color: #888;
  }
  .result .right {
    width: calc(100vw - 40px - 50vw - 5vw);
    max-height: 10vh;
  }
  .result .right img {
    width: 100%;
  }

  input::-webkit-search-cancel-button {
    display: none;
  }
</style>