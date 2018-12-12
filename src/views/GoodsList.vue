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
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                  <a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="setPriceFilter('all')">
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
                      <a href="#">
                        <!-- <img :src="'/static/' + item.prodcutImg"> -->
                         <img v-lazy="'/static/' + item.productImage">
                      </a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import NavBread from '../components/NavBread.vue'
import axios from 'axios'

export default {
  name: 'GoodsList',
  data(){
    return{
      goodsList: [], // 商品列表
      priceFilter:[ // 价格过滤数据
        {
          startPrice: '0.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
         {
          startPrice: '1000.00',
          endPrice: '2000.00'
        }
      ],
      priceChecked: 'all',  // 价格选中状态
      filterBy: false, //
      overLayFlag: false, // 遮罩
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread
  },
  mounted: function(){
    this.getGoodsList();
  },
  methods:{
    setPriceFilter(val){ // 设置price选中状态
      this.priceChecked = val;
      this.closePop();
    },
    showFilterPop(){  // 点击显示价格框
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop(){ // 关闭遮罩层
      this.filterBy = false;
      this.overLayFlag = false;
    },
    getGoodsList(){
      let that = this;
      axios.get('/goods')
        .then(function(res){
            console.log('res', res)
            var resData = res.data;
            if(resData.status == '0'){
                that.goodsList = resData.result.list;
            }else{
                that.goodsList = [];
            }
        })
    }
  }
}
</script>
