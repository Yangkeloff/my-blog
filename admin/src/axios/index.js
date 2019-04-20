import axios from 'axios'
import router from '../router'
import store from '../store'

const instance = axios.create()

axios.interceptors.request.use = instance.interceptors.request.use

// request拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    if(store.state.adminInfo.token){
      config.headers.Authorization = `${store.state.adminInfo.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response 
  },
  error => {
    let { response } = error 
    if(response.status == 401) {
      store.commit("adminLogout")  // token过期,清除
      router.replace({ //跳转到登录页面
          path: '/admin/login',
          query: { redirect: router.currentRoute.fullPath }
      }) 
      return Promise.reject(error.response) 
    }
  }
)

export default {
  //用户
  api_admin_reg(data){
    return instance.post('/api/admin/reg', data)
  },
  api_admin_login(data){
    return instance.post('/api/admin/login', data)
  },
  //标签
  api_get_tags(){
    return instance.get("/api/admin/tags/get");
  },
  api_add_tags(data){
    return instance.post('/api/admin/tags/add',data)
  },
  api_alter_tags(data){
    return instance.patch(`/api/admin/tags/edit/${data._id}`,data)
  },
  api_del_tags(data){
    return instance.delete(`/api/admin/tags/del/${data._id}`,data)
  },

  //文章
  api_add_article(data){
    return instance.post('/api/admin/article/add', data);
  },
}