<template>
  <div id="app">
    <nice-menu></nice-menu>
    <router-view />
    <player-bar></player-bar>
  </div>
</template>

<script>
import NiceMenu from 'components/common/menu/Index'
import PlayerBar from 'components/common/playerBar/Index'
export default {
  components: {
    NiceMenu,
    PlayerBar
  }
}
</script>

<style lang="stylus">
@import './assets/styles/iconfont.css'
</style>
