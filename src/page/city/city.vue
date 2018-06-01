<template>
  <div class="city_container">
    <hea-top go-back="true" :head-title="cityname">
      <router-link class="change_city" slot="changecity" to="/home">切换城市</router-link>
    </hea-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" class="city_input input_style" placeholder="输入学校、商务楼、地址" required v-model="inputValue"/>
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click="postpois" value="提交">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" :key="index" @click="nextpage(index, item.geohash)">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清除历史记录</footer>
    <div v-if="placeNone" class="search_none_place">很抱歉，没有搜索结果</div>
  </div>
</template>

<script>
import heaTop from '@/components/header/head'
import {currentcity, searchplace} from '../../service/getData'
import {getStore, setStore, removeStore} from '../../config/mUtils'

export default {
  data() {
    return {
      inputValue: '', // 搜索地址
      cityid: '', // 当前城市id
      cityname: '', // 当前城市名
      placelist: [], // 搜索城市列表
      placeHistory: [], // 存放地址记录
      placeNone: false, // 搜索无结果的提示信息
      historytitle: true, // 是否显示搜索历史
    }
  },
  components: {
    heaTop
  },
  methods: {
    initData() {
      if (getStore('placeHistory')) {
        this.placelist = JSON.parse(getStore('placeHistory'));
      } else {
        this.placelist = [];
      }
    },
    postpois() {
      if (this.inputValue) {
        searchplace(this.cityid, this.inputValue).then(res => {
          this.historytitle = false;
          this.placelist = res;
          this.placeNone = res.length ? false : true;
        })
      }
    },
    nextpage(index, geohash) {
      let history = getStore('placeHistory');
      let chooseplace = this.placelist[index];
      if (history) {
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach(item => {
          if (item.geohash == geohash) {
            checkrepeat = true;
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(chooseplace);
        }
      } else {
        this.placeHistory.push(chooseplace);
      }
      setStore('placeHistory', this.placeHistory);
      this.$router.push({path:'/msite', query:{geohash}})
    },
    clearAll() {
      removeStore('placeHistory');
      this.initData();
    }
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
    currentcity(this.cityid).then(res => {
      this.cityname = res.name;
    })
    this.initData();
  }
}
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .city_container{
        padding-top: 2.35rem;
    }
    .change_city{
        right: 0.4rem;
        .sc(0.6rem, #fff);
        .ct;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid @bc;
        border-bottom: 1px solid @bc;
        padding-top: 0.4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                .wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid @bc;
                padding: 0 0.3rem;
                .sc(0.65rem, #333);
            }
            .city_submit{
                background-color: @blue;
                .sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid @bc;
        border-bottom: 1px solid @bc;
        padding-left: 0.5rem;
        .font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid @bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid @bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               .sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                .sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        .font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        .sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
</style>
