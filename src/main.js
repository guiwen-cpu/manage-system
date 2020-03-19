import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import http from '@/api/config'
import './mock'
Vue.use(ElementUI)
Vue.prototype.$http = http
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 防止刷新后vuex里丢失token

  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token

  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
