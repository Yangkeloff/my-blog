import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/article-list'
  },{
    path: '/',
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'article-list',
        name: 'home',
        component: () => import('@/views/ArticleList')
      },{
        path: 'article/:id',
        name: 'article',
        component: () => import('@/views/ArticlePage')
      },{
        path: 'works',
        name: 'production',
        component: () => import('@/views/Works')
      },{
        path: 'archives',
        name: 'archives',
        component: () => import('@/views/Archives')
      },{
        path: 'about',
        name: 'about',
        component: () => import('@/views/About')
      }
    ]
  },{
    path: '*',
    name: '404',
    component: () => require('@/views/Page_404')
  }
]

const router = new Router({
  mode: 'history',
  routes
})
export default router