// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import { currency } from './utils/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

Vue.filter('currency', currency)
Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    nickName: '',
    cartCount: 0
  },
  mutations:{
    updateUserInfo(state, nickName){ // 更新用户信息
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount){ // 更新购物车数量
      state.cartCount += cartCount;
    },
    initCartCount(state, cartCount){ // 初始化购物车数量
      state.cartCount = cartCount;
    },
    resetCartCount(state){ // 清空购物车
      state.cartCount = 0;
    }
  }
})

Vue.use(VueLazyLoad,{
  loading: '/static/loading-svg/loading-bars.svg'
})

Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
