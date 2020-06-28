<template>
  <div class="home">
    <div class="banner">
      <swiper class="swiper" :options="swiperOption" v-if="bannersInit">
        <swiper-slide v-for="item of banners" :key="item.imageUrl">
          <img :src="item.imageUrl" :alt="item.typeTitle" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      bannerBg: '',
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        centeredSlides: true,
        grabCursor: true,
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next'
      }
    }
  },
  computed: {
    bannersInit() {
      return this.banners.length
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
.banner {
  // width: 730px;
  // height: 284px;

}
</style>
