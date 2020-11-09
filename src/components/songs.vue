<template>
  <div id="big-warp">
    <!-- 全部歌手 -->
    <div id="top-warp" class="animate__animated animate__fadeIn animate__slow" >
      <h1>全部歌手</h1>
      <p>Choose your favorite singer</p>
       <el-tabs type="border-card">
          <el-tab-pane label="华语" class="animate__animated animate__fadeIn animate__slow">
            <div id="cha-warp">
              <ul class="cha-songer"
                  v-for="(item,index) in listdata"
                  :key="index"
                  >
                <li>
                  <img v-lazy="item.img1v1Url">
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
              layout="prev, pager, next"
              :total="100"
               @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="欧美（暂不可用）"></el-tab-pane>
          <el-tab-pane label="韩国（暂不可用）"></el-tab-pane>
          <el-tab-pane label="日本（暂不可用）"></el-tab-pane>
        </el-tabs>
    </div>
    <!-- top100排行榜 -->
    <div id="all-warp" class="animate__animated animate__fadeIn animate__slow">
      <h1>华语top100</h1>
      <p>Like your idol</p>
      <el-scrollbar
            style="height: 83%"
            wrap-class="scrollbar-wrap"
            id="scrollbar"
            >
            <div class="infinite-list">
              <div id="s-warp"
                  v-for="(item,index) in toplist"
                  :key="index"
                  >
               <tr>
                 <p>{{index+1}}</p>
                 <td>
                   <img
                    class="animate__animated animate__slideInUp animate__fast"
                    v-lazy="item.img1v1Url" alt="">
                 </td>
                 <td @click="getsongerid(item.id,item.name)">{{item.name}}</td>
                 <td>♥  {{item.score}}</td>
               </tr>

              </div>
            </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>

import Axios from 'axios'
export default {
  data () {
    return {
      listdata: [],
      toplist: [],
      // japanlist: [],
      page: 1,
      total: 0,
      card: '',
      showCard: false,
      count: 0
    }
  },
  created () {
    this.getchina()
    this.gettop()
  },
  methods: {
    getchina () {
      Axios({
        url: 'https://musicapi.leanapp.cn/artist/list',
        method: 'get',
        params: {
          type: -1,
          area: 7,
          limit: 8,
          // 初始的值（页码-1）*每页多少条数据
          offset: (this.page - 1) * 8
        }
      }).then(res => {
        this.listdata = res.data.artists
      })
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
    gettop () {
      Axios({
        url: 'https://musicapi.leanapp.cn/toplist/artist',
        method: 'get',
        params: {
          // type: -1,
          // area: 96,
          // limit: 8,
          // // 初始的值（页码-1）*每页多少条数据
          // offset: (this.page - 1) * 8
        }
      }).then(res => {
        this.toplist = res.data.list.artists
      })
    },
    handleCurrentChange (val) {
      // console.log(val)
      // 获取页码
      this.page = val
      this.getchina()
    }
  }
}
</script>

<style scoped>
.order-detail {
@import url('../assets/css/songs.css');
}
</style>
