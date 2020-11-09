<template>
  <div id="albumshow-warp" v-if="show" class="animate__animated animate__fadeIn animate__slow">
     <div id="albumshow" class="animate__animated animate__fadeInDown animate__fast">
      <img v-lazy="picurl" alt="">
      <div id="ti">
          <h3>{{albumname}}</h3>
          <p>{{songername}}</p>
      </div>
      <el-scrollbar
            style="height: 23% ;width: 70%"
            wrap-class="scrollbar-wrap"
            id="scrollbar"
            >
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{description}}</p>
      </el-scrollbar>
      <el-scrollbar
            style="height: 45%"
            wrap-class="scrollbar-wrap"
            id="scrollbar2"
            >
            <tbody>
                <tr  v-for="(item,index) in songlists"
                     :key="index">
                    <td @click="playlists(item)">十</td>
                    <td>
                        <!-- @click="videoId(item.mvid)" v-if="item.mvid!=0"  -->
                       <span @click="videoId (item.mv)" v-if="item.mv !=0" class="iconfont icon-mv">MV</span>
                       <span v-if="item.mv ==0" class="iconfont icon-mv">无</span>
                    </td>
                    <td @click="playId (item.id)">
                       <div>
                        <!-- @click="playId(item.id)"  -->
                        <span >{{item.name}}</span>
                       </div>
                       <span v-if="item.alia.length!=0">{{item.alia[0]}}</span>
                    </td>
                    <!-- @click="getsongerid(item.artists[0].id,item.artists[0].name)" -->
                    <td @click="getsongerid (item.ar[0].id, item.ar[0].name)">{{item.ar[0].name}}</td>
                    <td @click="getalbumid(item.al.id)">{{item.al.name}}</td>
                </tr>
            </tbody>
      </el-scrollbar>
        <img id="alladd" @click="getallsonglists(songlists)" src="../assets/img/全部.png" alt="">
        <img id="allclose" @click="changeshow" src="../assets/img/关闭.png" alt="">
     </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      show: false,
      songlists: [],
      description: '',
      albumname: '',
      picurl: '',
      songername: '',
      albumid: '',
      playlistsid: ''

    }
  },
  watch: {
    '$store.state.albumid': function (id) {
      this.albumid = id
      this.getalbumdata()
      this.show = true
    },
    '$store.state.playlistsid': function (id) {
      this.playlistsid = id
      this.getplaylists()
      this.show = true
    },
    '$store.state.albumshow': function () {
      this.show = true
    }
  },
  created () {
  },
  methods: {
    changeshow () {
      this.show = false
    },
    getallsonglists (songlists) {
      var a = this.songlists.length
      for (var i = 0; i < a; i++) {
        this.$store.commit('addsonglists', songlists[i])
      }
    },
    playId (id) {
      this.$store.commit('getplayid', id)
    },
    videoId (id) {
      // 判断是否是同一个ID如果是则打开mv界面，不是则传入新的id
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.videoid != id) {
        this.$store.commit('getvideoid', id)
      } else {
        this.$store.commit('changevideoshow')
      }
    },
    playlists (item) {
      this.$store.commit('addsonglists', item)
    },
    getsongerid (id, name) {
      // 判断是否是同一个ID如果是则打开歌手界面，不是则传入新的id
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.songerid != id) {
        this.$store.commit('getsongerid', id)
        this.$store.commit('getsongername', name)
      } else {
        this.$store.commit('changesgshow')
      }
    },
    getalbumdata () {
      Axios({
        url: 'http://www.hjmin.com/album',
        method: 'get',
        params: {
          id: this.albumid
        }
      }).then(res => {
        console.log(res)
        this.description = res.data.album.description
        this.albumname = res.data.album.name
        this.picurl = res.data.album.blurPicUrl
        this.songername = res.data.album.artist.name
        this.songlists = res.data.songs
      })
    },
    getalbumid (id) {
      // 判断是否是同一个ID如果是则打开歌手界面，不是则传入新的id
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.albumid != id) {
        this.$store.commit('getalbumid', id)
      } else {
        this.$store.commit('changealbumshow')
      }
    },
    getplaylists () {
      Axios({
        url: 'http://www.hjmin.com/playlist/detail',
        method: 'get',
        params: {
          id: this.playlistsid
        }
      }).then(res => {
        this.description = res.data.playlist.description
        this.albumname = res.data.playlist.name
        this.picurl = res.data.playlist.coverImgUrl
        this.songername = res.data.playlist.tags[0]
        this.songlists = res.data.playlist.tracks
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.order-detail {
@import url('../assets/css/album.css');
}
</style>
