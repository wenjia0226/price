import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import series from '@/components/series'
import detail from '@/components/detail'
import different from '@/components/different'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/singleFocus'},
    {path: '/detail', component: detail},
	{path: '/different', component: different},
   {
     path: '/',
     component: Home,
     children: [
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
