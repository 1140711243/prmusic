// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animated from 'animate.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import wow from 'wowjs'
import 'animate.css/animate.min.css'
import App from './App'
import VueLazyLoad from 'vue-lazyload' // 懒加载
import router from './router'
import store from '@/store'
Vue.prototype.$wow = wow
Vue.use(VueLazyLoad, {
  error: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033364728,2158601596&fm=26&gp=0.jpg', // 加载错误的图片
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604545857087&di=8e2d9fce06ffc2e2591f8c1fa1602377&imgtype=0&src=http%3A%2F%2Fyanshi.sucaihuo.com%2Fjquery%2F36%2F3658%2Fbig.jpg' // 加载时的图片
})

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(animated)
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.use(axios)

// const store = new Vuex.Store({
//   state: {
//     songId: ''
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
