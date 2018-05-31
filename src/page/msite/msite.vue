<template>
  <div>
    <hea-top signin-up="msite">
      <div slot="search" @click="searchRestaurant"></div>
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
  </div>
</template>

<script>
import heaTop from '@/components/header/head'
import {cityGuess, searchRestaurant, msiteAddress} from '../../service/getData'
export default {
  data() {
    return {
      msiteTitle: '请选择地址...', // msite页面头部标题
      geohash: '',
    }
  },
  async beforeMount() {
    if (!$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + ',' + address.longitude;
    } else {
      this.geohash = $route.query.geohash;
    }
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
  },
  components: {
    heaTop
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
  @import '../../style/mixin';

</style>

