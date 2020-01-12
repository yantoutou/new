import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'

Vue.config.productionTip = false

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
    if(sessionStorage.getItem("token") == 'true'){
      next('/manage');
    }else{
      next();
    }
  }
});

Vue.use(ElementUI)
Vue.use(less)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
