<template>
  <div class="menu">
    <h2>发现音乐</h2>
    <p>推荐</p>
    <p>排行榜</p>
    <p>歌单</p>
    <p>歌手</p>
    <p>视频</p>
    <h2>我的音乐</h2>
    <p>我的歌手</p>
    <p>我的视频</p>
    <p>创建的歌单</p>
    <p>收藏的歌单</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.menu {
  width: 160px;
  height: 100%;
  background: #0d122f;
  position: fixed;
  overflow: auto;
  padding: 0 24px;
  z-index: 9999;
}
</style>
