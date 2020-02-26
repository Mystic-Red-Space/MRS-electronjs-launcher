import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'load',
      component: require('@/components/load').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/main',
      name: 'main',
      component: require('@/components/launcher').default
    }
  ]
})
