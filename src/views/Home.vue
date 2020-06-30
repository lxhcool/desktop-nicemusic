<template>
  <div class="home-wrap">
    <banner></banner>
    <div class="recommend-songs">
      <h2 class="title">推荐歌单</h2>
      <div class="list">
        <div class="item" v-for="item of personalizeds" :key="item.id">
          <div class="wrapper">
            <a>
              <div class="cover">
                <div class="image">
                  <img :src="item.picUrl" />
                </div>
                <div class="count">
                  <i class="arrow"></i>
                  <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
                </div>
                <!-- <div class="action">
                  <button class="play" title="播放">
                    <i class="iconfont"></i>
                  </button>
                </div> -->
              </div>
            </a>
          </div>
          <div class="info">
            <h2 class="name ellipsis-two">
              {{ item.name }}
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-music">
      <h2 class="title">推荐新歌曲</h2>
      <div class="list">
        <div class="item" v-for="(item, index) of songs" :key="item.id">
          <div class="wrapper flex-center shadow">
            <div
              class="bg"
              :style="{ backgroundImage: 'url(' + item.picUrl + ')' }"
            ></div>
            <h2 class="number">{{ utils.formatZero(index + 1, 2) }}</h2>
            <div class="avatar">
              <img :src="item.picUrl" />
              <div class="layer flex-center">
                <i class="iconfont niceicon-9"></i>
              </div>
            </div>
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p
                class="author"
                v-for="artist of item.song.artists"
                :key="artist.id"
              >
                {{ artist.name }}
              </p>
            </div>
            <p class="album">{{ item.song.album.name }}</p>
            <p class="duration">03:49</p>
            <div class="tools">
              <i class="iconfont niceOutlined_Play"></i>
              <i class="iconfont niceadd"></i>
              <i class="iconfont niceicon-heart"></i>
              <i class="iconfont nicexiazai"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from 'components/home/banner/Index'
export default {
  name: 'Home',
  data() {
    return {
      limit: 16,
      personalizeds: [],
      songs: []
    }
  },
  components: {
    Banner
  },
  methods: {
    // 获取推荐歌单
    async getPersonalized() {
      try {
        let res = await this.$api.getPersonalized(this.limit)
        console.log(res)
        this.personalizeds = res.result
      } catch (error) {
        console.log(error)
      }
    },

    // 获取推荐新音乐
    async getNewSongs() {
      try {
        let res = await this.$api.getNewSongs()
        console.log(res)
        this.songs = res.result
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getPersonalized()
    this.getNewSongs()
  }
}
</script>

<style lang="stylus" scoped>
.recommend-songs {
  margin-top: 40px;
  .title {
    margin: 0 0 15px 0;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    .item {
      flex: 0 0 12.5%;
      max-width: 12.5%;
      padding: 0 15px 30px;
      .wrapper {
        position: relative;
        padding-right: 10px;
        &:before, &:after {
          content: "";
          width: 100%;
          height: 100%;
          background-color: #d9d9d9;
          position: absolute;
          top: 0;
          transition: all 0.4s;
        }
        &:before {
          border: .5px solid #d6d6d6;
          right: 6px;
          transform: scale(.85);
          transform-origin: 100% 50%;
          z-index: 2;
          border-radius: 2px;
        }
        &:after {
          border: .5px solid #c4c4c4;
          right: 4px;
          transform: scale(.73);
          transform-origin: 100% 50%;
          z-index: 1;
          border-radius: 2px;
          opacity: .5;
        }
        .cover {
          position: relative;
          z-index: 2;
          padding-top: 100%;
          border-radius: 2px;
          background-color: #d9d9d9;
          .image {
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            &:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 2px;
              -webkit-box-shadow: 1px 1px 0 rgba(0,0,0,.05) inset, -1px -1px 0 rgba(0,0,0,.05) inset;
              box-shadow: inset 1px 1px 0 rgba(0,0,0,.05), inset -1px -1px 0 rgba(0,0,0,.05);
            }
            img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 100%;
            }
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
              content: "";
              position: absolute;
              right: -14px;
              top: 0;
              width: 14px;
              height: 24px;
              background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
              background-size: cover;
            }
          }
        }
      }
      .info {
        margin-top: 15px;
        .name {
          font-size: 14px;
        }
      }
      &:hover {
        .wrapper {
          &:before, &:after {
            background: rgba(250, 40, 0, 0.1);
          }
          &:before {
            right: 4px;
          }
          &:after {
            right: 0px;
          }
        }
      }
    }
  }
}
.recommend-music {
  .title {
    margin: 0 0 15px 0;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    .item {
      flex: 0 0 50%;
      max-width: 50%;
      margin-bottom: 20px;
      height: 80px;
      padding: 0 15px 30px;
      .wrapper {
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        justify-content: start;
        padding: 0 4%;
        border-radius: 5px;
        position: relative;
        .bg {
          width: 100%;
          height: 80%
          position: absolute;
          background-repeat: no-repeat;
          background-size: cover;
          top: 50%;
          left: 0;
          margin: -32px 0 0 0;
          opacity: 0.08;
          filter: blur(10px);
        }
        .number {
          font-size: 15px;
          color: #000000;
          margin-right: 30px;
        }
        .avatar {
          width: 55px;
          height: 55px;
          border-radius: 5px;
          position: relative;
          margin-right: 30px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
          .layer {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 5px;
            opacity: 0;
            i {
              color: #ffffff;
              font-size: 26px;
              font-weight: 100;
            }
          }
        }
        .info {
          .name {
            font-size: 14px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .author {
            font-size: 12px;
            color: #666666;
            font-weight: bold;
          }
        }
        .album {
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          margin-left: 80px;
          flex: 1;
        }
        .duration {
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          margin-left: 80px;
          transition: all 0.4s;
        }
        .tools {
          width: 25%;
          height: 100%;
          padding-left: 4.28%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          opacity: 0;
          transition: all 0.4s;
          position: absolute;
          right: 4%;
          top: 0;
          i {
            font-size: 20px;
            cursor: pointer;
            display: block;
            color: #666666;
          }
        }
        &:hover {
          .duration {
            opacity: 0;
          }
          .tools {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
