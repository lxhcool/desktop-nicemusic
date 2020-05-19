<template>
  <div class="menu"></div>
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
