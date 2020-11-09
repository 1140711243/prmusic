<template>
  <div v-if="show" id="sgdetail-warp">
      <!-- 歌手信息 -->
      <div class="animate__animated animate__fadeIn animate__slow" v-if="show" id="sgdetail">
          <img v-if="picurl" v-lazy="picurl">
          <img v-if="!picurl" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1007043693,2735869963&fm=11&gp=0.jpg" alt="">
          <div id="sgname">
              <h3>{{songername}}</h3>
          </div >
          <el-scrollbar
            style="height: 60%"
            wrap-class="scrollbar-wrap"
            id="scrollbar"
            >
          <ul v-for="(item,index) in introduction"
              :key="index" id="c">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.ti}}: {{item.txt}}</p>
          </ul>
          </el-scrollbar>
      </div>
      <!-- 歌手热门歌曲 -->
      <div class="animate__animated animate__fadeIn animate__slow" v-if="show" id="sgtopsong" >
          <h3>歌手TOP歌曲</h3>
          <el-scrollbar
            style="height: 81%"
            wrap-class="scrollbar-wrap"
            id="scrollbar"
            >
             <tbody>
                    <tr class="animate__animated animate__fadeIn animate__fast"
                        id="lists-warp"
                        v-for="(item,index) in songertop"
                        :key="index"
                        >
                        <img @click="playId(item.id)" src="../assets/img/播放.png" alt="">
                        <td @click="playId(item.id)" >{{item.name}}</td>
                        <td>{{item.al.name}}</td>
                    </tr>
                </tbody>
          </el-scrollbar>
          <div id="alladd">
              <img @click="getallsonglists(songertop)" src="../assets/img/全部.png" alt="">
          </div>
      </div>

      <!-- 关闭界面 -->
      <div id="close">
          <h1 @click="changeshow">×</h1>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      songerId: '',
      songername: '',
      sgdetail: [],
      sgtopsongs: [],
      introduction: [],
      show: false,
      picurl: '',
      songertop: []
    }
  },
  watch: {
    //   监听vuex数据变化
    '$store.state.songerid': function (id) {
      this.songerId = id
      this.getsongerdetail()
      this.getsongertop50()
      this.show = !this.show
    },
    '$store.state.sgshow': function () {
      this.getsongerdetail()
      this.getsongertop50()
      this.show = !this.show
    },
    '$store.state.songername': function (name) {
      this.songername = name
    }
  },
  methods: {
    // 关闭界面
    changeshow () {
      this.show = !this.show
      this.picurl = false
    },
    // 将音乐ID传入vuex
    playId (id) {
      this.$store.commit('getplayid', id)
    },
    // 传入全部top歌曲到vuex里保存
    getallsonglists (songertop) {
      var a = this.songertop.length
      for (var i = 0; i < a; i++) {
        this.$store.commit('addsonglists', songertop[i])
      }
    },
    // 获取歌手信息
    getsongerdetail () {
      Axios({
        url: 'http://www.hjmin.com/artist/desc',
        method: 'get',
        params: {
          id: this.songerId
        }
      }).then(res => {
        console.log(res)
        if (res.data.topicData !== null) {
          this.picurl = res.data.topicData[0].coverUrl
        }
        if (res.data.introduction !== null) {
          this.introduction = res.data.introduction
        }
        // eslint-disable-next-line eqeqeq
        if (res.data.introduction.length == 0) {
          this.introduction = {ti: '暂无信息', txt: '暂无信息'}
          console.log(this.introduction)
        }
      })
    },
    // 获取top歌曲
    getsongertop50 () {
      Axios({
        url: 'http://www.hjmin.com/artist/top/song',
        method: 'get',
        params: {
          id: this.songerId
        }
      }).then(res => {
        this.songertop = res.data.songs
      })
    }
  }
}
</script>

<style scoped>
.order-detail {
 @import url('../assets/css/songer.css');
}
</style>
