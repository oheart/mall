import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {  // 动态路由
      path: '/goods/',
      name: 'GoodsList',
      component: GoodsList,
      children:[    // goods下面的子路由
          {
              path: 'title',
              name: 'title',
              component: Title
          },
          {
            path: 'img',
            name: 'img',
            component: Image
          }
      ]
    },
    {
        path: '/cart',
        component: Cart
    }
  ]
})
