import { COUNT_INCREMENT,ADD_TO_CART,ADD_CART_ACTION } from './mutations-types'
export default {
  // 使用dispatch 对原来对任务进行了分布,对他进行了分发,要么分发countIncrement, addToCart,这样Vuex才能更好的跟踪 
  [ADD_CART_ACTION]({ state, commit }, payload) {
    return new Promise((resolve,reject)=>{
      const product = state.cartList.find(item => item.iid == payload.iid);
      if (product) {
        // product.count + =1  如果在这里进行更改将不会被跟踪
        commit(COUNT_INCREMENT, product);
        resolve('当前商品数量加1')
      } else {
        payload.count = 1;
        commit(ADD_TO_CART, payload)
        console.log('1');
        resolve('加入购物车成功')
      }
    })
  }
}