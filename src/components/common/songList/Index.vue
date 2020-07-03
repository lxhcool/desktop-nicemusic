<template>
  <div class="list">
    <div class="item" v-for="(item, index) of songList" :key="item.id">
      <div class="wrapper flex-center shadow">
        <h2 class="number">{{ utils.formatZero(index + 1, 2) }}</h2>
        <div class="avatar">
          <el-image
            :key="item.picUrl + '?param=300y300'"
            :src="item.picUrl + '?param=300y300'"
            lazy
          >
            <div slot="placeholder" class="image-slot flex-center flex-column">
              <i class="iconfont niceicon-3"></i>
              <p>加载中<span class="dot">...</span></p>
            </div>
            <div slot="error" class="image-slot flex-center">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="layer flex-center">
            <i class="iconfont niceicon-9"></i>
          </div>
        </div>
        <div class="info">
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="flex-row ellipsis">
            <span
              class="author"
              v-for="artist of item.song.artists"
              :key="artist.id"
            >
              {{ artist.name }}
            </span>
          </p>
        </div>
        <p class="album">《{{ item.song.album.name }}》</p>
        <p class="duration transition">03:49</p>
        <div class="tools transition">
          <i class="iconfont niceOutlined_Play"></i>
          <i class="iconfont niceadd"></i>
          <i class="iconfont niceicon-heart"></i>
          <i class="iconfont nicexiazai"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 歌单列表组件
export default {
  data() {
    return {}
  },
  props: {
    songList: {
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
        z-index: -1;
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
        width: 15%;
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
          &:after{
            content:'/';
            margin:0 3px;
          }
          &:last-child {
            &:after{
              content:'';
            }
          }
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
      }
      .tools {
        width: 25%;
        height: 100%;
        padding-left: 4.28%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
</style>
