<template>
  <div id="player-warp">
      <!-- 歌词 -->
      <transition name="el-fade-in-linear">
      <div id="songtxt" v-if="showSongtxt">

      </div>
      </transition>
      <!-- 播放器 -->
      <footer id="player" class="footer">
        <audio @canplay="changeplay" @error="playerror" @timeupdate="updataTime" ref="audio" id="audio" :src="songUrl" ></audio>
        <div id="btn-warp">
            <img @click="lastsong" src="../assets/img/上一首.png" alt="">
            <img class="animate__animated animate__fadeIn animate__fast" @click="playsong" v-if="playing" src="../assets/img/暂停.png" alt="">
            <img class="animate__animated animate__fadeIn animate__fast" @click="playsong" v-if="!playing" src="../assets/img/播放2.png" alt="">
            <img @click="playmodel" src="../assets/img/下一首.png" alt="">
        </div>
        <img v-if="tag" id="songerPic" :src="picUrl" class="animate__animated animate__fadeIn animate__slow" alt="">
        <img v-if="!tag" id="Pic2" src="../assets/img/播放3.png" alt="">
        <div id="pro-txt" >
            <h5>{{songName}}</h5>
            <div id="speed" @mousedown="mousedown"  ref="speed" >
                <img  v-if="tag"
                      @mousedown="mousedown"
                      class="bar"
                      ref="bar"
                      src="../assets/img/进度条滑块.png" id="bar"
                      >
                <div id="prograss" ref="prograss"></div>
            </div>
            <p id="b">{{time2}}</p>
            <p id="e">{{time}}</p>
        </div>
        <div id="ctr-btn">
            <el-tooltip content="点击切换播放模式" placement="bottom" effect="light">
            <img @click="changemodel" v-if="!randomsongmodel" src="../assets/img/顺序点击.png" alt="">
            <img @click="changemodel" v-if="randomsongmodel" src="../assets/img/随机点击.png" alt="">
            </el-tooltip>
            <img @click="changeShow" v-if="!showSongtxt" src="../assets/img/歌词.png" alt="">
            <img @click="changeShow" v-if="showSongtxt" src="../assets/img/歌词点击.png" alt="">
            <img @click="changelists" v-if="!showSonglists" src="../assets/img/列表.png" alt="">
            <img @click="changelists" v-if="showSonglists" src="../assets/img/列表点击.png" alt="">
            <transition name="el-zoom-in-bottom">
            <div id="playlists" v-if="showSonglists">
              <el-scrollbar
               style="height: 90%"
               wrap-class="scrollbar-wrap"
               id="scrollbar"
               >
                <tbody>
                    <tr class="animate__animated animate__fadeIn animate__fast"
                        id="lists-warp"
                        v-for="(item,index) in songlists"
                        :key="index">
                        <el-tooltip content="播放" placement="bottom" effect="light">
                        <img @click="onplay(index)" src="../assets/img/播放2.png" alt="">
                        </el-tooltip>
                        <td @click="onplay(index)">{{item.name}}</td>
                        <!-- 因为网易云API的问题，返回的歌曲作者有的是artists，有的是ar，故加入判断 -->
                        <td v-if="item.ar != undefined">{{item.ar[0].name}}</td>
                        <td v-if="item.artists != undefined">{{item.artists[0].name}}</td>
                        <img @click="reducelists(index)" src="../assets/img/删除.png" alt="">
                    </tr>
                </tbody>
               </el-scrollbar>
            </div>
           </transition>
        </div>
      </footer>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      randomsongmodel: false,
      showSongtxt: false,
      showSonglists: false,
      tag: false,
      playing: false,
      songId: '',
      songlists: '',
      progressLength: 0, // 进度条长度
      mouseStartX: 0, // 拖拽开始位置
      num: 0, // 初始化列表中正在播放的歌曲序号
      songUrl: '',
      songName: '',
      time: '',
      albumId: '',
      picUrl: '',
      time2: '',
      time3: '',
      lenth: ''
    }
  },
  created () {
    this.songlists = this.$store.state.songlists
  },
  watch: {
    //   监听vuex数据变化
    '$store.state.songid': function (id) {
      this.songId = id
      this.songUrl = 'https://music.163.com/song/media/outer/url?id=' + this.songId + '.mp3'
      this.getsongdetail()
      this.songlists = this.$store.state.songlists
    },
    '$store.state.songlists': function (lists) {
      this.songlists = lists
      this.showSonglists = true
    },
    '$store.state.playing': function () {
      var audio = document.querySelector('#audio')
      audio.pause()
      this.playing = false
    }
  },
  methods: {
    //   是否显示播放列表
    changelists () {
      this.showSonglists = !this.showSonglists
    },
    // 切换播放模式
    changemodel () {
      if (!this.randomsongmodel) {
        this.randomsongmodel = true
      } else if (this.randomsongmodel) {
        this.randomsongmodel = false
      }
    },
    // 获取歌曲所有数据
    getsogdata () {
      this.songId = this.songlists[this.num].id
      this.songUrl = 'https://music.163.com/song/media/outer/url?id=' + this.songId + '.mp3'
      this.getsongdetail()
    },
    // 播放完成后检查根据播放模式切歌和根据播放模式进行顺序切歌或随机切歌
    playmodel () {
      if (!this.randomsongmodel) {
        if (this.num < this.songlists.length) {
          this.getsogdata()
          this.num++
        } else {
          this.$message({
            message: '播放列表中已经没有歌曲了，快去添加心仪的歌曲吧',
            type: 'warning'
          })
          this.num = 0
        }
      } else if (this.randomsongmodel) {
        this.randomsong()
      }
    },
    // 点击列表中的歌曲进行播放
    onplay (num) {
      this.num = num
      this.getsogdata()
    },
    // 随机播放
    randomsong () {
      var a = this.songlists.length
      var index = this.num
      while (index === this.num) {
        index = parseInt(a * Math.random())
      }
      this.num = index
      this.getsogdata()
    },
    // 上一首
    lastsong () {
      if (this.num > 0) {
        this.num = this.num - 1
        this.getsogdata()
      } else {
        this.$message({
          message: '已经是第一首歌了，无法切换了，你可以到播放列表中选择播放心仪的歌曲',
          type: 'warning'
        })
      }
    },
    // 是否显示歌词
    changeShow () {
      this.showSongtxt = !this.showSongtxt
    },
    // 删除播放列表中的歌曲
    reducelists (index) {
      this.$store.commit('reducesonglists', index)
    },
    // audio准备就绪后改变播放状态
    changeplay () {
      var audio = document.querySelector('#audio')
      audio.play()
      this.playing = true
      this.tag = true
      this.$refs.speed.style.background = 'bisque'
    },
    // 播放按钮状态
    playsong () {
      var audio = document.querySelector('#audio')
      if (!this.playing) {
        audio.play()
        this.playing = true
      } else if (this.playing) {
        audio.pause()
        this.playing = false
      }
    },
    // 获取歌曲信息
    getsongdetail () {
      Axios({
        url: 'http://www.hjmin.com/song/detail',
        method: 'get',
        params: {
          ids: this.songId
        }
      }).then(res => {
        let min = parseInt(res.data.songs[0].dt / 1000 / 60)
        let sec = parseInt(res.data.songs[0].dt / 1000 % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.lenth = res.data.songs[0].dt / 1000
        this.time = min + ':' + sec
        this.songName = res.data.songs[0].name
        this.albumId = res.data.songs[0].al.id
        this.getalbum()
      })
    },
    // 获取专辑信息
    getalbum () {
      Axios({
        url: 'http://www.hjmin.com/album',
        method: 'get',
        params: {
          id: this.albumId
        }
      }).then(res => {
        this.picUrl = res.data.album.artist.picUrl
      })
    },
    // 更新播放时间
    updataTime (e) {
      this.currentTime = e.target.currentTime
      let min = parseInt(this.currentTime / 60)
      let sec = parseInt(this.currentTime % 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      this.time2 = min + ':' + sec
      this.time3 = '' + parseFloat(this.currentTime / this.lenth) * 100 + '%'
      var a = parseInt(this.currentTime / this.lenth * 100)
      this.$refs.prograss.style.width = this.time3
      this.$refs.bar.style.left = this.time3
      // eslint-disable-next-line eqeqeq
      if (a == 100) {
        this.playmodel()
      }
    },
    // 点击进度条改变进度
    mousedown (e) {
      var audio = document.querySelector('#audio')
      this.mouseStartX = e.clientX - 471
      this.progressLength = this.$refs.speed.getBoundingClientRect().width
      let newPercent = (this.mouseStartX / this.progressLength) * 100
      let a = newPercent * 0.01 * this.lenth
      audio.currentTime = a
    },
    // audio标签播放失败时信息提示并切换歌曲
    playerror () {
      this.$message({
        message: '哦豁，网易云扑街左了，正在自动帮你切换歌曲',
        type: 'warning'
      })
      // eslint-disable-next-line eqeqeq
      if (this.songlists.length != 0) {
        this.playmodel()
      } else {
        this.$message({
          message: '歌曲播放失败，已暂停歌曲播放',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
.order-detail {
 @import url('../assets/css/player.css');
}
</style>
