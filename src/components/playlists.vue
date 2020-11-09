<template>
  <div id="playlists-warp" class="playlists-warp">
    <!-- top12 -->
    <div id="txt-warp" >
      <h1 id="txt">最新top12专辑</h1>
      <p id="txt1">Every album is a story</p>
      <div id="album-warp">
        <h1>最新TOP1</h1>
        <img class="animate__animated animate__fadeIn animate__slow" :src="blurPicUrl" alt="">
        <h2>专辑《{{albumname}}》</h2>
        <p>作者：{{songername}}</p>
        <p>简介：</p>
        <h5>{{description}}</h5>
        <a href="#">Details page→</a>
      </div>
      <div id="albumlists">
        <div id="albumcon"
             class="animate__animated animate__fadeIn animate__slow"
             v-for="(item,index) in albumlist"
             :key="index"
            >
          <img @click="getalbumid(item.id)" v-lazy="item.blurPicUrl" alt="">
          <div id="comwarp">
            <h2 @click="getalbumid(item.id)">专辑:《{{item.name}}》</h2>
            <h3>作者:{{item.artists[0].name}}</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- 网友推荐歌单 -->
    <div id="fri-warp">
      <h1>网友推荐歌单</h1>
      <p>Looking for people with common interests</p>
      <div id="list-warp"
          v-for="(item,index) in frilist"
          :key="index"
          >
        <img class="animate__animated animate__fadeIn animate__slow" v-lazy="item.coverImgUrl" alt="">
        <div id="text-warp">
          <h2 @click="getplaylistsid(item.id)">{{item.name}}</h2>
        </div>
      </div>
      <div class="block" id="card" >
                <el-pagination
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :total="total"
                  :current-page="page"
                  :page-size="10">
                </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      albumlist: [],
      albumid: 0,
      albumdata: [],
      albumartist: [],
      frilist: [],
      songername: '',
      albumname: '',
      description: '',
      blurPicUrl: '',
      // 总条数
      total: 1,
      // 页码
      page: 1
    }
  },
  created () {
    this.getalbum()
    this.getlist()
  },
  methods: {
    // 热门TOP1
    getalbum () {
      axios({
        url: 'http://www.hjmin.com/album/newest',
        method: 'get',
        params: {
          limit: 9,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        this.albumlist = res.data.albums
        this.albumid = res.data.albums[0].id
        this.getdata()
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
    getdata () {
      axios({
        url: 'http://www.hjmin.com/album',
        method: 'get',
        params: {
          id: this.albumid
        }
      }).then(res => {
        this.description = res.data.album.description
        this.albumname = res.data.album.name
        this.songername = res.data.album.artists[0].name
        this.blurPicUrl = res.data.album.blurPicUrl
      })
    },
    getlist () {
      axios({
        url: 'http://www.hjmin.com/top/playlist',
        method: 'get',
        params: {
          limit: 12,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 12
        }
      }).then(res => {
        this.frilist = res.data.playlists
        this.total = res.data.total
      })
    },
    getplaylistsid (id) {
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.playlistsid != id) {
        this.$store.commit('getplaylistsid', id)
      } else {
        this.$store.commit('changealbumshow')
      }
    },
    handleCurrentChange (val) {
      // 获取页码
      console.log(val)
      this.page = val
      // 重新获取数据
      this.getlist()
    }
  }
}
</script>

<style scoped>
.order-detail {
 @import url('../assets/css/playlists.css');
}
</style>
