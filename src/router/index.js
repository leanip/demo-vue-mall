import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/pages/ShoppingMall'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Goods from '@/pages/Goods'
import CategoryList from '@/pages/CategoryList'
import Cart from '@/pages/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'ShoppingMall', component: ShoppingMall },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/goods', name: 'Goods', component: Goods },
    { path: '/categorylist', name: 'CategoryList', component: CategoryList },
    { path: '/cart', name: 'Cart', component: Cart}
  ]
})
