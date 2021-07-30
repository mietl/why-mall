import Toast from './Toast';

export default {
  install(Vue){
    // 1. 创建组件构造器
    let ToastC= Vue.extend(Toast)
    // 2. 创建构造器实例并挂
    let toast = new ToastC().$mount();
    // 3. 添加到文档中
    document.body.appendChild(toast.$el)
    // 4. Vue原型上添加这个实例
    Vue.prototype.$toast = toast;;
  }
};