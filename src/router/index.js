import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {path: '/about',name: 'About',component: () => import('../views/About.vue')},
  {path: '/login',name: 'Login',component: () => import('../views/login/index.vue')},
  {path: '/post',name: 'Post',component: () => import('../views/post/index.vue')},
  {path: '/post/detail',name: 'PostDetail',component: () => import('../views/post/detail.vue')},
  {path: '/post/search',name: 'PostSearch',component: () => import('../views/post/search.vue')},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
