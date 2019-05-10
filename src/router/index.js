import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

Vue.use(Router)

export const routes = [
  {
    path: '',
    component: Layout,
    redirect: '/',
    name: '首页',
    meta: { title: '首页', isMenu: true },
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index'),
        name: '首页' + +new Date(),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/questions',
    redirect: '/questions/child',
    component: Layout,
    name: '问答',
    meta: { title: '问答', isMenu: true },
    children: [
      {
        path: 'child',
        alias: '/questions',
        component: () => import('@/views/questions/index'),
        name: '问答' + +new Date(),
        meta: { title: '问答' }
      }
    ]
  },
  {
    path: '/columns',
    redirect: '/columns/child',
    component: Layout,
    name: '专栏',
    meta: { title: '专栏', isMenu: true },
    children: [
      {
        path: 'child',
        alias: '/columns',
        component: () => import('@/views/columns/index'),
        name: '专栏' + +new Date(),
        meta: { title: '专栏' }
      }
    ]
  },
  {
    path: '/lives',
    redirect: '/lives/child',
    component: Layout,
    name: '讲堂',
    meta: { title: '讲堂', isMenu: true },
    children: [
      {
        path: 'child',
        alias: '/lives',
        component: () => import('@/views/lives/index'),
        name: '讲堂' + +new Date(),
        meta: { title: '讲堂' }
      }
    ]
  },
  {
    path: '/found',
    redirect: '/found/circle',
    component: Layout,
    name: '发现',
    meta: { title: '发现', isMenu: true },
    children: [
      {
        path: 'circle',
        alias: '/circle',
        component: () => import('@/views/found/circle/index'),
        name: '圈子' + +new Date(),
        meta: { title: '圈子' }
      },
      {
        path: 'activity',
        alias: '/activity',
        component: () => import('@/views/found/activity/index'),
        name: '活动' + +new Date(),
        meta: { title: '活动' }
      },
      {
        path: 'tags',
        alias: '/tags',
        component: () => import('@/views/found/tags/index'),
        name: '标签' + +new Date(),
        meta: { title: '标签' }
      }
    ]
  },
  {
    path: '/search',
    redirect: '/search/child',
    component: Layout,
    name: '搜索',
    meta: { title: '搜索' },
    children: [
      {
        path: 'child',
        alias: '/search',
        component: () => import('@/views/search/index'),
        name: '搜索' + +new Date(),
        meta: { title: '搜索' }
      }
    ]
  },
  {
    path: '/write',
    component: () => import('@/views/write/index'),
    name: '写文章' + +new Date(),
    meta: { title: '写文章' }
  },
  {
    path: '/draft',
    redirect: '/draft/child',
    component: Layout,
    name: '草稿',
    meta: { title: '草稿' },
    children: [
      {
        path: 'child',
        alias: '/draft',
        component: () => import('@/views/draft/index'),
        name: '草稿' + +new Date(),
        meta: { title: '草稿' }
      }
    ]
  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    meta: { title: '401', icon: '' },
    component: () => import('@/views/errorPage/401')
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    meta: { title: '404', icon: '' },
    component: () => import('@/views/errorPage/404')
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
