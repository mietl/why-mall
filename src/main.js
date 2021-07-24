import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()  // 添加事件总线


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
