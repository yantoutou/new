import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Manage from './pages/after/manage.vue'
import Order from './pages/after/order'
import Err from './pages/err'
import Log from './pages/after/log'
import Goods from './pages/after/goods'
import Work from './pages/after/work'
import Set from './pages/after/set'
import Return from './pages/after/return'
import Message from './pages/after/message'
import Sale from './pages/before/sale'
import userSet from './pages/before/set'
import myOrder from './pages/before/myOrder'
import HomePage from './pages/before/homePage'
import allOrders from './pages/before/allOrders'
import Search from './pages/before/search'
import Detail from './pages/before/detail'
import Car from './pages/before/car'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
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
      redirect: '/manage/work',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'work',
          name: 'work',
          component: Work,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'return',
          name: 'return',
          component: Return,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'message',
          name: 'message',
          component: Message,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'goods',
          name: 'goods',
          component: Goods,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'log',
          name: 'log',
          component: Log,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'homePage',
          name: 'homePage',
          component: HomePage,
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: 'order',
              name: 'allOrders',
              component: allOrders,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/set',
      name: 'set',
      component: Set,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/car',
      name: 'car',
      component: Car,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userSet',
      name: 'userSet',
      component: userSet,
      meta: {
        requireAuth: true
      }
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
