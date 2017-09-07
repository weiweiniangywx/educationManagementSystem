import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routers from './routes/index'
import VueResource from 'vue-resource'
import iView from 'iview'
import './assets/css/iview.css'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({
  // mode: 'history',
  routes: routers
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
