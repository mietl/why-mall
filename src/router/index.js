import Vue from 'vue';

import VueRouter from 'vue-router';


const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
 

// 解决重复点击
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}



const Home = ()=> import("views/home/Home")
const Category = ()=> import("views/category/Category")
const Cart = ()=> import("views/cart/Cart")
const Profile = ()=> import("views/profile/Profile")
const Detail = ()=> import("views/detail/Detail")


// 1. 安装插件
Vue.use(VueRouter);


// 配置路由映射关系
const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/category',
    component:Category,
  }
  ,{
    path:'/cart',
    component:Cart,
  },
  {
    path:'/profile',
    component:Profile,
  },
  {
    path:'/detail/:id',
    component:Detail
  }
]

// 2. 创建router 
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router;