import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: {
      tip: { text: '', show: false },
      loading: { show: false },
    },
    token: localStorage.getItem('token') ? localStorage.getItem('token'):'',
    user: {
      id: localStorage.getItem('id') ? localStorage.getItem('id'):'',
      nickname: localStorage.getItem('nickname') ? localStorage.getItem('nickname'):'',
      right: localStorage.getItem('right') ? localStorage.getItem('right'):'',
    },
    tags: null,
  },
  mutations: {
    showTip(state, tip) {
      state.message.tip.text = tip;
      state.message.tip.show = true;
      setTimeout(()=>{
        state.message.tip.show = false;
        state.message.tip.text = '';
      }, 1000)
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
      state.user.nickname = data[1]
      state.user.id = data[0]
      state.user.right = data[2]
      // state.user.nickname = data.nickname
      // state.user.id = data.id
      // state.user.right = data.right
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
    }
  },
  actions: {
  },
  modules: {
  }
})
