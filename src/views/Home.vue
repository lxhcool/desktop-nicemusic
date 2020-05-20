<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      bannerBg: ''
    }
  },
  methods: {
    async getBanner() {
      try {
        let res = await this.$api.getBanner()
        console.log(res)
        this.banners = res.banners
        this.bannerBg = res.banners[0].imageUrl
      } catch (error) {
        console.log(error)
      }
    },
    carouselChange(e) {
      console.log(e)
      this.bannerBg = this.banners[e].imageUrl
    }
  },
  mounted() {
    this.getBanner()
  }
}
</script>

<style lang="stylus" scoped>
</style>
