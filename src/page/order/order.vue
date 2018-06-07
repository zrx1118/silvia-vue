<template>
  <div class="profile_page">
    <hea-top go-back='true' head-title="订单列表"></hea-top>

    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import heaTop from 'components/header/head'
  import footGuide from 'components/footer/footGuide'
  export default {
    data () {
      return {
      }
    },
    components: {
      heaTop,
      footGuide,
    }
  }
</script>

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
