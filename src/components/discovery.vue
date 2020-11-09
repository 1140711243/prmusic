<template>
  <div id="dis-warp" >
    <!--精选歌单-->
    <div id="songLists" >
      <h1>精选歌单</h1>
      <p>Enjoy some new awesome music</p>
     <el-scrollbar
            class="animate__animated animate__fadeIn animate__slow"
            style="height: 100%"
            wrap-class="scrollbar"
            :infinite-scroll-immediate="false"
            infinite-scroll-distance="100"
            >
       <ul>
      <li id="a01"
          v-for="(item,index) in topsonglists"
          :key="index"
          >
        <img
          class="animate__animated animate__fadeIn animate__fast"
          v-lazy="item.coverImgUrl" alt="">
        <h3 @click="getplaylistsid (item.id)">{{item.name}}</h3>
        <h4>作者昵称:{{item.subscribers[0].nickname}}</h4>
      </li>
       </ul>
     </el-scrollbar>
    </div>
    <!-- 推荐mv -->
    <div id="mvLists" class="animate__animated animate__fadeIn animate__slow">
      <h1>MV专区</h1>
      <p>All kinds of wonderful MV</p>
      <div id="pic-warp" >
         <el-carousel height="252px" width="90vw"
                     :autoplay="false"
                     indicator-position="none"
                     @change="changebtn"
                     >
          <el-carousel-item v-for="item in 20" :key="item">
            <div id="mv-warp"
                v-for="(item,index) in topmvlists"
                :key="index"
                >
              <ul>
                <li>
                  <img id="img1" v-lazy="item.cover" alt="">
                   <dl class="case_info">
                    <dt>
                      <div id="case-warp">
                        <img @click="videoId(item.id)" src="../assets/img/播放.png" alt="">
                      <h4 @click="videoId(item.id)">{{item.name}}</h4>
                      <h5 @click="videoId(item.id)">Latest Video Released</h5>
                      </div>
                    </dt>
                  </dl>
                </li>
              </ul>
            </div>
         </el-carousel-item>
        </el-carousel>
      </div>
    </div>
      <!-- 新歌 -->
    <div id="topSongs">
      <div id="songs" >
        <h1>新歌速递</h1>
        <p>Enjoy the musical journey</p>
        <el-tabs type="border-card" v-model="activeIndex">
           <el-tab-pane label="歌曲" name="songs" class="songslist" >
            <thead>
              <th>序号</th>
              <th>歌曲图片</th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
              <!-- @click="playMusic(item.id)" -->
            <tbody class="animate__animated animate__fadeIn animate__slow">
              <tr v-for="(item,index) in newsongslist"
                  :key="index"
                  class="el-table__row">
                <td>{{index+1}}</td>
                <td>
                  <img v-lazy="item.picUrl" alt=""
                   >
                </td>
                <td>
                  <div class="song-wrap">
                    <div class="name-warp">

                      <span @click="playId(item.id)">{{item.name}}</span>
                    </div>
                  </div>
                </td>
                <td @click="getsongerid(item.song.artists[0].id,item.song.artists[0].name)">{{item.song.artists[0].name }}</td>
                <td @click="getalbumid(item.song.album.id) ">{{item.song.album.name}}</td>
                <td>{{item.song.duration}}</td>
              </tr>
            </tbody>
          </el-tab-pane>
          <el-tab-pane label="欧美(暂不可用)"></el-tab-pane>
          <el-tab-pane label="日本(暂不可用)"></el-tab-pane>
          <el-tab-pane label="韩国(暂不可用)"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 热门歌手 -->
    <div id="topSonger">
      <div id="songer-warp" >
        <h1>热门歌手</h1>
        <p id="top-txt">Your heart they understand</p>
        <el-tabs type="border-card">
          <el-tab-pane label="全部" class="animate__animated animate__fadeIn animate__slow">
            <div id="topsonger-warp"
                  v-for="(item,index) in topsongerlist"
                  :key="index"
                  >
               <tr>
                 <p>{{index+1}}</p>
                 <td>
                   <img v-lazy="item.img1v1Url" alt=""
                    class="animate__animated animate__slideInUp animate__fast"
                    >
                 </td>
                 <td @click="getsongerid(item.id,item.name)">{{item.name}}</td>
                 <td v-if="item.accountId!=0">♥  {{item.accountId}}</td>
               </tr>
            </div>
              <div class="block" id="card" >
                <el-pagination
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :total="total"
                  :current-page="page"
                  :page-size="9">
                </el-pagination>
              </div>
          </el-tab-pane>
          <el-tab-pane label="内地(暂不可用)" class="animate__animated animate__fadeIn animate__slow">
          </el-tab-pane>
           <el-tab-pane label="欧美(暂不可用)" class="animate__animated animate__fadeIn animate__slow">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      newsongslist: [],
      topsongerlist: [],
      topsonglists: [],
      topmvlists: [],
      total: 1,
      activeIndex: 'songs',
      // 页码
      page: 1,
      page2: 1,
      mvtotal: 1
    }
  },
  created () {
    this.getnewsongs()
    this.gettopsonger()
    this.getsonglists()
    this.gettopmvs()
  },
  methods: {
    getnewsongs () {
      Axios({
        url: 'http://musicapi.leanapp.cn/personalized/newsong',
        method: 'get',
        params: {
        }
      }).then(res => {
        this.newsongslist = res.data.result
        for (let i = 0; i < this.newsongslist.length; i++) {
          let min = parseInt(this.newsongslist[i].song.duration / 1000 / 60)
          let sec = parseInt(this.newsongslist[i].song.duration / 1000 % 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          this.newsongslist[i].song.duration = min + ':' + sec
        }
      })
    },
    gettopsonger () {
      Axios({
        url: 'http://www.hjmin.com/top/artists',
        method: 'get',
        params: {
          limit: 9,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 9
        }
      }).then(res => {
        this.topsongerlist = res.data.artists
        this.total = res.data.code / 2
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
    getalbumid (id) {
      // 判断是否是同一个ID如果是则打开歌手界面，不是则传入新的id
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.albumid != id) {
        this.$store.commit('getalbumid', id)
      } else {
        this.$store.commit('changealbumshow')
      }
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
    getsonglists () {
      Axios({
        url: 'http://www.hjmin.com/top/playlist/highquality',
        method: 'get',
        params: {
          limit: 30
        }
      }).then(res => {
        this.topsonglists = res.data.playlists
      })
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
    gettopmvs () {
      Axios({
        url: 'http://www.hjmin.com/mv/all',
        method: 'get',
        params: {
          limit: 3,
          offset: (this.page2 - 1) * 3,
          area: '欧美'
        }
      }).then(res => {
        this.topmvlists = res.data.data
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.gettopsonger()
    },
    changebtn (x) {
      this.page2 = x + 1
      this.gettopmvs()
    },
    // 获取音乐id然后传到父组件中
    playId (id) {
      this.$store.commit('getplayid', id)
    }
  }
}

</script>
<style scoped >
.order-detail {
@import url('../assets/css/discovery.css');
}
</style>
