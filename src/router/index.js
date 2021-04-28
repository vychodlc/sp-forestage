import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Root',redirect: '/login'},
  { path: '/login',name: 'Login',component: () => import('../views/login/index.vue') },
  {
    path: '/home',name: 'Home',component: () => import('../views/home/index.vue'),
    children: [
      { path: '/',name: 'Post',component: () => import('../views/home/post.vue')},
      { path: '/application',name: 'Application',component: () => import('../views/home/application.vue')},
      { path: '/my',name: 'My',component: () => import('../views/home/my.vue')},
    ]
  },
  {
    path: '/form',name: 'Form',component: () => import('../views/form/index.vue'),
    children: [
      { path: '/transmit',name: 'Transmit',component: () => import('../views/form/transmit.vue')},
      { path: '/purchase',name: 'Purchase',component: () => import('../views/form/purchase.vue')},
      { path: '/bank',name: 'Bank',component: () => import('../views/form/bank.vue')},
    ]
  },
  { path: '/pay',name: 'Pay',component: () => import('../views/pay/index.vue') },
  { path: '/post_detail',name: 'PostDetail',component: () => import('../views/home/post_detail.vue')},
  { path: '/search',name: 'Search',component: () => import('../views/home/search.vue')},
] 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
