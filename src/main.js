import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload';


// 当使用flexible 所有字体大小都要设置
// import 'amfe-flexible';

import 'normalize.css/normalize.css'



Vue.use(Toast)
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.jpg')
})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()  // 添加事件总线

FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
