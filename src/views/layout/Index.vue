<template>
  <div class="layout">
    <nice-menu></nice-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import NiceMenu from 'components/common/menu/Index'
export default {
  data() {
    return {}
  },
  components: {
    NiceMenu
  }
}
</script>

<style lang="stylus" scoped>
.layout {
  width: 100%;
  height 100%;
  background: #0e1436;
}
</style>
