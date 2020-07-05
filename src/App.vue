<template>
  <div id="app">
    <nice-header></nice-header>
    <!-- <nice-menu></nice-menu> -->
    <router-view />
    <!-- <player-bar></player-bar> -->
    <back-top></back-top>
  </div>
</template>

<script>
import NiceHeader from 'components/common/header/Index'
import BackTop from 'components/common/gotop/Index'
// import NiceMenu from 'components/common/menu/Index'
// import PlayerBar from 'components/common/playerBar/Index'
export default {
  components: {
    NiceHeader,
    BackTop
    // NiceMenu,
    // PlayerBar
  }
}
</script>

<style lang="stylus">
@import './assets/styles/iconfont.css'
</style>
