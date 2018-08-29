<template>
  <div class="profile_page">
    <hea-top go-back='true' head-title="订单列表"></hea-top>
    <ul v-load-more="loaderMore" class="order_list_ul">
      <li v-for="item in orderList" :key="item.id" class="order_list_li">
        <img :src="imgBaseURl + item.restaurant_image_url" class="rstaurant_image">
        <section class="order_item_right">
          <section @click="showDetail(item)">
            <header class="order_item_right_header">
              <div class="order_header">
                <h4>
                  <span class="ellipsis">{{item.restaurant_name}} </span>
                  <svg fill="#333" class="arrow_right">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </h4>
                <p class="order_time">{{item.formatted_created_at}}</p>
              </div>
              <p class="order_status">{{item.status_bar.title}}</p>
            </header>
            <section class="order_basket">
                <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : ''}}</p>
                <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
            </section>
          </section>
          <div class="order_again">
              <compute-time v-if="item.status_bar.title == '等待支付'" :time="item.time_pass"></compute-time>
              <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again" v-else>再来一单</router-link>
          </div>
        </section>
      </li>
    </ul>
    <div id="taobao-best">
      <!-- Swiper -->
      <swiper class="swiper-container show-swiper" :options="swiperOption2" ref="mySwiper1">
          <swiper-slide class="swiper-slide">
            <div class="goods">
              <router-link to="/">
                <div class="c-top">
                  <div class="date">
                    <div class="year">2017.12</div>
                    <div class="day">15</div>
                    <div class="oldyear">丁酉年</div>
                    <div class="oldday">十月廿八</div>
                  </div>
                  <div class="img"><img src="../../images/001.jpg" width="100%"><span>「宜一器两用」</span></div>
                </div>
                <div class="detail">
                  <h2>好物推荐：多功能导热奶油刀</h2>
                  <p>一把可以切水果、涂抹果酱的多功能刀具让你的生活从此变得简单</p>
                  <ul><li>一物多用</li><li>迅速导热</li></ul>
                  <div class="btn">查看详情</div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <div class="goods">
              <router-link to="/">
                <div class="c-top">
                  <div class="date">
                    <div class="year">2017.12</div>
                    <div class="day">15</div>
                    <div class="oldyear">丁酉年</div>
                    <div class="oldday">十月廿八</div>
                  </div>
                  <div class="img"><img src="../../images/002.jpg" width="100%"><span>「宜一器两用」</span></div>
                </div>
                <div class="detail">
                  <h2>好物推荐：多功能导热奶油刀</h2>
                  <p>一把可以切水果、涂抹果酱的多功能刀具让你的生活从此变得简单</p>
                  <ul><li>一物多用</li><li>迅速导热</li></ul>
                  <div class="btn">查看详情</div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <div class="goods">
              <router-link to="/">
                <div class="c-top">
                  <div class="date">
                    <div class="year">2017.12</div>
                    <div class="day">15</div>
                    <div class="oldyear">丁酉年</div>
                    <div class="oldday">十月廿八</div>
                  </div>
                  <div class="img"><img src="../../images/003.jpg" width="100%"><span>「宜一器两用」</span></div>
                </div>
                <div class="detail">
                  <h2>好物推荐：多功能导热奶油刀</h2>
                  <p>一把可以切水果、涂抹果酱的多功能刀具让你的生活从此变得简单</p>
                  <ul><li>一物多用</li><li>迅速导热</li></ul>
                  <div class="btn">查看详情</div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <div class="goods">
              <router-link to="/">
                <div class="c-top">
                  <div class="date">
                    <div class="year">2017.12</div>
                    <div class="day">15</div>
                    <div class="oldyear">丁酉年</div>
                    <div class="oldday">十月廿八</div>
                  </div>
                  <div class="img"><img src="../../images/004.jpg" width="100%"><span>「宜一器两用」</span></div>
                </div>
                <div class="detail">
                  <h2>好物推荐：多功能导热奶油刀</h2>
                  <p>一把可以切水果、涂抹果酱的多功能刀具让你的生活从此变得简单</p>
                  <ul><li>一物多用</li><li>迅速导热</li></ul>
                  <div class="btn">查看详情</div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <div class="goods">
              <router-link to="#">
                <div class="c-top">
                  <div class="date">
                    <div class="year">2017.12</div>
                    <div class="day">15</div>
                    <div class="oldyear">丁酉年</div>
                    <div class="oldday">十月廿八</div>
                  </div>
                  <div class="img"><img src="../../images/005.jpg" width="100%"><span>「宜一器两用」</span></div>
                </div>
                <div class="detail">
                  <h2>好物推荐：多功能导热奶油刀</h2>
                  <p>一把可以切水果、涂抹果酱的多功能刀具让你的生活从此变得简单</p>
                  <ul><li>一物多用</li><li>迅速导热</li></ul>
                  <div class="btn">查看详情</div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-slide last-slide">
            <span class="icon"></span>
            <p class="text">右滑查看更多</p>
          </swiper-slide>
      </swiper>

      <div class="mask"></div>
      <swiper class="swiper-container bg-swiper swiper-no-swiping" :options="swiperOption1" ref="mySwiper2">
          <swiper-slide class="swiper-slide"><img src="../../images/blur001.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../../images/blur002.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../../images/blur003.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../../images/blur004.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../../images/blur005.jpg"></swiper-slide>
      </swiper>
    </div>
    <foot-guide></foot-guide>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import heaTop from 'components/header/head'
  import footGuide from 'components/footer/footGuide'
  import loading from 'components/common/loading'
  import computeTime from 'components/common/computeTime'
  import {imgBaseUrl} from '@/config/env'
  import {mapMutations, mapState} from 'vuex'
  import { getOrderList, shopList} from '../../service/getData';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data () {
      return {
        showLoading: false, //显示加载动画
        preventRepeat: false, // 重复点击
        orderList: [], // 订单列表
        imgBaseUrl,
        swiperOption1: {
          notNextTick: true,
          effect: "fade",
          fadeEffect: {
              crossFade: !1
          }
        },
        swiperOption2: {
          slidesPerView: "auto",
          watchSlidesProgress: !0,
          slidesOffsetBefore: 37,
          spaceBetween: 17,
          resistanceRatio: 1,
          controller: {
              control: swiperOption1
          },
          on: {
            progress: function(b) {
                for (i = 0; i < this.slides.length; i++) slide = this.slides.eq(i),
                slideProgress = this.slides[i].progress,
                prevIndent = 4 == i ? .3228 : .0898,
                scale = 1 > Math.abs(slideProgress + prevIndent) ? .1 * (1 - Math.abs(slideProgress + prevIndent)) + 1 : 1,
                slide.find(".goods").transform("scale3d(" + scale + "," + scale + ",1)")
            },
            setTransition: function(b) {
                for (var a = 0; a < this.slides.length; a++) this.slides.eq(a).find(".goods").transition(b)
            },
            touchMove: function() {
                this.controller.control = .01 > this.progress ? "": swiperOption1
            },
            touchEnd: function() { - 1515 > this.translate && alert("\u8df3\u8f6c")
            }
          }
        }
      }
    },
    computed: {
      ...mapState([
        'userInfo', 'geohash'
      ]),
      mySwiper1 () {
        return this.$refs.mySwiper1.swiper;
      },
      mySwiper2 () {
        return this.$refs.mySwiper2.swiper;
      }
    },
    methods: {
      async loaderMore() {
        if (this.preventRepeat) {
          return
        }
        this.preventRepeat = true;
        this.showLoading = true;
        this.offset += 10;
        console.log(this.userInfo)
        // 获取信息
        let res = await getOrderList(this.userInfo.user_id, this.offset);
        this.orderList = [...this.orderList, ...res];
        this.hideLoading();
        if (res.lenth < 10) {
          return
        }
        this.preventRepeat = false;
      },
      hideLoading() {
        this.showLoading = false;
      },
      stopPlay() {
        this.mySwiper1.stopAutoplay()
      },
      paly () {
        this.mySwiper1.startAutoplay()
      }
    },
    components: {
      heaTop,
      footGuide,
      loading,
      computeTime,
      swiper,
      swiperSlide
    }
  }
