import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {  // 动态路由
      path: '/goods/:goodsId/user/:name',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
