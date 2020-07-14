<template>
  <div class="playlist-detail container">
    <div class="left">
      <div class="top">
        <div class="avatar">
          <img :src="detail.coverImgUrl + '?param=200y200'" alt="">
        </div>
        <div class="info">
          <div class="title ellipsis-two">{{ detail.name }}</div>
          <div class="user flex-row">
            <div class="avatar">
              <img :src="creator.avatarUrl + '?param=100y100'" alt="">
            </div>
            <p class="nickname">{{ creator.nickname }}</p>
            <p class="createTime">{{ utils.dateFormat(detail.createTime, 'YYYY-MM-DD') }}创建</p>
          </div>
          <div class="tag flex-row">
            标签：<a v-for="item of detail.tags" :key="item">{{ item }}</a>
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span @click="openDesc(detail.name, detail.description)" class="flex-row" v-if="txtLength(detail.description) > 50">全部<i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      creator: {}
    }
  },
  components: {},
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
    // 获取歌单详情
    async getPlayListDetail(id, s) {
      try {
        let res = await this.$api.getPlayListDetail(id, s)
        if (res.code === 200) {
          console.log(res.playlist)
          res.playlist.description = res.playlist.description.replace(/(\r\n|\n|\r)/gm, '<br />')
          this.detail = res.playlist
          this.creator = res.playlist.creator
        }
      } catch (error) {
        this.$message.error('error')
      }
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
    console.log(id)
    if (id) {
      this.getPlayListDetail(id, 20)
    }
  }
}
</script>
<style lang="stylus" scoped>
.playlist-detail {
  .left {
    width: 70%;
    border-right: 1px solid #e7e7e7;
    padding-right: 15px;
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
          }
        }
      }
    }
  }
}
</style>
