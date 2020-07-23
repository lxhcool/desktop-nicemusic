<template>
  <div class="recommend-music">
    <h2 class="title">推荐新歌曲</h2>
    <song-list :songList="songs"></song-list>
  </div>
</template>

<script>
import songList from 'components/common/songList/Index'
export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    songList
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取推荐新音乐
    async getNewSongs() {
      try {
        let res = await this.$api.getNewSongs()
        // console.log(res)
        this.songs = res.result
      } catch (error) {
        console.log(error)
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getNewSongs()
  }
}
</script>

<style lang="stylus" scoped>
.recommend-music {
  .title {
    margin: 0 0 15px 0;
  }
}
</style>
