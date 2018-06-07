<template>
  <div>
    <hea-top signin-up="msite">
      <router-link :to="'search/geohash'" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </hea-top>
    <nav class="msite_nav aswiper-box" ref="swiperBox">
      <swiper v-if="foodTypes.length" :options="swiperOption" ref="mySwiper">
          <swiper-slide  v-for="(item, index) in foodTypes" :key="index" class="food_types_container" @mouseenter.native="stopPlay" @mouseleave.native="play">
              <router-link :to="{path: '/food', query: {geohash, title: item.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="(foodItem, index) in item" :key="index" class="link_to_food">
                <figure>
                  <img :src="imgBaseUrl + foodItem.image_url" alt=""/>
                  <figcaption>{{foodItem.title}}</figcaption>
                </figure>
              </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
    <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import heaTop from 'components/header/head'
import footGuide from 'components/footer/footGuide'
import {cityGuess, msiteFoodTypes, msiteAddress} from '../../service/getData'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import shopList from 'components/common/shoplist'


export default {
  data() {
    return {
      msiteTitle: '请选择地址...', // msite页面头部标题
      geohash: '', // 地址经纬值
      foodTypes: [], // msite页面食品分类列表
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
      swiperOption: {
        notNextTick: true,
        // autoplay: 3000,
        // loop: true,
        // autoplayDisableOnInteraction: true,
        // direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationType: 'bullets',
        paginationClickable: true,
        // observeParents: true
      }
    }
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + ',' + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    // 记录当前经度纬度
    this.RECORD_ADDRESS(res);

    this.hasGetData = true;
  },
  components: {
    heaTop,
    footGuide,
    shopList,
    swiper,
    swiperSlide
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS',
      'SAVE_GEOHASH'
    ]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url){
      let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      }else{
        return ''
      }
    },
    stopPlay() {
      this.mySwiper.stopAutoplay()
    },
    paly () {
      this.mySwiper.startAutoplay()
    }
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    msiteFoodTypes(this.geohash).then(res => {
      let resArr = [...res];
      let fooArr = [];
      for (let i = 0, j = 0, length = res.length; i < length; i += 8, j++) {
        fooArr[j] = resArr.splice(0, 8);
      }
      this.foodTypes = fooArr;
    })
  }
}
</script>

<style lang="less" scoped>
  @import '../../style/mixin';
  .link_search{
		left: .8rem;
		.wh(.9rem, .9rem);
		.ct;
	}
	.msite_title{
		.center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            .sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid @bc;
		height: 10.6rem;
		// .swiper-container{
		// 	.wh(100%, auto);
		// 	padding-bottom: 0.6rem;
		// 	.swiper-pagination{
		// 		bottom: 0.2rem;
		// 	}
		// }
		.fl_back{
			.wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			.fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					.wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					.sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid @bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				.wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				.font(0.55rem, 1.6rem);
			}
		}
	}
</style>

