<template>
  <div>
      <nav-header></nav-header>
      <nav-bread>
          <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a class="default cur">Default</a>
            <a class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods">
                Price
                <svg class="icon icon-arrow-short" :class="{'sort-up': !sortFlag}">
                  <use xlink:href="#icon-arrow-short"></use>
                </svg>
            </a>
            <a class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                  <a :class="{'cur': priceChecked == 'all'}" @click="setPriceFilter('all')">
                    All
                  </a>
                </dd>
                <dd v-for="(price, index) in priceFilter" :key="index">
                  <a href="javascript:void(0)" :class="{'cur': priceChecked == index}" @click="setPriceFilter(index)">
                    {{price.startPrice}} - {{price.endPrice}}
                  </a>
               </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList" :key="index">
                    <div class="pic">
                      <a>
                        <!-- <img :src="'/static/' + item.productImage"> -->
                        <img v-lazy="'/static/' + item.productImage" :key="'/static/' + item.productImage">
                      </a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a  class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                      <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 加入购物车，登录提醒模态框 -->
      <Modal :mdShow="mdShow" v-on:closeModal="closeModal">
          <p slot="message">
             请先登录,否则无法加入到购物车中!
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </Modal>
      <!-- 加入购物车成功模态框 -->
      <Modal :mdShow="mdShowCart" v-on:closeModal="closeModal">
          <p slot="message">
            <svg class="icon-status-ok">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成功!</span>
          </p>
          <div slot="btnGroup">
             <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
            <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
          </div>
      </Modal>

      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import NavBread from '../components/NavBread.vue'
import Modal from '../components/Modal.vue'
import axios from 'axios'

export default {
  name: 'GoodsList',
  data(){
    return{
      goodsList: [], // 商品列表
      sortFlag: true, // 1代表升序
      page: 1,    // 当前页码
      pageSize: 4, // 每页总数
      priceFilter:[ // 价格过滤数据
            {
                startPrice:'0.00',
                endPrice:'100.00'
            },
            {
              startPrice:'100.00',
              endPrice:'500.00'
            },
            {
              startPrice:'500.00',
              endPrice:'1000.00'
            },
            {
              startPrice:'1000.00',
              endPrice:'5000.00'
            }
      ],
      priceChecked: 'all',  // 价格选中状态
      filterBy: false, //
      overLayFlag: false, // 遮罩
      busy: true, // 默认无限滚动插件禁用
      loading:false, // loading默认隐藏
      mdShow: false, // 模态框是否显示，默认不显示
      mdShowCart:false,   // 购物车加入成功模态框是否显示，默认不显示
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  mounted: function(){
    this.getGoodsList();
  },
  methods:{
    setPriceFilter(val){ // 设置price选中状态
      this.priceChecked = val;
      this.closePop(); // 小窗口时关闭遮罩层
      this.page = 1;
      this.getGoodsList();
    },
    showFilterPop(){  // 点击显示价格框
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop(){ // 关闭遮罩层
      this.filterBy = false;
      this.overLayFlag = false;
    },
    getGoodsList(loadMoreFlag){
      let that = this;
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.loading = true;
      axios.get('/goods/list',{
        params: params
      })
        .then(function(res){
            that.loading = false;

            var resData = res.data;
            if(resData.status == '0'){
              if(loadMoreFlag){
                  that.goodsList = [...that.goodsList,...resData.result.list];
                  if(resData.result.count < that.pageSize){  // 没有更多时禁用滚动加载更多
                      that.busy = true;
                  }else{
                      that.busy = false;
                  }
              }else{
                  that.goodsList = resData.result.list;
                  that.busy = false;
              }
            }else{
                that.goodsList = [];
            }
        })
    },
    sortGoods(){ // 排序商品
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    loadMore(){ // 加载更多
        this.busy = true; //禁止再次滚动
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500)
    },
    addCart(productId){  // 加入购物车
      axios.post("/goods/addCart", {
        productId: productId
      }).then((res) => {
        var resData = res.data;
        if(resData.status == 0){
          // alert('加入成功');
          this.mdShowCart = true;
          this.$store.commit('updateCartCount', 1);
        }else{
          // alert(resData.msg);
          this.mdShow = true;
        }
      })
    },
    closeModal(){ // 关闭模态框
        this.mdShow = false;
        this.mdShowCart = false;
    },
  }
}
</script>
