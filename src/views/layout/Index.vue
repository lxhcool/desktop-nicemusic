<template>
  <div class="layout">
    <nice-header></nice-header>
    <div class="fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NiceHeader from 'components/common/header/Index'

export default {
  data() {
    return {}
  },
  components: {
    NiceHeader
  }
}
</script>

<style lang="stylus" scoped>
.layout {
  width: 100%;
  height 100%;
  background: #f8f9ff;
  z-index: 998;
  width: auto;
  overflow-y: auto;
  margin: 0 0 0 208px;
  padding: 24px;
  min-width: 1024px;
  .fluid {
    padding: 18px 0px;
  }
}
</style>
