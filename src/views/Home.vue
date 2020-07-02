<template>
  <div class="home-wrap">
    <banner></banner>
    <recommend-songs></recommend-songs>
    <recommend-music></recommend-music>
  </div>
</template>

<script>
import Banner from 'components/home/banner/Index'
import RecommendSongs from 'components/home/recommend-songs/Index'
import RecommendMusic from 'components/home/recommend-music/Index'
export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    Banner,
    RecommendSongs,
    RecommendMusic
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="stylus" scoped></style>
