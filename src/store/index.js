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
      id: null,
      nickname: null,
      right: null
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
    setUser(state, id, nickname, right) {
      state.user.nickname = nickname
      state.user.id = id
      state.user.right = right
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
