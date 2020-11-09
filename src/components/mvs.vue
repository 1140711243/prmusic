<template>
  <div id="mvs">
    <!-- 推荐mv -->
    <div id="topvideo" class="animate__animated animate__fadeIn animate__slow" >
      <h1>推荐mv</h1>
      <p>Checkout new recommended videos</p>
      <div id="topvideo-warp">
      <el-scrollbar
            style="height: 100%"
            wrap-class="scrollbar"
            >
        <ul>
            <li id="video"
                v-for="(item,index) in videolist"
                :key="index"
                >
                <img @click="videoId(item.id)" :src="item.picUrl" alt="">
                  <dl class="case_info">
                    <dt>
                      <div id="case-warp">
                         <img @click="videoId(item.id)" src="../assets/img/播放.png" alt="">
                      <h3 @click="videoId(item.id)" >{{item.name}}</h3>
                      <h5 @click="videoId(item.id)" >Release video to player</h5>
                      </div>
                    </dt>
                  </dl>
            </li>

        </ul>

      </el-scrollbar>
      </div>
    </div>
    <!-- 网易云mv -->
    <div id="wangyivideo" class="animate__animated animate__fadeIn animate__fast" >
      <h1>网易云mv</h1>
      <p>You May Like ,Checkout new recommended videos</p>
      <div class="block">
        <el-carousel height="160px" width="90vw"
                     :autoplay="false"
                     indicator-position="none"
                     @change="changebtn"
                     >
          <el-carousel-item v-for="item in 10" :key="item">
            <div id="newvideo"
                 v-for="(item,index) in wyvideolist"
                 :key="index"
                  >
              <img @click="videoId(item.id)" v-lazy="item.cover" alt="">
              <h4 @click="videoId(item.id)">{{item.name}}</h4>
              <h5 @click="videoId(item.id)">{{item.artistName}}</h5>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 全部MV -->
    <div id="allvideo" class="animate__animated animate__fadeIn animate__fast" >
      <h1>全部mv</h1>
      <p>All of video ,Checkout new recommended videos</p>
      <div id="allvideo-warp" class="animate__animated animate__fadeIn animate__fast" >
        <el-tabs type="border-card" v-model="activeIndex" >
          <el-tab-pane label="内地" name="china" class="animate__animated animate__fadeIn animate__slow">
            <div class="video-warp"
                 v-for="(item,index) in allvideolist"
                  :key="index"
                >
              <ul>
                <li>
                  <img v-lazy="item.cover" alt="">
                </li>
              </ul>
              <h3 @click="videoId(item.id)" >{{item.name}}</h3>
              <h5 >{{item.artistName}}</h5>
            </div>

            <!-- 页码 -->
             <div class="block" id="card" >
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :total="total"
                  :current-page="page"
                  :page-size="12">
                </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="港台" name="hongkong" class="animate__animated animate__fadeIn animate__slow">
            <div class="video-warp"
                 v-for="(item,index) in allvideolist"
                  :key="index"
                >
              <ul>
                <li>
                  <img v-lazy="item.cover" alt="">
                </li>
              </ul>
              <h3  @click="videoId(item.id)">{{item.name}}</h3>
              <h5  >{{item.artistName}}</h5>
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
          <el-tab-pane label="欧美" name="oumei" class="animate__animated animate__fadeIn animate__slow">
            <div class="video-warp"
                 v-for="(item,index) in allvideolist"
                  :key="index"
                >
              <ul>
                <li>
                  <img v-lazy="item.cover" alt="">
                </li>
              </ul>
              <h3 @click="videoId(item.id)">{{item.name}}</h3>
              <h5 >{{item.artistName}}</h5>
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
          <el-tab-pane label="日本" name="japan" class="animate__animated animate__fadeIn animate__slow">
            <div class="video-warp"
                 v-for="(item,index) in allvideolist"
                  :key="index"
                >
              <ul>
                <li>
                  <img v-lazy="item.cover" alt="">
                </li>
              </ul>
              <h3 @click="videoId(item.id)">{{item.name}}</h3>
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
          <el-tab-pane label="韩国" name="korea" class="animate__animated animate__fadeIn animate__slow">
            <div class="video-warp"
                 v-for="(item,index) in allvideolist"
                  :key="index"
                >
              <ul>
                <li>
                  <img v-lazy="item.cover" alt="">
                </li>
              </ul>
              <h3  @click="videoId(item.id)">{{item.name}}</h3>
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
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {

  data () {
    return {
      videolist: [],
      wyvideolist: [],
      page: 1,
      activeIndex: 'china',
      allvideolist: [],
      area: '内地',
      total: 1
    }
  },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },
  watch: {
    activeIndex () {
      // eslint-disable-next-line no-unused-vars
      this.page = 1
      var area = '内地'
      switch (this.activeIndex) {
        case 'china':area = '内地'; break
        case 'hongkong':area = '港台'; break
        case 'oumei':area = '欧美'; break
        case 'japan':area = '日本'; break
        case 'korea':area = '韩国'; break
        default: break
      }
      this.area = area
      this.getallvideo()
    }
  },
  created () {
    this.getvideo()
    this.getwyvideo()
    this.getallvideo()
  },
  methods: {
    getvideo () {
      Axios({
        url: 'http://www.hjmin.com/personalized/mv',
        method: 'get',
        params: {
        }
      }).then(res => {
        this.videolist = res.data.result
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
    getwyvideo () {
      Axios({
        url: 'http://www.hjmin.com/mv/exclusive/rcmd',
        method: 'get',
        params: {
          limit: 3,
          // // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 3
        }
      }).then(res => {
        this.wyvideolist = res.data.data
      })
    },
    getallvideo () {
      Axios({
        url: 'http://www.hjmin.com/mv/all',
        method: 'get',
        params: {
          area: this.area,
          limit: 12,
          offset: (this.page - 1) * 12
        }
      }).then(res => {
        this.total = res.data.count
        this.allvideolist = res.data.data
      })
    },
    getallvideo2 () {
      Axios({
        url: 'http://www.hjmin.com/mv/all',
        method: 'get',
        params: {
          area: this.area,
          limit: 12,
          offset: (this.page - 1) * 12
        }
      }).then(res => {
        this.allvideolist = res.data.data
      })
    },
    changebtn (val) {
      this.page = val + 1
      this.getwyvideo()
    },
    handleCurrentChange (y) {
      // console.log(val)
      // 获取页码
      this.page = y
      this.getallvideo2()
    }
  }
}
</script>

<style scoped>
.order-detail {
@import url('../assets/css/mvs.css');
}
</style>
