<template>
  <div>
    <router-view></router-view>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import svgIcon from '@/components/common/svg';
  export default {
    components:{
        svgIcon
    },
  }
</script>

<style lang="less">

</style>
