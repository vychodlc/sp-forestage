<template>
  <div class="agency">
    <div class="header">
      <div class="back" @click="$router.go(-1)"><img src="~/assets/images/arrow-left-bold.png" alt=""></div>
      <div class="title">银行卡申请</div>
    </div>
    <div class="formbox" v-if="submitOk==false">
      <div class="formItem">
        <div class="name">地址</div>
        <input type="text" id="storage_link" v-model="newItem.addr">
      </div>
      <div class="formItem">
        <div class="name">图片</div>
        <input type="file" ref="uploadImg" accept="image/*" multiple="multiple" @change="uploadImg" style="display:none">
        <div class="uploadBtn" @click="$refs.uploadImg.click()">+</div>
        <div class="uploadList" v-if="$refs.uploadImg">
          <div v-for="(item,index) in uploadList" :key="index" class="uploadListItem">
            <!-- <img src="https://img1.baidu.com/it/u=2869661283,3188552792&fm=26&fmt=auto&gp=0.jpg" alt=""> -->
            <span style="margin-left:20px">{{item.name}}</span>
            <span style="position:absolute;right:20px" @click="delImg(index)">×</span>
          </div>
        </div>
      </div>
    </div>
    <div class="formbox" v-else>
      <div class="resultBox" v-if="applyOk">
        <div class="icon" style="background-color:var(--color-all)">✓</div>
        <div class="text">
          银行卡申请成功
        </div>
      </div>
      <div class="resultBox" v-else>
        <div class="icon" style="background-color:#fedb00">!</div>
        <div class="text">
          银行卡申请失败
        </div>
        <div class="text">{{errorText}}</div>
      </div>
    </div>
    <div class="footer">
      <div class="btnbox">
        <div class="btn" v-if="submitOk==false" @click="submit()">下一步</div>
        <div class="btn" v-else @click="$router.go(-1)">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { addBankcardApply } from '@/network/bankcard.js'
  import { addImg } from '@/network/transship.js'
  export default {
    name: "Agency",
    data () {
      return {
        kind: this.$route.params.name?this.$route.params.name:'Nike',
        brand: '',
        newItem: {
          addr: '',
          pic: []
        },
        loading: false,
        submitOk: false,
        uploadList: [],
        errorText: '',
      }
    },
    methods:{
      submit() {
        if(this.newItem.addr=='') {
          this.$store.commit('showTip','请填写地址')
        } else if(this.uploadList.length==0) {
          this.$store.commit('showTip','请上传图片')
        } else {
          let imgNum = this.uploadList.length;
          this.uploadList.map(file=>{
            let fileName = new Date().getTime() + '-' +file.name;
            let uploadFile = new File([file], fileName, {type: file.type});
            addImg(uploadFile).then(res=>{
              imgNum-=1;
              if(res.data.status=='201') {
                this.newItem.pic.push(res.data.img_url)
                if(imgNum==0) {
                  addBankcardApply(this.newItem).then(res=>{
                    if(res.data.status=='200') {
                      this.submitOk = true;
                      this.applyOk = true;
                    } else {
                      this.submitOk = true;
                      this.errorText = res.data.msg;
                      this.applyOk = false
                    }
                  })        
                }
              }
            })
          })  
        }
      },
      uploadImg(e) {
        for(let item of this.$refs.uploadImg.files) {
          this.uploadList.push(item)
        }
      },
      delImg(index) {
        this.uploadList.splice(index,1);
      },
      
    },
    activated() {
      this.newItem = {
        addr: '',
        pic: []
      };
      this.applyOk = false;
      this.submitOk = false;
      this.uploadList = [];
      this.$store.commit('showLoading',false);
    }
  }
</script>

