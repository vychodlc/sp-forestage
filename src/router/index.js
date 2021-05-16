import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  // {
  //   path: '/form',name: 'Form',component: () => import('../views/form/index.vue'),
  //   children: [
  //     { path: '/form/transmit',name: 'Transmit',component: () => import('../views/form/transmit.vue')},
  //     { path: '/form/purchase',name: 'Purchase',component: () => import('../views/form/purchase.vue')},
  //     { path: '/form/bank',name: 'Bank',component: () => import('../views/form/bank.vue')},
  //   ]
  // },
  { path: '/form/transmit',name: 'Transmit',component: () => import('../views/form/transmit.vue')},
  { path: '/form/output',name: 'Output',component: () => import('../views/form/output.vue')},
  { path: '/form/purchase',name: 'Purchase',component: () => import('../views/form/purchase.vue')},
  
  { path: '/orderlist/transmit',name: 'TransmitOrderlist',component: () => import('../views/orderlist/transmit.vue')},

  { path: '/pay',name: 'Pay',component: () => import('../views/pay/index.vue') },
  { path: '/post_detail',name: 'PostDetail',component: () => import('../views/home/post_detail.vue')},
  { path: '/search',name: 'Search',component: () => import('../views/home/search.vue')},
] 

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
