<template>
  <div class="playlist-detail container">
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <img :src="detail.coverImgUrl + '?param=200y200'" alt="" />
        </div>
        <div class="info">
          <div class="title ellipsis-two">{{ detail.name }}</div>
          <div class="user flex-row">
            <div class="avatar">
              <img :src="creator.avatarUrl + '?param=100y100'" alt="" />
            </div>
            <p class="nickname">{{ creator.nickname }}</p>
            <p class="createTime">
              {{ utils.dateFormat(detail.createTime, 'YYYY-MM-DD') }}创建
            </p>
          </div>
          <div class="tag flex-row">
            标签：<a
              v-for="item of detail.tags"
              :key="item"
              @click="tag(item)"
              >{{ item }}</a
            >
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span
              @click="openDesc(detail.name, detail.description)"
              class="flex-row"
              v-if="txtLength(detail.description) > 50"
              >全部<i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"
              ></i
            ></span>
          </div>
        </div>
      </div>
      <div class="content">
        <artist-list :songs="songs" />
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
              <img
                :src="item.avatarUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
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
              <img
                :src="item.coverImgUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
            <div class="info">
              <h2 class="ellipsis">{{ item.name }}</h2>
              <span
                >By. <small> {{ item.creator.nickname }}</small></span
              >
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
              <img
                :src="item.user.avatarUrl + '?param=150y150'"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div>
            <div class="info">
              <h2>
                {{ item.user.nickname
                }}<small> · {{ utils.formatMsgTime(item.time) }}</small>
              </h2>
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
import ArtistList from 'components/common/artistList/Index'
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
      s: 32
    }
  },
  components: {
    ArtistList
  },
  computed: {
    txtLength() {
      return function(txt) {
        if (txt) {
          return txt.length
        }
      }
    }
  },
  watch: {},
  methods: {
    // 标签跳转
    tag(cat) {
      this.$router.push({
        name: 'playlist',
        query: {
          cat
        }
      })
    },
    // 获取歌单详情
    async getPlayListDetail(id, s) {
      try {
        let res = await this.$api.getPlayListDetail(id, s)
        if (res.code === 200) {
          res.playlist.description = res.playlist.description.replace(
            /(\r\n|\n|\r)/gm,
            '<br />'
          )
          this.detail = res.playlist
          this.creator = res.playlist.creator
          let trackIds = res.playlist.trackIds
          // 数量超过一千，进行分割
          let arrLength = 1000
          let sliceArr = []
          for (let i = 0; i < trackIds.length; i += arrLength) {
            sliceArr.push(trackIds.slice(i, i + arrLength))
          }
          this.getSongDetail(sliceArr)
        }
      } catch (error) {
        this.$message.error('error')
      }
    },
    // 获取歌曲列表
    async getSongDetail(sliceArr) {
      let before = sliceArr[0]
      let after = sliceArr[1]
      let timestamp = new Date().valueOf()
      let beforeIds = []
      let afterIds = []
      before.map(item => {
        beforeIds.push(item.id)
      })
      beforeIds = beforeIds.join(',')
      if (after) {
        after.map(item => {
          afterIds.push(item.id)
        })
        afterIds = afterIds.join(',')
      }
      try {
        if (after) {
          let beforeRes = await this.$api.getSongDetail(beforeIds, timestamp)
          let afterRes = await this.$api.getSongDetail(afterIds, timestamp + 1)
          let res = beforeRes.songs.concat(afterRes.songs)
          this.songs = this._normalizeSongs(res)
        } else {
          let beforeRes = await this.$api.getSongDetail(beforeIds, timestamp)
          let res = beforeRes.songs
          this.songs = this._normalizeSongs(res)
        }
      } catch (error) {
        this.$message.error('error')
      }
    },
    // 获取相关歌单推荐
    async getRelatedPlaylist(id) {
      try {
        let res = await this.$api.getRelatedPlaylist(id)
        if (res.code === 200) {
          this.relatedList = res.playlists
        }
      } catch (error) {
        this.$message.error('error')
      }
    },
    // 获取歌单收藏者
    async getSubscribersPlaylist(id) {
      let params = {
        id,
        limit: 28,
        offset: 0
      }
      try {
        let res = await this.$api.getSubscribersPlaylist(params)
        if (res.code === 200) {
          this.subscribers = res.subscribers
        }
      } catch (error) {
        this.$message.error('error')
      }
    },
    // 获取评论
    async getCommentPlaylist(id) {
      let params = {
        id,
        limit: 28,
        offset: 0
      }
      try {
        let res = await this.$api.getCommentPlaylist(params)
        if (res.code === 200) {
          if (res.hotComments.length > 0) {
            this.comments = res.hotComments
          } else {
            this.comments = res.comments
          }
        }
      } catch (error) {
        this.$message.error('error')
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
    },
    // 打开歌单介绍详情
    openDesc(title, content) {
      this.$alert(content, title, {
        closeOnClickModal: true,
        customClass: 'descBox',
        showConfirmButton: false,
        dangerouslyUseHTMLString: true
      })
    }
  },
  created() {},
  mounted() {
    let id = this.$route.query.id
    if (id) {
      this.getPlayListDetail(id, 100)
      this.getRelatedPlaylist(id)
      this.getSubscribersPlaylist(id)
      this.getCommentPlaylist(id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.playlist-detail {
  display: flex;
  align-items: flex-start;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .top {
      display: flex;
      > .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }
        &::before {
          content: '';
          width: 95%;
          height: 95%;
          background: rgba(0, 0, 0, 0.2);
          display: block;
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          border-radius: 8px;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 24px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
          margin-top: 10px;
        }
        .tag {
          margin-top: 15px;
          margin-bottom: 15px;
          a {
            color: #fff;
            background: $color-theme;
            margin-right: 15px;
            font-size: 12px;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 15px;
            &::after {
              // content: '，'
            }
            &:last-child {
              &::after {
                content: ''
              }
            }
          }
        }
        .user {
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 15px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              position: relative;
            }
          }
          .nickname {
            font-size: 14px;
            margin-right: 30px;
          }
          .createTime {
            font-size: 14px;
            color: #808080;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          span {
            flex-shrink: 0;
            color: $color-theme;
            cursor: pointer;
          }
          p {
            line-height: 1.6;
            font-weight: 400;
            flex: 1;
            font-size: 14px;
          }
        }
      }
    }
    .content {
      margin-top: 20px;
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
