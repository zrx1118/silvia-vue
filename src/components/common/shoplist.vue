<template>
  <div class="shoplist_container">
    <ul v-load-more="loadMore" v-if="shoplistArr.length" type="1">
      <router-link :to="{path: 'shop', query: {geohash, id: item.id}}" tag="li" v-for="(item, index) in shoplistArr" :key="index" class="shop_li">
        <section>
          <img :src="imgBaseUrl + item.image_path" alt="" class="shop_img">
        </section>
      </router-link>
    </ul>
    <ul v-else class="animation_opactiy">
			<li class="list_back_li" v-for="item in 10" :key="item">
				<img src="../../images/shopback.svg" class="list_back_svg">
			</li>
		</ul>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
  </div>
</template>

<script>
  import {shopList} from '../../service/getData'
  import loading from './loading'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
        shoplistArr: [], // 店铺数据
        latitude: '', //
        longitude: '', //
        offset: '', //
        restaurantCategoryId: '', //
        showLoading: true,
        showBackStatus: '', // 是否显示返回顶部按钮
      }
    },
    components: {
      loading,
      ratingStar,
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    computed: {
      ...mapState([
        'latitude','longitude'
      ]),
    },
    methods: {
      async initData() {
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        shoplistArr = [...res];
        if (res.length < 20) {
          this.touchend = true;
        }
        this.hideLoading();
        // 开始监听scrolltop的值，达到一定程度之后显示返回顶部按钮
        showBack(status => {
          this.showBackStatus = status;
        })
      },
      // 开发环境与编译环境loading隐藏方式不同
      hideLoading () {
        this.showLoading = false;
      },
      //返回顶部
      backTop(){
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
      },
    },
    mounted() {
      this.initData();
    },
    components: {

    }
  }
</script>

<style lang='less'>
  @import 'src/style/mixin';
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem;
	}
	.shop_li{
		display: flex;
		border-bottom: 0.025rem solid #f1f1f1;
		padding: 0.7rem 0.4rem;
	}
	.shop_img{
		.wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.4rem;
	}
	.list_back_li{
		height: 4.85rem;
		.list_back_svg{
			.wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			.fj;
			align-items: center;
			.shop_title{
				width: 8.5rem;
				color: #333;
				padding-top: .01rem;
				.font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .6rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.3rem;
				.supports{
					.sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
			}
		}
		.rating_order_num{
			.fj(space-between);
			height: 0.6rem;
			margin-top: 0.52rem;
			.rating_order_num_left{
				.fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						.sc(0.4rem, #ff6000);
						margin: 0 0.2rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.2rem;
					.sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.7);
				min-width: 5rem;
				justify-content: flex-end;
				margin-right: -0.8rem;
				.delivery_style{
					font-size: 0.4rem;
					padding: 0.04rem 0.08rem 0;
					border-radius: 0.08rem;
					margin-left: 0.08rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: @blue;
					border: 0.025rem solid @blue;
				}
				.delivery_right{
					color: @blue;
					border: 0.025rem solid @blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem;
			.fj;
			.sc(0.5rem, #333);
			.fee{
				transform: scale(.9);
				.sc(0.5rem, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: @blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		.font(0.6rem, 3);
		text-align: center;
	  color: #999;
	}
	.empty_data{
		.sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			.wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>

