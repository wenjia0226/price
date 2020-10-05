import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import index from '@/components/index'
import series from '@/components/series'
import detail from '@/components/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/detail', component: detail},
   {
     path: '/',
     component: Home,
     children: [
       {path: '/index', component: index },
       {path: '/singleFocus', component: series },
       {path: '/life', component: series },
       {path: '/protect', component: series },
       {path: '/changeFocus', component: series },
       {path: '/changeColor', component: series },
       {path: '/teenagers', component: series },
       {path: '/sunshine', component: series }
  ],
  }]
})
