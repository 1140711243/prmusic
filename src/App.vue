<template>
  <div id="app">
    <top id="top" class="animate__animated animate__fadeIn animate__slow"></top>
    <player id="player-warp"></player>
    <videoplayer id="video-warp"></videoplayer>
    <album id="albumshow-warp"></album>
    <songer id="sgdetail-warp"></songer>
    <show id="show" ></show>
    <like id="like-btn" class="animate__animated animate__slideInLeft animate__fast"></like>
    <list id="list-btn" class="animate__animated animate__fadeIn animate__slow"></list>
    <div  id="container" class="animate__animated animate__fadeIn animate__slow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import top from './components/top'
import show from './components/show'
import list from './components/list'
import like from './components/like'
import player from './components/player'
import songer from './components/songer'
import videoplayer from './components/video'
import album from './components/album'
export default {

  data () {
    return {
      songId: ''
    }
  },
  components: {
    top,
    show,
    list,
    like,
    player,
    songer,
    album,
    videoplayer
  },

  methods: {
  }
}
</script>

<style>
#app{
  background-color: #131722;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#player-warp{
  bottom: 0%;
  position: fixed;
  z-index: 5;
}
#video-warp{
  position: fixed;
  z-index: 5;
}
#albumshow-warp{
  position: fixed;
  z-index: 4;
}
#sgdetail-warp{
  position: fixed;
  z-index: 4;
}
#like-btn{
  position: fixed;
  top: 40%;
  float: left;
  left: 0;
  z-index: 3;
}
#list-btn{
  top: -70px;
  position: relative;
  z-index: 3;
}
#container{
  background-color: #131722;
  height: 100vw;
  z-index: 1;
  width: auto;
  margin-left: auto;
  margin-right: auto;

}
#top{
  margin-top: 0%;
  position: fixed;
  z-index: 3;
}
</style>
