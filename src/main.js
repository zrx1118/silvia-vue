// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {routerMode} from './config/env'
import './config/rem'
import routes from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',

})

new Vue({
  router,
  store
}).$mount('#app')