</script>
<style lang='css' scoped>
@charset "utf-8";
/* CSS Document */
body {
	width: 750px;
	margin: 0;
	font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
}

#taobao-best {
	position: relative;
	height: 660px;
}

.show-swiper {
	z-index: 3;
	top: 80px;
}

.show-swiper{
	width: 395px;
}

.show-swiper .swiper-slide:last-child {
	width: 95px;
	color: #fff;
}

.show-swiper .swiper-slide:last-child .icon {
	width: 32px;
	height: 32px;
	background: url(../../images/more-icon.png) no-repeat center 50%/100% 100%;
	display: block;
	float: left;
	margin-top: 260px;
	margin-left: 5px;
}

.show-swiper .swiper-slide:last-child .text {
	width: 21px;
	font-size: 21px;
	margin-top: 180px;
	margin-left: 10px;
	line-height: 1.5;
	float: left;
}

.show-swiper .swiper-slide {
	width: 375px;
	padding: 10px;
	height: 500px;
	margin: 40px 0;
	border-radius: 8px;
	background: url(../../images/goods-bg.png);
}

.goods .c-top {
	border-bottom: 1px solid #dcdcdd;
	width: 100%;
	float: left;
}

.goods .date {
	width: 119px;
	height: 318px;
	border-right: 1px solid #adb4ba;
	float: left;
}

