import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// const originalPush = VueRouter.prototype.push
// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }
// VueRouter.prototype.replace = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//     return originalReplace.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Root',redirect: '/login'},
  { path: '/login',name: 'Login',component: () => import('../views/login/index.vue') },
  {
    path: '/home',name: 'Home',redirect: '/post',component: () => import('../views/home/index.vue'),
    children: [
      { path: '/post',name: 'Post',component: () => import('../views/home/post.vue')},
      { path: '/application',name: 'Application',component: () => import('../views/home/application.vue')},
      { path: '/my',name: 'My',component: () => import('../views/home/my.vue')},
    ]
  },
  { path: '/form/transmit',name: 'Transmit',component: () => import('../views/form/transmit.vue')},
  { path: '/form/output',name: 'Output',component: () => import('../views/form/output.vue')},
  { path: '/form/outputtax',name: 'Outputtax',component: () => import('../views/form/outputtax.vue')},
  { path: '/form/agency',name: 'Agency',component: () => import('../views/form/agency.vue')},
  { path: '/form/query',name: 'Query',component: () => import('../views/form/query.vue')},
  { path: '/form/bankcard',name: 'Bankcard',component: () => import('../views/form/bankcard.vue')},
  { path: '/form/withdrawl',name: 'Withdrawl',component: () => import('../views/form/withdrawl.vue')},
  
  { path: '/orderlist/transmit',name: 'TransmitOrderlist',component: () => import('../views/orderlist/transmit.vue')},
  { path: '/orderlist/storage',name: 'StorageOrderlist',component: () => import('../views/orderlist/storage.vue')},
  { path: '/orderlist/output',name: 'OutputOrderlist',component: () => import('../views/orderlist/output.vue')},
  { path: '/orderlist/agency',name: 'AgencyOrderlist',component: () => import('../views/orderlist/agency.vue')},

  { path: '/pay',name: 'Pay',component: () => import('../views/pay/index.vue') },
  { path: '/post_detail',name: 'PostDetail',component: () => import('../views/home/post_detail.vue')},
  { path: '/search',name: 'Search',component: () => import('../views/home/search.vue')},
  { path: '/payment',name: 'Payment',component: () => import('../views/pay/detail.vue') },
] 

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
