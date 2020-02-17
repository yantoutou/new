import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import './assets/iconfont/iconfont.css'
import moment from 'moment'
import echarts from 'echarts'
import  'echarts/theme/macarons.js'

Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
});

Vue.use(ElementUI)
Vue.use(less)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
