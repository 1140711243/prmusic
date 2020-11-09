<template>
  <div id="top" class="top">
    <!-- 图标 -->
    <div id="biao">
      <img src="../assets/img/图标.png" alt id="tubiao" />
      <p id="biaoti">Music</p>
    </div>
    <!-- 搜索框 -->
    <div id="search-warp" class="search-warp">
      <input placeholder="搜索歌手、音乐" type="text" id="search-txt" v-model="inputValue" @keyup.enter="toSearch"/>
      <img src="../assets/img/搜索.png" alt class="search" id="search" @click="toSearch"/>
    </div>
    <!-- 登陆/注册 -->
    <div class="login">
      <a href="">登陆</a>
      <a href="">注册</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 接收数据
      inputValue: ''
    }
  },
  methods: {
    toSearch () {
      // 判断输入是否为空
      // eslint-disable-next-line eqeqeq
      if (this.inputValue == '') {
        this.$alert('请输入内容', '无内容', {
          dangerouslyUseHTMLString: true
        })
      } else {
        this.$router.push('/result?txt=' + this.inputValue)
        // this.$router.go(0)
        // vue-router编程式导航
      }
    }
  }
}
</script>

<style scoped>
.order-detail {
@import url('../assets/css/top.css');
}
</style>
