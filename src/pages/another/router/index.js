import Vue from "vue";
import Router from "vue-router";
import Another from "@/pages/another/another";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Another",
      component: Another
    }
  ]
});
