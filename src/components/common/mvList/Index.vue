<template>
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
          <div class="foot">
            <p>{{ item.artistName }}</p>
            <p>{{ utils.formatTime(item.duration) }}</p>
          </div>
        </div>
        <div class="info">
          <h2 class="title ellipsis">{{ item.name }}</h2>
          <!-- <div class="author">{{ item.artistName }}</div> -->
          <div class="time author">
            {{ utils.dateFormat(item.publishTime, 'YYYY-MM-DD') }}
          </div>
        </div>
      </li>
    </ul>
    <div v-if="loadStatus" class="load-bottom">
      <loading />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    mvs: {
      type: Array
    },
    loadStatus: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  components: {},
  computed: {
    noMore() {
      return !this.loading
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.mv-box {
  padding: 15px 0;
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
        .foot {
          width: 100%;
          height: 35px;
          background: rgba(0,0,0, 0.6);
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          p {
            color: #ffffff;
          }
        }
        &:hover {
          .action {
            display: flex;
          }
        }
      }
      .info {
        margin-top: 15px;
        .title {
          font-size: 14px;
          font-weight: 500;
          display: block;
          line-height: 1.3;
        }
        .author {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
