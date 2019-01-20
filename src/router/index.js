import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/child',
      component: Layout,
      name: '首页',
      meta: {name: '首页'},
      children: [
        {
          path: 'child',
          alias: '',
          component: () => import('@/views/B01/index'),
          name: '首页' + +new Date(),
          meta: {name: '首页'}
        }
      ]
    },
    {
      path: '/questions',
      redirect: '/questions/child',
      component: Layout,
      name: '问答',
      meta: {name: '问答'},
      children: [
        {
          path: 'child',
          alias: '/questions',
          component: () => import('@/views/B02/index'),
          name: '问答' + +new Date(),
          meta: {name: '问答'}
        }
      ]
    },
    {
      path: '/blogs',
      redirect: '/blogs/child',
      component: Layout,
      name: '专栏',
      meta: {name: '专栏'},
      children: [
        {
          path: 'child',
          alias: '/blogs',
          component: () => import('@/views/B03/index'),
          name: '专栏' + +new Date(),
          meta: {name: '专栏'}
        }
      ]
    },
    {
      path: '/lives',
      redirect: '/lives/child',
      component: Layout,
      name: '讲堂',
      meta: {name: '讲堂'},
      children: [
        {
          path: 'child',
          alias: '/lives',
          component: () => import('@/views/B04/index'),
          name: '讲堂' + +new Date(),
          meta: {name: '讲堂'}
        }
      ]
    },
    {
      path: '/found',
      redirect: '/found/circle',
      component: Layout,
      name: '发现',
      meta: {name: '发现'},
      children: [
        {
          path: 'circle',
          alias: '/circle',
          component: () => import('@/views/B05/circle/index'),
          name: '圈子' + +new Date(),
          meta: {name: '圈子'}
        },
        {
          path: 'activity',
          alias: '/activity',
          component: () => import('@/views/B05/activity/index'),
          name: '活动' + +new Date(),
          meta: {name: '活动'}
        },
        {
          path: 'tags',
          alias: '/tags',
          component: () => import('@/views/B05/tags/index'),
          name: '标签' + +new Date(),
          meta: {name: '标签'}
        }
      ]
    }
  ]
})
