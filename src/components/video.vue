<template>
  <div v-if="videoshow" id="video-warp" class="animate__animated animate__fadeIn animate__fast">
      <!-- 视频播放 -->
      <div id="play-video" class="animate__animated animate__fadeInDown animate__fast">
          <video autoplay @error="playerror" id="video-win"
                 controls
                 :src="videourl"></video>
      </div>
      <!-- 评论 -->
      <div id="comment" class="animate__animated animate__fadeIn animate__slow">
        <el-scrollbar
               style="height: 90%"
               wrap-class="scrollbar-wrap"
               id="scrollbar"
               >
          <div id="detail">
              <h3>{{videoname}}</h3>
              <p id="art">发布者:{{videoarname}}</p>
              <div id="count">
                  <p><img src="../assets/img/时间.png" alt=""> 发布时间:{{publishtime}}</p>
                  <p><img src="../assets/img/评论.png" alt=""> 评论人数:{{commentcount}}</p>
                  <p><img src="../assets/img/心.png" alt=""> 点赞人数:{{likecount}}</p>
              </div>
          </div >
          <div id="com-warp">
            <div id="com-swarp"
                 v-for="(item,index) in videocomment"
                 :key="index"
                 >
              <img v-lazy="item.user.avatarUrl" alt="">
              <h3>{{item.user.nickname}}</h3>
              <p>{{item.content}}</p>
              <p id="time">评论时间：隐藏</p>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!-- 相似mv -->
      <div id="similar-video" class="animate__animated animate__fadeInDown animate__fast">
          <h2>相似mv</h2>
          <el-scrollbar
               @scroll="scroll(a)"
               style="height: 90%"
               wrap-class="scrollbar-wrap"
               id="scrollbar"
               >
            <div
                v-for="(item,index) in similists"
                :key="index"
                id="simivideo-warp">
                <img  @click="videoId(item.id)" v-lazy="item.cover" alt="">
                <div id="video-tit">
                    <h3 @click="videoId(item.id)">{{item.name}}</h3>
                    <p>{{item.artistName}}</p>
                </div>
            </div>
          </el-scrollbar>
      </div>
      <!-- 关闭窗口 -->
      <div id="guanbi" class="animate__animated animate__fadeIn animate__slow">
          <p @click="changevideoshow">×</p>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      videoshow: false,
      videoid: '',
      videourl: '',
      videoname: '',
      videoarname: '',
      videocomment: [],
      commentcount: '',
      likecount: '',
      publishtime: '',
      similists: []
    }
  },
  watch: {
    '$store.state.videoid': function (id) {
      this.videoid = id
      this.videoshow = true
      this.getvideourl()
      this.getvideodetail()
      this.getsimivideo()
      this.pauseplay()
    },
    '$store.state.videoshow': function () {
      this.videoshow = true
      this.getvideourl()
      this.getvideodetail()
      this.getsimivideo()
      this.pauseplay()
    }
  },
  created () {
    // this.getvideourl()
    // this.getvideodetail()
    // this.gettopvideo()
  },
  methods: {
    //  获取视频地址
    getvideourl () {
      Axios({
        url: 'http://www.hjmin.com/mv/url',
        method: 'get',
        params: {
          id: this.videoid
        }
      }).then(res => {
        this.videourl = res.data.data.url
      })
    },
    // 播放video时关闭音乐播放
    pauseplay () {
      this.$store.commit('changeplaying')
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
    changevideoshow () {
      this.videoshow = false
      this.videoname = ''
      this.videoarname = ''
      this.videocomment = []
      this.commentcount = ''
      this.likecount = ''
      this.publishtime = ''
      this.similists = []
    },
    playerror () {
      this.$message({
        message: '很抱歉播放错误，视频疑似丢失，请选择别的视频进行播放',
        type: 'warning'
      })
    },
    // 获取视频信息
    getvideodetail () {
      Axios({
        url: 'http://www.hjmin.com/mv/detail',
        method: 'get',
        params: {
          mvid: this.videoid
        }
      }).then(res => {
        this.videoname = res.data.data.name
        this.videoarname = res.data.data.artistName
        this.commentcount = res.data.data.commentCount
        this.likecount = res.data.data.likeCount
        this.publishtime = res.data.data.publishTime
        this.getvideocomment()
      })
    },
    // 获取相似视频
    getsimivideo () {
      Axios({
        url: 'http://www.hjmin.com/simi/mv',
        method: 'get',
        params: {
          mvid: this.videoid
        }
      }).then(res => {
        this.similists = res.data.mvs
      })
    },
    // 获取部分评论
    getvideocomment () {
      Axios({
        url: 'http://www.hjmin.com/comment/mv',
        method: 'get',
        params: {
          id: this.videoid,
          limit: 100
        }
      }).then(res => {
        this.videocomment = res.data.comments
      })
    }
  }
}
</script>

<style scoped>
.order-detail {
 @import url('../assets/css/video.css');
}
</style>
