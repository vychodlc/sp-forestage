import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: {
      tip: { text: '', show: false },
      loading: { show: false },
    },
    bigImg: { url: '', show: false,},
    token: localStorage.getItem('token') ? localStorage.getItem('token'):'',
    user: {
      id: localStorage.getItem('uuid') ? localStorage.getItem('uuid'):'',
      nickname: localStorage.getItem('nickname') ? localStorage.getItem('nickname'):'',
      right: localStorage.getItem('right') ? localStorage.getItem('right'):'',
      balance: localStorage.getItem('balance') ? localStorage.getItem('balance'):'',
    },
    tags: null,
    show: {showAddr:false,addrEdit:false,addrAdd:false,},
    pay: {show: false,state: false,success: false,price: 0,id:null,order_type:null},
    address: {
      list: [],
      default: null,
      new: {name: '',phone: '',address: ''},
      edit: {name: '',phone: '',address: '',address_ID:''},
    },
    expressPrice: [13.25,15.07,18.46,20.27,23.66,24.1,27.3,27.3,33,33,35.3,35.3,36.35,36.35,39.9,39.9,43.45,43.45,47,47,50.55,50.55,54.1,54.1,57.65,57.65,61.2,61.2,64.75,64.75,68.3,68.3,71.86,71.85,75.4,75.4,78.95,78.95,82.5,82.5,86.05,86.05,89.6,89.6,93.15,93.15,96.7,96.7,100.25,100.25,103.8,103.8,107.35,107.35,110.9,110.9,114.45,114.45,118,118],
  },
  mutations: {
    showTip(state, tip) {
      state.message.tip.text = tip;
      state.message.tip.show = true;
      setTimeout(()=>{
        state.message.tip.show = false;
        state.message.tip.text = '';
      }, 2000)
    },
    showImg(state, info) {
      state.bigImg.url = info[0];
      state.bigImg.show = info[1];
    },
    showLoading(state, boolean) {
      state.message.loading.show = boolean;
    },
    setToken(state, token) {
      state.token = token
      localStorage.token = token
    },
    setUser(state, data) {
      console.log(data);
      state.user.id = data[0]
      state.user.nickname = data[1]
      state.user.right = data[2]
      state.user.balance = data[3]
      // state.user.nickname = data.nickname
      // state.user.id = data.id
      // state.user.right = data.right
    },
    setBalance(state,balance) {
      state.user.balance = balance
    },
    rmToken(state) {
      state.token = ''
      state.user.nickname = null
      state.user.id = null
      state.user.right = null
      localStorage.clear()
    },
    setTags(state,tags) {
      state.tags = tags
    },
    // changeShow(state,name) {
    //   console.log(state.show[name]);
    //   state.show[name] = !state.show[name]
    // },
    changeShow(state,info) {
      state.show[info.name] = info.value;
    },
    handlePay(state,info) {
      for (let key in info) {
        if(key=='show'){state.pay.show=info[key]}
        if(key=='state'){state.pay.state=info[key]}
        if(key=='success'){state.pay.success=info[key]}
        if(key=='price'){state.pay.price=info[key]}
        if(key=='id'){state.pay.id=info[key]}
        if(key=='order_type'){state.pay.order_type=info[key]}
      }
      console.log(state.pay.success);
    },
    handleAddress(state,info) {
      if(info.name=='updateList') {
        let data = info.value;
        let index = null;
        for(let i=0;i<data.length;i++) {
          if(data[i].default=='1') {
            index = i
          }
        }
        if(index!=null) {
          let _default = data.splice(index,1);
          if(_default.length==0) {
            state.address.default = null;
          } else {
            state.address.default = _default;
          }
          data = _default.concat(data);
        } else {
          state.address.default = null;
        }
        state.address.list = data;
      } else if(info.name=='clearNew') {
        state.address.new = {name: '',phone: '',address: ''}
      } else if(info.name=='clearEdit') {
        state.address.edit = {name: '',phone: '',address: ''}
      } else if(info.name=='updateEdit') {
        state.show.addrEdit = true;
        state.address.edit = info.value;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
