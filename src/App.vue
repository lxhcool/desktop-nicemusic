<template>
  <div id="app">
    <nice-menu></nice-menu>
    <router-view />
  </div>
</template>

<script>
import NiceMenu from 'components/common/menu/Index'
export default {
  components: {
    NiceMenu
  }
}
</script>

<style lang="stylus">
@import './assets/styles/iconfont.css'
</style>
