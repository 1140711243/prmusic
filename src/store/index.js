import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
//   存放全局数据
  state: {
    songid: '', // 全局歌曲id
    songlists: [], // 全局歌曲列表
    songerid: '',
    songername: '',
    videoshow: false,
    sgshow: false,
    videoid: '',
    albumid: '',
    playing: false,
    playlistsid: '',
    albumshow: false
  },
  // 相当于组件中的computed
  getters: {
    songid (state) {
      return state.songid
    }
  },
  // 相当于methods
  mutations: {
    getplayid (state, songid) {
      state.songid = songid
    },
    getplaylistsid (state, playlistsid) {
      state.playlistsid = playlistsid
    },
    getalbumid (state, albumid) {
      state.albumid = albumid
    },
    getvideoid (state, videoid) {
      state.videoid = videoid
    },
    addsonglists (state, songlists) {
      state.songlists.push(songlists)
    },
    reducesonglists (state, index) {
      state.songlists.splice(index, 1)
    },
    getsongerid (state, songerid) {
      state.songerid = songerid
    },
    getsongername (state, songername) {
      state.songername = songername
    },
    changesgshow (state) {
      state.sgshow = !state.sgshow
    },
    changevideoshow (state) {
      state.videoshow = !state.videoshow
    },
    changealbumshow (state) {
      state.albumshow = !state.albumshow
    },
    changeplaying (state) {
      state.playing = !state.playing
    }
  },
  actions: {},
  modules: {}
})
