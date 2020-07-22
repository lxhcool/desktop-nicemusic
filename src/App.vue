<template>
  <div id="app">
    <nice-header v-if="!$route.meta.isLogin"></nice-header>
    <router-view />
    <!-- <player-bar v-if="!$route.meta.isLogin"></player-bar> -->
    <nice-footer v-if="!$route.meta.isLogin"></nice-footer>
    <back-top v-if="!$route.meta.isLogin"></back-top>
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
