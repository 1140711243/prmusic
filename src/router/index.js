import Vue from 'vue'
import Router from 'vue-router'
// import discovery from '../components/discovery.vue'
// import playlists from '../components/playlists.vue'
// import songs from '../components/songs.vue'
// import mvs from '../components/mvs.vue'
// import result from '../components/result.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    { // 地址
      path: '/discovery',
      // 组件
      component: resolve => require(['@/components/discovery'], resolve)
    },
    { // 地址
      path: '/',
      // 组件
      component: resolve => require(['@/components/discovery'], resolve)
    },
    { // 地址
      path: '/result',
      // 组件
      component: resolve => require(['@/components/result'], resolve)
    },
    { // 地址
      path: '/playlists',
      // 组件
      component: resolve => require(['@/components/playlists'], resolve)
    },
    { // 地址
      path: '/songs',
      // 组件
      component: resolve => require(['@/components/songs'], resolve)
    },
    { // 地址
      path: '/mvs',
      // 组件
      component: resolve => require(['@/components/mvs'], resolve)
    }
  ]
})
