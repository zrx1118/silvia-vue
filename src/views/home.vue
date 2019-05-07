<template>
  <div id="home">
    我是{{text}}页面---
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-collapse">
        <a class="mui-navigate-right" href="#">面板1</a>
        <div class="mui-collapse-content">
          <p>面板1子内容</p>
        </div>
      </li>
    </ul>

    <div id="sheet1" class="mui-popover mui-popover-bottom mui-popover-action">
      <!-- 可选择菜单 -->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#">菜单1</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="#">菜单2</a>
        </li>
      </ul>
      <!-- 取消菜单 -->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#sheet1">
            <b>取消</b>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "home"
    };
  },
  mounted() {
    // mui("#sheet1").popover("toggle");
  }
};
</script>

<style>
</style>