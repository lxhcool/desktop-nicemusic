<template>
  <div class="artist-box">
    <div class="artist-head">
      <ul class="flex-row">
        <li class="head-num">序号</li>
        <li class="head-name">歌曲</li>
        <li class="head-album">专辑</li>
        <li class="head-duration">时长</li>
      </ul>
    </div>
    <ul class="artist-body artist-list">
      <li class="flex-row item" v-for="(item, index) of songs" :key="item.id">
        <div class="song-rank flex-row">
          <div class="num">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="avatar">
            <el-image
              :key="item.image + '?param=100y100'"
              :src="item.image + '?param=100y100'"
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
        </div>
        <div class="song-name">
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="author flex-row ellipsis">{{ item.singer }}</p>
        </div>
        <div class="song-album ellipsis">
          <span :title="item.album">{{ item.album }}</span>
        </div>
        <div class="song-duration transition">
          {{ item.duration }}
        </div>
        <div class="song-tools transition">
          <i class="iconfont niceOutlined_Play"></i>
          <i class="iconfont niceadd"></i>
          <i class="iconfont niceicon-heart"></i>
          <i class="iconfont nicexiazai"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    songs: {
      type: Array
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.artist-box {
  .artist-head {
    height: 46px;
    line-height: 46px;
    background: #fafafa;
    color: #999;
    ul {
      li {
        width: 23%;
        font-weight: bold;
        &.head-num {
          width: 16.13%;
          padding-left: 2.81%;
        }
        &.head-name {
          width: 41.83%;
          flex-shrink: 1;
        }
        &.head-album {
          width: auto;
          flex: 1;
        }
        &.head-duration {
          width: 6.56%;
        }
      }
    }
  }
  .artist-body {
    background: #fff;
    .item {
      height: 70px;
      line-height: 22px;
      color: #666;
      position: relative;
      transition: all 0.6s;
      &:nth-child(odd) {
        background: #f5f5f5;
      }
      .song-rank {
        position: relative;
        padding-left: 3.18%;
        min-width: 180px;
        padding-right: 20px;
        width: 16.13%;
        .num {
          flex-shrink: 0;
          width: 20px;
          height: 33px;
          color: #333;
          line-height: 33px;
          text-align: center;
          font-weight: 700;
        }
        .avatar {
          flex-shrink: 0;
          width: 54px;
          height: 54px;
          margin-left: 30%;
          border-radius: 5px;
          box-shadow: 0px 5px 60px 0px rgba(17,58,93,0.1);
          .el-image {
            img {
              border-radius: 5px;
            }
          }
        }
      }
      .song-name {
        width: 41.83%;
        padding-right: 2.43%;
        color: #333;
        .name {
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 6px;
        }
        .author {
          font-size: 12px;
          color: #999999;
        }
      }
      .song-album {
        flex: 1;
        cursor: pointer
        span {
          font-weight: bold;
        }
      }
      .song-duration {
        width: 6.56%;
        padding-right: 3.93%;
      }
      .song-tools {
        width: 17.7%;
        padding-left: 4.28%;
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;
        opacity: 0;
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
        background: #f5f5f5;
        .song-duration {
          opacity: 0;
        }
        .song-tools {
          opacity: 1;
        }
      }
    }
  }
}
</style>
