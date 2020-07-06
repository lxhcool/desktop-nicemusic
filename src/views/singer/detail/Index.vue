<template>
  <div class="singer-detail">
    <div class="singer-info">
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
      <div class="bottom container">
        <ul class="nav flex-center">
          <li
            v-for="item of navList"
            :key="item.id"
            :class="active == item.id ? 'active' : ''"
            @click="tabItem(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="content">
          <artist-list :songs="songs" v-show="active === 1" />
          <album-list :singerId="singerId" v-show="active === 2" />
          <div class="mv-box">
            <ul class="mv-list">
              <li v-for="item of mvs" :key="item.id">
                <div class="cover">
                  <div class="image">
                    <el-image
                      :key="item.imgurl16v9 + '?param=830y467'"
                      :src="item.imgurl16v9 + '?param=830y467'"
                      lazy
                    >
                      <div
                        slot="placeholder"
                        class="image-slot flex-center flex-column"
                      >
                        <i class="iconfont niceicon-3"></i>
                      </div>
                      <div slot="error" class="image-slot flex-center">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                  <div class="count">
                    <i class="arrow"></i>
                    <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
                  </div>
                  <div class="action">
                    <button class="play flex-center" title="播放">
                      <i class="iconfont nicebofang1"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="info-box">
            歌手详情
          </div>
          <div class="simi-box">
            相似歌手
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createSong } from '@/model/song'
import ArtistList from 'components/common/artistList/Index'
import AlbumList from 'components/common/albumList/Index'
export default {
  data() {
    return {
      singerDetail: {},
      userDetail: {},
      songs: [],
      mvs: [],
      // 歌手id
      singerId: '',
      navList: [
        {
          name: '作品',
          id: 1
        },
        {
          name: '专辑',
          id: 2
        },
        {
          name: 'MV',
          id: 3
        },
        {
          name: '歌手详情',
          id: 4
        },
        {
          name: '相似歌手',
          id: 5
        }
      ],
      active: 3
    }
  },
  components: {
    ArtistList,
    AlbumList
  },
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
    // 切换歌手信息
    tabItem(id) {
      this.active = id
    },
    // 获取歌手基本信息和热门50首单曲
    async getArtists(id) {
      try {
        let res = await this.$api.getArtists(id)
        if (res.code === 200) {
          this.singerDetail = res.artist
          this.getUserDetail(res.artist.accountId)
        }
        this.songs = this._normalizeSongs(res.hotSongs)
        console.log(this.songs)
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
    },
    // 获取歌手MV
    async getArtistMv(id) {
      try {
        let res = await this.$api.getArtistMv(id)
        if (res.code === 200) {
          console.log(res)
          this.mvs = res.mvs
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 处理歌曲
    _normalizeSongs(list) {
      let ret = []
      list.map(item => {
        if (item.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  created() {
    let id = this.$route.query.id || this.singer.id
    if (id) {
      this.singerId = id
      this.getArtists(id)
      this.getArtistMv(id)
    }
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.avatar >>> img {
  border-radius: 5px;
}
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
    .bottom {
      .nav {
        margin: 30px 0;
        li {
          margin: 0 20px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          &.active {
            color: $color-theme;
          }
        }
      }
      .content {
        .mv-box {
          .mv-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            li {
              padding: 0 15px 30px;
              flex: 0 0 25%;
              max-width: 25%;
              .cover {
                position: relative;
                z-index: 2;
                padding-top: 56%;
                border-radius: 2px;
                background-color: #000;
                .image {
                  position: absolute;
                  top: 0;
                  left: 0;
                  overflow: hidden;
                  width: 100%;
                  height: 100%;
                  border-radius: 2px;
                }
                .count {
                  position: absolute;
                  right: 16px;
                  top: 1px;
                  height: 24px;
                  padding-left: 9px;
                  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
                  background-size: cover;
                  color: #fff;
                  font-size: 12px;
                  font-weight: 700;
                  line-height: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .arrow {
                    display: block;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 4px 0 4px 6px;
                    border-color: transparent transparent transparent #ffffff;
                    margin-right: 5px;
                  }
                  &:after {
                    content: '';
                    position: absolute;
                    right: -14px;
                    top: 0;
                    width: 14px;
                    height: 24px;
                    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
                    background-size: cover;
                  }
                }
                .action {
                  display: none;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  -webkit-transform: translate(-50%, -50%);
                  -ms-transform: translate(-50%, -50%);
                  transform: translate(-50%, -50%);
                  .play {
                    width: 32px;
                    height: 32px;
                    padding: 0;
                    border: none;
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                    background-color: $color-theme;
                    i {
                      font-size: 12px;
                    }
                  }
                }
                &:hover {
                  .action {
                    display: flex;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
