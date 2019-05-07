import Vue from "vue";
import Another from "./Another";
// import router from "./router";

Vue.config.productionTip = false;

new Vue({
  el: "#another",
  // router,
  components: { Another },
  template: "<Another/>"
});
