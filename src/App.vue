<template>
  <div id="app">
    <nice-header></nice-header>
    <router-view />
    <!-- <player-bar></player-bar> -->
    <nice-footer></nice-footer>
    <back-top></back-top>
  </div>
</template>

<script>
import NiceHeader from 'components/common/header/Index'
import BackTop from 'components/common/gotop/Index'
// import PlayerBar from 'components/common/playerBar/Index'
import NiceFooter from 'components/common/footer/Index'
export default {
  components: {
    NiceHeader,
    BackTop,
    NiceFooter
    // PlayerBar
  }
}
</script>

<style lang="stylus">
@import './assets/styles/iconfont.css'
</style>
