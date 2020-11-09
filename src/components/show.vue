<template>
    <el-carousel height="500px" id="show" >
      <el-carousel-item v-for="(item,index) in pic"
                        :key="index">
        <ul>
            <li id="picshow">
              <img :src="item.imageUrl" alt="">
        <dl class="case_info">
          <dt>
            <div id="case-warp">
            </div>
          </dt>
        </dl>
          </li>

        </ul>
      </el-carousel-item>

    </el-carousel>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      pic: []
    }
  },
  created () {
    Axios({
      url: 'http://www.hjmin.com/banner',
      method: 'get',
      params: {}
    }).then((res) => {
      this.pic = res.data.banners
      console.log(res)
    })
  }
}
</script>

<style scoped>
.order-detail {
@import url('../assets/css/show.css');
}
</style>
