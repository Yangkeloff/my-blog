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
          path: '/login',
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
  api_get_article_list(data){
    return instance.get(`/api/admin/article/list?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`)
  },
  // 文章修改
  api_alter_article(data){
    return instance.patch(`/api/admin/article/edit/${data._id}`, data)
  },
  // 通过文章id来获取文章
  api_get_article(id){
    return instance.get(`/api/admin/article/get/${id}`);
  },
  api_del_article(id){
    return instance.delete(`/api/admin/article/del/${id}`);
  },

  //设置
  // 获取全局设置
  api_get_setting(){
    return instance.get('/api/admin/setting/get');
  },
  // 修改全局设置
  api_alter_setting(data){
    return instance.patch('/api/admin/setting/edit', data);
  },
  api_alter_admin(data) {
    return instance.patch('/api/admin/edit', data);
  },
}