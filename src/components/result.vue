
<template>
    <div id="result">
      <h1>{{$route.query.txt}}</h1>
      <p>A total of {{total}} results</p>
        <el-tabs type="border-card" v-model="activeIndex" >
          <el-tab-pane label="歌曲" name="songs" class="songs" >
            <thead>
              <th>添加到播放列表</th>
              <th>歌曲mv</th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
            <tbody class="animate__animated animate__fadeIn animate__slow">
              <tr v-for="(item,index) in songList"
                  :key="index"
                  class="el-table__row">
                <td @click="playlists(item)">十</td>
                <td>
                   <span @click="videoId(item.mvid)" v-if="item.mvid!=0" class="iconfont icon-mv">MV</span>
                   <span v-if="item.mvid=='0'" class="iconfont icon-mv">无</span>
                </td>
                <td>
                  <div class="song-wrap">
                    <div class="name-warp">

                      <span @click="playId(item.id)" >{{item.name}}</span>
                    </div>
                    <span v-if="item.alias.length!=0" >{{item.alias[0]}}</span>
                  </div>
                </td>
                <td @click="getsongerid(item.artists[0].id,item.artists[0].name)" >{{item.artists[0].name }}</td>
                <td @click="getalbumid(item.album.id)">{{item.album.name}}</td>
                <td>{{item.duration}}</td>
              </tr>
            </tbody>
            <!-- 分页器
                 total 总条数
                 current-page 当前页
                 page-size 每页多少条数据
                 current-change 页码改变事件
              -->
            <div class="block" id="card" >
              <!-- <span class="demonstration"></span> -->
                <el-pagination
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :total="total"
                  :current-page="page"
                  :page-size="10">
                </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="歌手" name="songer" class="songer">
            <div class="songer-warp">
              <ul class="songercon"
                  v-for="(item,index) in songerlist"
                  :key="index">
                <li>
                  <img class="animate__animated animate__fadeIn animate__fast" v-lazy="item.img1v1Url" alt="">
                  <dl class="case_info">
                    <dt>
                      <div id="case-warp">
                      <h3 @click="getsongerid(item.id,item.name)">{{item.name}}</h3>
                      <h5 @click="getsongerid(item.id,item.name)">Entry details</h5>
                      </div>
                    </dt>
                  </dl>
                </li>
              </ul>
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
          </el-tab-pane>
          <el-tab-pane label="mv" name="mv" class="mv">
            <div class="mv-warp"
                 v-for="(item,index) in mvlist"
                  :key="index"
                >
              <ul class="animate__animated animate__fadeIn animate__fast">
                <li>
                  <img v-lazy="item.cover" alt="">
                   <dl class="case_info">
                    <dt>
                      <div id="case-warp">
                        <img src="../assets/img/播放.png" alt="">
                      <h4 @click="videoId(item.id)">{{item.name}}</h4>
                      <h5 @click="videoId(item.id)">Latest Video Released</h5>
                      </div>
                    </dt>
                  </dl>
                </li>
              </ul>
              <h3>{{item.name}}</h3>
              <h5>{{item.artistName}}</h5>
            </div>

            <!-- 页码 -->
             <div class="block" id="card" >

                <el-pagination
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :total="total"
                  :current-page="page"
                  :page-size="10">
                </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'return',
  data () {
    return {
      activeIndex: 'songs',
      songList: [],
      songerlist: [],
      mvlist: [],
      // 总条数
      total: 1,
      // 页码
      page: 1
    }
  },
  watch: {
    activeIndex () {
      // eslint-disable-next-line no-unused-vars
      let type = 1
      this.page = 1
      switch (this.activeIndex) {
        case 'songs':type = 1; break
        case 'songer':type = 100; break
        case 'mv':type = 1004; break
        default: break
      }
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.txt,
          type,
          limit: 10,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        // eslint-disable-next-line eqeqeq
        if (type == 1) {
          this.type = type
          this.songsData()

        // eslint-disable-next-line brace-style
        }
        // eslint-disable-next-line eqeqeq
        else if (type == 100) {
          this.type = type
          this.songerData()
        // eslint-disable-next-line brace-style
        }
        // eslint-disable-next-line eqeqeq
        else if (type == 1004) {
          this.type = type
          this.mvData()
        }
      })
    }
  },
  created () {
    this.songsData()
    // this.songerData()
  },
  // 页码改变事件
  methods: {
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
    getalbumid (id) {
      // 判断是否是同一个ID如果是则打开歌手界面，不是则传入新的id
      // eslint-disable-next-line eqeqeq
      if (this.$store.state.albumid != id) {
        this.$store.commit('getalbumid', id)
      } else {
        this.$store.commit('changealbumshow')
      }
    },
    playId (id) {
      this.$store.commit('getplayid', id)
    },
    playlists (item) {
      this.$store.commit('addsonglists', item)
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
    songsData () {
      axios({
        url: 'http://www.hjmin.com/search',
        method: 'get',
        params: {
          keywords: this.$route.query.txt,
          type: this.type,
          limit: 10,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        this.songList = res.data.result.songs
        this.total = res.data.result.songCount
        for (let i = 0; i < this.songList.length; i++) {
          let min = parseInt(this.songList[i].duration / 1000 / 60)
          let sec = parseInt(this.songList[i].duration / 1000 % 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          this.songList[i].duration = min + ':' + sec
        }
      })
    },
    songerData () {
      axios({
        url: 'http://www.hjmin.com/search',
        method: 'get',
        params: {
          keywords: this.$route.query.txt,
          type: this.type,
          limit: 12,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        this.songerlist = res.data.result.artists
        this.total = res.data.result.artistCount
      })
    },
    mvData () {
      axios({
        url: 'http://www.hjmin.com/search',
        method: 'get',
        params: {
          keywords: this.$route.query.txt,
          type: this.type,
          limit: 12,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        console.log(res)
        this.mvlist = res.data.result.mvs
        this.total = res.data.result.mvCount
      })
    },
    handleCurrentChange (val) {
      // console.log(val)
      // 获取页码
      this.page = val
      // 重新获取数据
      // eslint-disable-next-line eqeqeq
      if (this.activeIndex == 'songs') {
        this.songsData()
      // eslint-disable-next-line eqeqeq
      } else if (this.activeIndex == 'songer') {
        this.songerData()
      // eslint-disable-next-line eqeqeq
      } else if (this.activeIndex == 'mv') {
        this.mvData()
      }
    }
  }
}
</script>

<style scoped>
.order-detail {
   @import url('../assets/css/result.css');
}
</style>
