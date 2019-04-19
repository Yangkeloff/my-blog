import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/admin/article'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin'),
    children: [
      {
      path: 'article',
      meta:{
        requiresAuth:true
      },
      component: () => import('@/views/Article')
      },
      {
        path: 'tags',
        meta:{
          requiresAuth:true
        },
        component: () => import('@/views/Tags')
      },
      {
        path: 'setting',
        meta:{
          requiresAuth:true
        },
        component: () => import('@/views/Setting')
      },
      {
        path: 'new',
        meta:{
          requiresAuth:true
        },
        component: () => import('@/views/New')
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  let token = store.state.adminInfo.token
  if(to.matched.some(r => r.meta.requiresAuth)) {
    if(token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  
        // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router