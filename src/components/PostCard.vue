<template>
  <div class="card" @click="goPostDetail">
    <div class="card-left">
      <div class="title">
        {{data.post_title}}
      </div>
      <div class="tags" v-if="post_tags!=null">
        <div class="tag" v-for="(item,index) in post_tags.slice(0,2)" :key="index">
          <div v-if="tags!=null&&tags[item]">
            <span style="color:red">#</span>
            {{tags[item]}}
          </div>
        </div>
      </div>
    </div>
    <div class="card-right">
      <div class="cover">
        <img :src="data.cover_img" alt="">
        <div class="menu">{{data.menu}}</div>
      </div>
      <div class="time">
        <div>{{timeShow}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTag } from "@/network/tag.js";
  export default {
    name: "PostCard",
    props: ['data'],
    data () {
      return {
        post_tags: null,
        tags: null,
      }
    },
    mounted() {
      this.post_tags = this.data.tags.split(',');      
      this.tags = this.$store.state.tags;
    },
    computed: {
      timeShow() {
        if(this.data.activity==1) {
          let now = new Date().getTime();
          let start = new Date(this.data.start_time).getTime();
          let end = new Date(this.data.end_time).getTime();
          let day = 24*60*60*1000;
          let hour = 60*60*1000;
          if(now<start) {
            let gap = start-now;
            if(gap>day) {
              return '距离开始还有' + parseInt(gap/day).toString() + '天'
            }else if(gap>hour) {
              return '距离开始还有' + parseInt(gap/hour).toString() + '小时'
            }
          }else if(now>start&&now<end) {
            let gap = end-now;
            if(gap>day) {
              return '距离结束还有' + parseInt(gap/day).toString() + '天'
            }else if(gap>hour) {
              return '距离结束还有' + parseInt(gap/hour).toString() + '小时'
            }
          }
        }
        return this.data.post_date.toString().slice(0,12) + ' by ' + this.data.author
      }  
    },
    methods:{
      goPostDetail() {
        this.$router.push({name:'PostDetail',params:{id:this.data.ID}})
      }
    },
  }
</script>

<style scoped>
  .card {
    /* width: calc(100vw - 10px * 2);
    margin: 20px 10px; */
    width: 100vw;
    height: 15vh;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
  }
  .card-left {
    width: calc(60vw - 40px);
    height: 100%;
    margin-left: 20px;
    border-bottom: 1px solid var(--color-all);
    border-bottom: 1px solid #999;
  }
  .card-left .title {
    font-size: 18px;
    padding-right: 10px;
    line-height: 25px;
    font-weight: bold;
    width: calc(60vw - 40px);
    height: 12vh;
    word-wrap:break-word;
    text-align: left;
  }
  .card-left .tags {
    line-height: 3vh;
    text-align: left;
  }
  .card-left .tags .tag {
    display: inline-block;
    padding-right:10px;
    font-weight: bold;
    background-color: var(--color-background);
    transform: translateY(50%);
  }
  .card-right {
    width: 40%;
    margin-right: 20px;
    height: 100%;
  }
  .card-right .cover {
    height: 12vh;
    position: relative;
  }
  .card-right .cover img {
    width: 100%;
    max-height: 14vh;
  }
  .card-right .time {
    text-align: left;
    padding-left: 10px;
    line-height: 3vh;
    color: #444;
    transform: translateY(50%);
  }
  .menu {
    position: absolute;
    top: 4px;
    right: 1px;
    background-color: #555;
    color: #ddd;
    padding: 1px 5px;
    border-radius: 5px;
  }
</style>