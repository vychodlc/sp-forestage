import axios from 'axios'
import router from '../router'
import store from '../store'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://api.bupt404.cn/sp/',
    baseURL: 'http://api.bupt404.cn/v1/',
    // baseURL: '/api',
    timeout: 20000
  })

  instance.interceptors.request.use((config) => {
    if(store.state.token){
      // let outOFdateToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzbWFydHB1cmNoYXNlIiwiaWF0IjoxNjE5MTc4MzI2LCJleHAiOjE2MTkxNzgzNDYsIm5iZiI6MTYxOTE3ODMyNiwic3ViIjoiOTgzMzM4MjQzODcxMjExNTIiLCJqdGkiOiI2NzhhMTUzMGU0NzZmMDRmOTI4NDZjMGZiMzM2M2YyNyJ9.BPUITb8YX_ZE7ioOGsM9Kmz99hsAGc5ApRLMwegLjc4'
      config.headers.common['Authorization'] = 'Bearer ' + store.state.token
      // config.headers.common['Authorization'] = 'Bearer ' + outOFdateToken
    }
    return config;
  }, err => {
    return Promise.reject(err);
  })

  instance.interceptors.response.use(res => {
    if(res.data.status=='401'||res.data.status=='408') {
      localStorage.clear();
      if(router.currentRoute.fullPath!='/login') {
        router.replace({
          path: '/login',
        })
      }
    }
    return res
  }, err => {
    if(err){
      switch(err.status){
        case "401":
          localStorage.clear();
          if(router.currentRoute.fullPath!='/login') {
            router.replace({
              path: '/login',
            })
          }
      }
    }
  })

  return instance(config)
}