.goods .date .year {
	color: #050403;
	font-weight: bold;
	text-align: center;
	margin-top: 35px;
}

.goods .date .day {
	font-size: 55px;
	text-align: center;
	margin-top: 5px;
	font-weight: bolder;
	color: #080704;
}

.goods .date .oldyear {
	color: #050403;
	margin-top: 5px;
	font-size: 22px;
	width: 22px;
	line-height: 1.4;
	margin-left: 30px;
	float: left;
}

.goods .date .oldday {
	color: #050403;
	margin-top: 5px;
	font-size: 22px;
	line-height: 1.4;
	width: 22px;
	margin-right: 30px;
	float: right;
}

.goods .img {
	width: 255px;
	float: right;
}

.goods .img span {
	color: #1a1918;
	font-size: 32px;
	text-align: center;
	line-height: 60px;
	display: block;
}

.goods .img img {
	border-top-right-radius: 8px;
}

.goods .detail {
	width: 335px;
	margin: 0 20px;
	float: left;
}

.goods .detail h2 {
	font-weight: normal;
	color: #312f30;
	font-size: 23px;
	margin-bottom: 0;
}

.goods .detail p {
	color: #979797;
	line-height: 1.5;
	font-size: 18px;
	margin-top: 8px;
}

.goods .detail 	ul {
	padding-left: 0;
	margin-left: 20px;
	float: left;
	margin-top: 0;
}

.goods .detail 	ul li {
	float: left;
	margin-right: 25px;
	color: #737373;
}

.goods .detail .btn {
	float: right;
	margin-right: -10px;
	margin-top: -5px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #fff;
	text-align: center;
	border-radius: 20px;
	background: linear-gradient(90deg,#ffe13c,#ffa70f);
}

.bg-swiper {
	position: absolute;
	width: 100%;
	height: 640px;
	top: 0;
	z-index: 1;
}

.bg-swiper .swiper-slide {
	background: #000;
}

.bg-swiper .swiper-slide img {
/* filter: blur(5px);性能太卡*/
	width: 100%;
	opacity: .5;
}

.mask {
	/*clip-path: polygon(0px 80px, 640px 0px, 640px 170px,0px 170px);兼容性差
	background:#fff;*/
	background: url(../../images/mask.png) no-repeat center bottom/100% auto;
	position: absolute;
	bottom: 0;
	z-index: 2;
	width: 100%;
	height: 170px;
}

.bottom {
	position: fixed;
	bottom: 0;
	width: 640px;
}

.bottom img {
	display: block;
}
</style>

<style lang='less' scoped>
  @import '../../style/mixin';

  .order_page{
        background-color: #f1f1f1;
        margin-bottom: 1.95rem;
        p, span, h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .order_list_ul{
        padding-top: 1.95rem;
        .order_list_li{
            background-color: #fff;
            display: flex;
            margin-bottom: 0.5rem;
            padding: .6rem .6rem 0;
            .restaurant_image{
                .wh(2rem, 2rem);
                margin-right: 0.4rem;
            }
            .order_item_right{
                flex: 5;
                .order_item_right_header{
                    border-bottom: 0.025rem solid #f5f5f5;
                    padding-bottom: .3rem;
                    .fj;
                    .order_header{
                        h4{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            .sc(.75rem, #333);
                            line-height: 1rem;
                            width: 9rem;

                            .arrow_right{
                                .wh(.4rem, .4rem);
                                fill: #ccc;
                                margin-right: .2rem;
                            }
                        }
                        .order_time{
                            .sc(.55rem, #999);
                            line-height: .8rem;
                        }
                    }
                    .order_status{
                        .sc(.6rem, #333);
                    }
                }
                .order_basket{
                    .fj;
                    line-height: 2rem;
                    border-bottom: 0.025rem solid #f5f5f5;
                    .order_name{
                        .sc(.6rem, #666);
                        width: 10rem;
                    }
                    .order_amount{
                        .sc(.6rem, #f60);
                        font-weight: bold;
                    }
                }
                .order_again{
                    text-align: right;
                    line-height: 1.6rem;
                    .buy_again{
                        .sc(.55rem, #3190e8);
                        border: 0.025rem solid #3190e8;
                        padding: .1rem .2rem;
                        border-radius: .15rem;
                    }
                }
            }
        }
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

</style>
