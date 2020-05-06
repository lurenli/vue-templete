import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/index'
// import List from '@/views/list'
// vue异步组件 vue-router配置路由 , 使用vue的异步组件实现按需加载
const Index = resolve => require(['@/views/index'], resolve)
const List = resolve => require(['@/views/list'], resolve)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
      // resolve => require(['@/views/index'],resolve) 
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: {
        requiresAuth:true
      }
    }
  ]
})


// router.beforeEach((to, from, next) => {
//   //判断是否需要登陆验证
//   if (to.meta.requiresAuth) {
//     if (localStorage.loginStatus) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         } //把要跳转的地址作为参数传到下一步
//       })
//     }
//   } else {
//     if (localStorage.loginStatus) {
//       //判断登陆和注册 跳到首页
//       if (to.path == '/login' || to.path == '/register') {
//         router.replace({
//           path: '/'
//         })
//       } else {
//         next() // 确保一定要调用 next()
//       }
//     } else {
//       next() // 确保一定要调用 next()
//     }
//   }
// })

export default router
