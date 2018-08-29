<template>
  <div class="page">
      <span class="rem_time" style="color: orange;border-width: 1px;border-style: solid;border-color: orange;" @click="gotoPay">{{remaining}}</span>
      <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import alertTip from './alertTip'
  export default {
    data () {
      return {
        countNum: 900,
        showAlert: false,
        alertText: null,
      }
    },
    components: {
      alertTip,
    },
    props: ['time'],
    mounted(){
        this.countNum -= this.numTime;
        this.remainingTime();
    },
    methods: {
      closeTip(){
          this.$emit('closeTip')
      },
      //计算时间
      remainingTime() {
        this.timer = setInterval(() => {
            this.countNum --;
            if (this.countNum == 0) {
                clearInterval(this.timer);
                this.showAlert = true;
                this.alertText = '支付超时';
            }
        }, 1000);
      }
    },
    computed: {
      //订单返回时间秒分分别处理
      numTime: function (){
          if (this.time.toString().indexOf('分钟') !== -1) {
              return parseInt(this.time)*60;
          }else{
              return parseInt(this.time);
          }
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '../../style/mixin';

</style>

