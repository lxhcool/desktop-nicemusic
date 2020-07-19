<template>
  <div class="video-detail container">
    <div class="left shadow">
      <h2 class="title flex-row"> 
        <!-- <i class="iconfont nicemv24"></i> -->
        {{ detail.title }}
      </h2>
      <div class="video-container">
        <video :src="videoUrl" controls="controls" controlslist="nodownload">
        </video>
      </div>
      <div class="video-foot">
        <div class="follow">
          <div class="box">
            <i class="iconfont nicexihuan3 icon-like"></i>
            {{ detail.praisedCount }}
          </div>
          <div class="box">
            <i class="iconfont niceshoucang2 icon-collection"></i>
            {{ detail.subscribeCount }}
          </div>
          <div class="box">
            <i class="iconfont nicefenxiang2 icon-share"></i>
            {{ detail.shareCount }}
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="like module shadow">
        <div class="card-header flex-row">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul>
          <li v-for="item of subscribers" :key="item.id">
            <div class="avatar">
              <img :src="item.avatarUrl + '?param=150y150'" :alt="item.nickname" :title="item.nickname">
            </div>
          </li>
        </ul>
      </div>
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item of relatedList" :key="item.id">
            <div class="avatar">
              <img :src="item.coverImgUrl + '?param=150y150'" :alt="item.nickname" :title="item.nickname">
            </div>
            <div class="info">
              <h2 class="ellipsis">{{ item.name }}</h2>
              <span>By. <small> {{ item.creator.nickname }}</small></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul>
          <li class="item" v-for="item of comments" :key="item.time">
            <div class="avatar">
              <img :src="item.user.avatarUrl + '?param=150y150'" :alt="item.user.nickname" :title="item.user.nickname">
            </div>
            <div class="info">
              <h2>{{ item.user.nickname }}<small> · {{utils.formatMsgTime(item.time)}}</small></h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createSong } from '@/model/song'
export default {
  data() {
    return {
      // 歌单详情
      detail: {},
      // 歌单创建者信息
      creator: {},
      // 收藏这个歌单的人
      subscribers: [],
      // 相关歌单
      relatedList: [],
      // 相似歌单
      simiList: [],
      // 评论
      comments: [],
      // 歌曲列表
      songs: [],
      // 收藏这个歌单的人数量
      s: 32,
      videoUrl: ''
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 获取视频播放地址
    async getVideoUrl(id) {
      try {
        let res = await this.$api.getVideoUrl(id)
        if (res.code === 200) {
          console.log(res)
          this.videoUrl = res.urls[0].url
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取视频播放地址
    async getVideoDetail(id) {
      try {
        let res = await this.$api.getVideoDetail(id)
        if (res.code === 200) {
          console.log(res)
          this.detail = res.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {},
  mounted() {
    let id = this.$route.query.id
    console.log(id)
    if (id) {
      this.getVideoUrl(id)
      this.getVideoDetail(id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.video-detail {
  display: flex;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .title {
      margin-bottom: 10px;
      position: relative;
      i {
        font-size: 24px;
        margin-top: 1px;
        margin-left: -3px;
        color: $color-theme;
      }
    }
    .video-container {
      position: relative;
      padding-top: 56.25%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
      }
    }
    .video-foot {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .follow {
        display: flex;
        margin-top: 10px;
        .box {
          width: auto;
          border-radius: 15px;
          padding: 0px 15px;
          background: #f2f2f2;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #161e27;
          cursor: pointer;
          i {
            font-size: 26px;
            color: #161e27;
          }
        }
      }
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .like {
      padding-bottom: 5px;
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        li {
          flex: 0 0 14.285714285714%;
          max-width: 14.285714285714%;
          padding: 0 5px 10px;
          .avatar {
            width: 100%;
            border-radius: 3px;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .related {
      padding-bottom: 5px;
      ul {
        li {
          display: flex;
          margin-bottom: 15px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 3px;
            margin-right: 15px;
            flex-shrink: 0;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
          .info {
            height: 50px;
            width: calc(100% - 50px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h2 {
              font-size: 14px;
              margin-bottom: 10px;
              width: 100%;
            }
            span {
              font-size: 12px;
              color: #a5a5c1;
            }
          }
        }
      }
    }
    .comment {
      ul {
        li {
          padding: 10px 0;
          width: 100%;
          display: flex;
          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            h2 {
              font-size: 15px;
              margin-right: 5px;
              margin-bottom: 10px;
              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 100%;
              font-size: 12px;
              color: #666666;
              line-height: 1.6;
              padding: 5px 10px;
              background: #f5f5f5;
              margin-top: 5px;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .card-header {
      border-left: 3px solid $color-theme;
      height: 20px;
      padding-left: 1rem;
      margin-bottom: 15px;
      font-weight: bold;
      .icon-like {
        font-size: 20px;
      }
    }
  }
}
</style>
