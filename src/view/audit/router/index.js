import Vue from 'vue'
import Router from 'vue-router'
import Detail from 'view/audit/pages/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Detail',
      component: Detail
    }
  ]
})