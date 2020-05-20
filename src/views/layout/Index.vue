<template>
  <div class="layout">
    <nice-header></nice-header>
    <nice-menu></nice-menu>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NiceHeader from 'components/common/header/Index'
import NiceMenu from 'components/common/menu/Index'
export default {
  data() {
    return {}
  },
  components: {
    NiceHeader,
    NiceMenu
  }
}
</script>

<style lang="stylus" scoped>
.layout {
  width: 100%;
  height 100%;
  background: #f6f4f9;
  .container {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 180px;
    z-index: 998;
    width: auto;
    overflow-y: auto;
    padding: 15px;
  }
}
</style>
