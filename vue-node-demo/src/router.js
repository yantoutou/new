import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Manage from './pages/after/manage.vue'
import Order from './pages/after/order'
import Err from './pages/err'
import Manual from './pages/after/manual'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      redirect: '/manage/order',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'manual',
          name: 'manual',
          component: Manual,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      component: Err,
      meta: {
        requireAuth: true
      }
    }
  ]
})
