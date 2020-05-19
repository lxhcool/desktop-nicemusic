<template>
  <div class="home"></div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    async getBanner() {
      try {
        let res = await this.$api.getBanner()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getBanner()
  }
}
</script>
