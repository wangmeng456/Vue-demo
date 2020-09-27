import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const constantRoutes = [
  {
    path: '/login',
    component: () => import('../components/HelloWorld'),
    hidden: true
  },
  // {
    // path: '',
    // component: Layout,
    // redirect: '/',
    // children: [
      // {
      //   path: '/',
      //   component: () => import('@/views/index.vue'),
      //   name: '首页',
      // },
      // {
      //   path: '/partner/system/index',
      //   component: () => import('@/views/partner/system/index.vue'),
      //   name: '合作伙伴体系',
      //   meta: {
      //     title: '合作伙伴体系',
      //     icon: 'dashboard',
      //     noCache: true,
      //     affix: true,
      //   },
      // },
      // {
      //   path: 'demandSquare',
      //   component: () => import('@/views/demandSquare'),
      //   name: '需求广场',
      // },
    // ],
  // },
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    name: '首页',
  },
  {
    path: '/tabModule',
    component: () => import('@/views/tabModule/index.vue'),
    name: '滚动吸顶',
  },
  {
    path: '/drawPreview',
    component: () => import('@/views/drawPreview/index.vue'),
    name: '缩略图预览'
  },
  {
    path: '/logins',
    component: () => import('@/views/login/index.vue'),
    name: '登陆'
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
