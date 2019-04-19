import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/admin/article'
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

export default router