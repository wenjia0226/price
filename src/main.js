// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import router from './router'
import store from './store/'
import FastClick from 'fastclick'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base/reset.css'
import './assets/style/base/border.css'
Vue.use(ElementUI);
Vue.config.productionTip = false
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