<style scoped>
  .agency {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .header {
    z-index: 1000;
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
  .header img {
    width: 30px;
    height: 30px;
  }
  .header .title {
    font-size: 24px;
    text-align: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .formbox {
    width: 100vw;
    height: calc(100vh - 60px - 80px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }

  .formbox .formItem {
    font-size: 16px;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px 5px;
    border-radius: 10px;
  }
  .formbox .formItem .name {
    width: 80px;
    font-size: 16px;
    display: inline-block;
    padding-right: 10px;
    /* border: 1px solid #9d9; */
    text-align: right;
    color: #999;
  }
  .formbox .formItem input[type="text"] {
    font-size: 14px;
    width: calc(100vw - 40px - 80px - 10px);
    background: none;
    border: none;
    border-bottom: 1px solid #999;
    outline: none;
    padding: 2px 10px;
  }
  .formbox .formItem input:focus {
    border-bottom: 1px solid var(--color-all);
  }
  .formItem .inputBox {
    display: inline-block;
    width: calc(100vw - 40px - 80px - 10px);
  }
  .formItem .inputBox .inputContent {
    width: 100%;
    display: flex;
    flex-flow: wrap;
  }
  .inputContent .checkboxItem {
    width: 12vw;
  }
  .inputContent .checkboxItem .checkboxContent {
    background-color:#f0f1f2;
    color:#777;
    width:10vw;
    border-radius:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    font-size: 12px;
  }
  .inputContent .checkboxItem .checkboxContentActive {
    background-color:#d5ebe7;
    color: var(--color-all);
    width:10vw;
    border-radius:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    font-size: 12px;
  }
  .formItem .inputBox #giftcardBox,
  .formItem .inputBox #discountBox,
  .formItem .inputBox #accountBox {
    /* justify-content: space-around; */
  }

  .formItem .inputBox .inputContent .radioItem {
    background-color:#f0f1f2;
    color:#777;
    padding: 2px 5px;
    border-radius:5px;
    height:22px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    margin-left: 10px;
    font-size: 12px;
  }
  .formItem .inputBox .inputContent .radioItemActive {
    background-color:#d5ebe7;
    color: var(--color-all);
    padding: 2px 5px;
    border-radius:5px;
    height:22px;
    line-height:20px;
    text-align:center;
    margin-bottom:5px;
    margin-left: 10px;
    font-size: 12px;
  }

  .giftcardTable {
    width: calc(100vw - 40px - 80px - 10px);
    max-height: 100px;
    overflow-y: scroll;
    /* border-top: 1px dotted #999; */
    /* border-bottom: 1px dotted #999; */
    padding: 5px 0;
  }
  .giftcardTable thead tr th {
    padding: 10px 0;
  }
  .giftcardTable tbody {
    text-align: center;
  }

  .footer {
    width: 100vw;
    height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    /* border: 1px solid #000; */
    display: flex;
    flex-direction: row;
  }
  .footer .btnbox {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer .btn {
    width: 35vw;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  .footer .btnbox:first-child .btn {
    border: 1px solid var(--color-all);
    color: var(--color-all);
  }
  .footer .btnbox:last-child .btn {
    background-color: var(--color-all);
    color: #fff;
  }

  .uploadBtn {
    font-size: 80px;
    width: 80px;
    height: 80px;
    color: var(--color-all);
    border-radius: 10px;
    border: 3px solid var(--color-all);
    text-align: center;
    line-height: 80px;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .uploadList {
    max-height: 400px;
    overflow-y: scroll;
  }
  .uploadList .uploadListItem {
    position: relative;
    margin-top: 10px;
    /* width: 100%;
    height: 60px;
    border: 1px solid var(--color-all);
    border-radius: 10px;
    margin-top: 10px; */
  }
  .uploadListItem span {
    font-size: 16px;
  }

  
  .formbox .resultBox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50%;
  }
  .formbox .resultBox .icon {
    height: 100px;
    width: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    margin-top: 50px;
    background-color: #999;
    border-radius: 50%;
    font-size: 80px;
    font-weight: bolder;
  }
  .formbox .resultBox .text {
    font-size: 18px;

  }
</style>