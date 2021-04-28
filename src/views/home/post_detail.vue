<template>
  <div class="post" v-if="data!=null">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <!-- <div class="title">文章详情</div> -->
      <div v-if="data.link&&data.link!=null&&data.link!=undefined&&data.link!=''" @click="goLink" class="link"><img src="~/assets/images/link.png" alt=""></div>
    </div>
    <div class="title">{{data.post_title}}</div>
    <div class="date"><span>{{data.post_date.slice(0,10)}}</span></div>
    <div class="author"><span>{{data.author}}</span></div>
    <div class="content">
      <div v-html="data.post_content">{{data.post_content}}</div>
    </div>
  </div>
</template>

<script>
  import { getPostDetail } from '@/network/post.js'
  export default {
    name: "PostDetail",
    data () {
      return {
        data: null
      }
    },
    mounted() {
      const postID = this.$route.params.id?this.$route.params.id:15
      getPostDetail(postID).then(res=>{
        if(res.data.status=='200') {
          this.data = res.data.data;
          this.data.post_content = this.data.post_content.replace(/<img/g, "<img style='width:100%;'");
          this.data.post_content = this.data.post_content.replace(/<p/g, "<p style='font-size:18px;'");
        }
      })
    },
    methods:{
      goLink() {
        this.$store.commit('showTip', '即将跳往：' + this.data.link)  
      }
    }
  }
</script>

<style scoped>
  .post {
    position: relative;
    padding: 0 20px;
  }
  .header {
    /* flex: ; */
  }
  .back, .link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e9e9e9aa;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
  }
  .back {top: 10px;left: 10px;}
  .link {top: 10px;right: 10px;}
  .header img {
    width: 30px;
    height: 30px;
  }
  .title {
    margin-top: 10vh;
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    text-align: left;
  }
  .date {
    line-height: 10px;
    text-align: right;
    margin-top: 30px;
  }
  .date span {
    font-size: 12px;
    color: 777;
    padding: 10px;
    color: #999;
    border-top: 1px solid #555;
  }
  .author {
    margin-top: 5px;
    margin-bottom: 30px;
    text-align: right;
  }
  .author span {
    font-size: 16px;
    font-weight: bold;
    color: #555;
    padding: 10px;
    border-bottom: 1px solid #555;
  }
</style>