<template>
  <div class="home-wrap">
    <banner></banner>
    <div class="recommend-songs">
      <h2 class="title">推荐歌单</h2>
      <div class="list">
        <div class="item">
          <div class="wrapper">
            <a>
              <div class="cover">
                <div class="image">
                  <img
                    src="//pic.xiami.net/xiamiWeb/0957829a6a477f1eaa6425313da324aa/f6fa411349f031437a6d83b20883126a-480x480.gif?x-oss-process=image/resize,limit_0,m_fill,s_330/quality,q_80"
                    loading="lazy"
                  />
                </div>
                <div class="count"><i class="iconfont"></i>17.2万</div>
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
              夏之艳阳｜阳光都灿烂了 你也该笑着放下了
            </h2>
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
    return {}
  },
  components: {
    Banner
  },
  methods: {},
  mounted() {}
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
        }
        &:before {
          border: .5px solid #d6d6d6;
          right: 4px;
          transform: scale(.85);
          transform-origin: 100% 50%;
          z-index: 2;
          border-radius: 2px;
        }
        &:after {
          border: .5px solid #c4c4c4;
          right: 0;
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
            border-radius: 2px;
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
            i {
              font-size: 8px;
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
    }
  }
}
</style>
