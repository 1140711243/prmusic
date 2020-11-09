<template>
  <div id="warp">
    <div class="btn">
      <mu-button flat @click="discovery" id="mybtn" >发现音乐</mu-button>
    </div>
    <div class="btn">
      <mu-button flat @click="playlists" id="mybtn">推荐歌单</mu-button>
    </div>
    <div class="btn">
      <mu-button flat @click="songs" id="mybtn" >推荐歌手</mu-button>
    </div>
    <div class="btn">
      <mu-button flat @click="mvs" id="mybtn" >推荐MV</mu-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true
  }),
  methods: {
    discovery () {
      this.$router.push('/discovery')
    },
    playlists () {
      this.$router.push('/playlists')
    },
    songs () {
      this.$router.push('/songs')
    },
    mvs () {
      this.$router.push('/mvs')
    }
  }

}
</script>

<style scoped>
.order-detail {
@import url('../assets/css/list.css');
}
</style>
