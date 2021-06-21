import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Mui from 'vue-awesome-mui';
import VueScroller  from 'vue-scroller'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$axios = axios;
Vue.use(Mui);
Vue.use(VueScroller)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
