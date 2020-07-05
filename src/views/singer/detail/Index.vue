<template>
  <div class="singer-detail">
    <div class="singer-info flex-layout">
      <div class="top">
        <div class="top-mask">
          <div class="singer-box flex-column flex-center">
            <div class="avatar transition">
              <img :src="detail.img1v1Url + '?param=200y200'" />
              <div class="level flex-center transition" v-show="level">
                <i class="iconfont icon-level" :class="level"></i>
              </div>
            </div>
            <p class="nickname">
              {{ detail.name }}
              <i class="iconfont" :class="gender"></i>
            </p>
            <div class="follow flex-center transition">
              <i class="iconfont niceIcon_add"></i>
              关注TA
            </div>
            <div class="desc ellipsis-two" v-html="detail.briefDesc"></div>
            <ul class="info flex-center">
              <li>
                <p class="num">{{ detail.musicSize }}</p>
                <p class="text">单曲数</p>
              </li>
              <li>
                <p class="num">{{ detail.albumSize }}</p>
                <p class="text">专辑数</p>
              </li>
              <li>
                <p class="num">{{ detail.mvSize }}</p>
                <p class="text">MV数</p>
              </li>
              <li v-show="detail.followeds">
                <p class="num">{{ detail.followeds }}</p>
                <p class="text">粉丝</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-trangle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      singerDetail: {},
      userDetail: {},
      songs: []
    }
  },
  components: {},
  computed: {
    ...mapGetters(['singer']),
    detail() {
      return Object.assign(this.singerDetail, this.userDetail)
    },
    gender() {
      if (this.detail.gender > 0) {
        return this.detail.gender === 1
          ? 'niceCRM_icon_nanxing man'
          : 'niceCRM_icon_nvxing woman'
      } else {
        return ''
      }
    },
    level() {
      if (this.detail.level > 0) {
        return 'nicelevel-' + this.detail.level
      } else {
        return ''
      }
    }
  },
  watch: {},
  methods: {
    // 获取歌手基本信息和热门50首单曲
    async getArtists(id) {
      try {
        let res = await this.$api.getArtists(id)
        // console.log(res)
        if (res.code === 200) {
          this.singerDetail = res.artist
          this.getUserDetail(res.artist.accountId)
        }
        // this.songs = res.result
      } catch (error) {
        console.log(error)
      }
    },
    // 获取(歌手)用户信息
    async getUserDetail(uid) {
      let detail = {}
      try {
        let res = await this.$api.getUserDetail(uid)
        let profile = res.profile
        if (res.code === 200) {
          detail.level = res.level
          detail.followeds = profile.followeds
          detail.gender = profile.gender
          this.userDetail = detail
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    let id = this.$route.query.id || this.singer.id
    if (id) {
      this.getArtists(id)
    }
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.singer-detail {
  margin-top: -20px;
  .singer-info {
    .top {
      position: relative;
      width: 100%;
      height: 580px;
      background: url(../../../assets/images/top-bg.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      .top-mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        .singer-box {
          height: 100%;
          position: relative;
          margin: 0 auto;
          padding-top: 10px;
          text-align: center;
          z-index: 2;
          .avatar {
            width: 120px;
            height 120px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            .level {
              width: 100%;
              height: 25px;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(255, 255, 255, 0.8);
              .icon-level {
                font-size: 25px;
                color: $color-theme;
                margin-left: 8px;
              }
            }
            img {
              width: 120px;
              height 120px;
              border-radius: 50%;
              background: #fff;
              border: 3px solid rgba(255, 255, 255, 0.6);
            }
            &:hover {
              box-shadow: 0px 5px 20px 0px rgba(255, 255, 255, 0.8);
            }
          }
          .nickname {
            margin-top: 20px;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            line-height: 24px;
            i {
              font-size: 20px;
              &.man {
                color: #1f91f2;
              }
              &.woman {
                color: #fc7265;
              }
            }
          }
          .follow {
            margin: 24px 0 30px;
            padding: 0;
            height: 36px;
            width: 96px;
            font-size: 12px;
            line-height: 36px;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.6);
            cursor: pointer;
            border-radius: 18px;
            &:hover {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid #fff;
            }
            i {
              margin-right: 5px;
            }
          }
          .desc {
            margin: 0 auto 24px;
            width: 740px;
            height: 48px;
            font-size: 14px;
            color: rgba(255,255,255,.6);
            line-height: 24px;
          }
          .info {
            margin: 0 auto;
            width: 100%;
            li {
              margin: 0 50px;
              text-align: center;
              .num {
                margin-bottom: 8px;
                font-size: 24px;
                line-height: 24px;
                color: #fff;
              }
              .text {
                font-size: 14px;
                line-height: 14px;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }
      }
      .bottom-trangle {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 137px;
        background: url(../../../assets/images/arrow-lr.png);
        background-position: center;
        z-index: 1;
      }
    }
    .info {
      h2 {
        font-size: 20px;
        font-weight: bold;
        margin-top: 5px;
      }
      .tag {
        margin-top: 15px;
        li {
          padding: 0 15px;
          height: 25px;
          // border: 1px solid $color-theme;
          // background: #fff;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          .icon-level {
            font-size: 24px;
            color: $color-theme;
            margin-left: 3px;
          }
          &.birst {
            i {
              font-size: 18px;
              color: $color-theme;
              margin-right: 5px;
            }
            color: $color-theme;
          }
        }
      }
    }
  }
}
</style>
