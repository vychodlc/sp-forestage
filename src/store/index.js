import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: {
      tip: { text: '', show: false }
    }
  },
  mutations: {
    showTip(state, tip) {
      state.message.tip.text = tip;
      state.message.tip.show = true;
      setTimeout(()=>{
        state.message.tip.show = false;
        state.message.tip.text = '';
      }, 1000)
    }
  },
  actions: {
  },
  modules: {
  }
})
