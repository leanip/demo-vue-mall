// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Swipe, SwipeItem, Lazyload,
  List, Field, NavBar, Tab, Tabs, PullRefresh } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)
  .use(Lazyload).use(List).use(Field).use(NavBar).use(Tab)
  .use(Tabs).use(PullRefresh)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 设置字体大小
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
let htmlDOM = document.getElementsByTagName('html')[0]

if (htmlWidth > 750) {
  htmlWidth = 750
}
htmlDOM.style.fontSize = htmlWidth / 20 + 'px'
