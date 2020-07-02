<template>
  <div class="singer-wrap">
    <div class="filter">
      <ul class="tag-lang">
        <li
          v-for="item of langs"
          :key="item.value"
          :class="lang == item.value ? 'active' : ''"
          @click="chooseType('lang', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang tag-type">
        <li
          v-for="item of classifys"
          :key="item.value"
          :class="classify == item.value ? 'active' : ''"
          @click="chooseType('classify', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-en">
        <!-- <li v-for="item of ens" :key="item">{{ item }}</li> -->
        <li
          v-for="item of ens"
          :key="item.value"
          :class="en == item.value ? 'active' : ''"
          @click="chooseType('en', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <ul
      class="singer-list"
      v-infinite-scroll="getSingerList"
    >
      <li v-for="item of singers" :key="item.id">
        <div class="cover">
          <div class="image">
            <el-image :key="item.img1v1Url" :src="item.img1v1Url" lazy>
              <div
                slot="placeholder"
                class="image-slot flex-center flex-column"
              >
                <i class="iconfont niceicon-3"></i>
                <p>加载中<span class="dot">...</span></p>
              </div>
              <div slot="error" class="image-slot flex-center">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </div>
        <div class="info">
          <p class="name">{{ item.name }}</p>
          <p class="count">单曲数{{ item.musicSize }}</p>
        </div>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 语种
      lang: -1,
      langs: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 7,
          label: '华语'
        },
        {
          value: 96,
          label: '欧美'
        },
        {
          value: 8,
          label: '日本'
        },
        {
          value: 16,
          label: '韩国'
        },
        {
          value: 0,
          label: '其他'
        }
      ],
      // 分类
      classify: -1,
      classifys: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '男歌手'
        },
        {
          value: 2,
          label: '女歌手'
        },
        {
          value: 3,
          label: '乐队'
        }
      ],
      // 字母A_Z
      en: -1,
      ens: [],
      // 请求参数
      params: {
        // 返回数量
        limit: 30,
        // 偏移数量
        offset: 0,
        // 分类
        type: -1,
        // 语种
        area: -1,
        // 字母A_Z
        initial: -1
      },
      // 歌手列表
      singers: [],
      loading: false
    }
  },
  components: {},
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {},
  methods: {
    // 获取筛选列表
    getEn() {
      let ens = []
      for (let i = 0; i < 26; i++) {
        ens.push({
          value: String.fromCharCode(97 + i),
          label: String.fromCharCode(65 + i)
        })
      }
      ens.unshift({
        value: -1,
        label: '热门'
      })
      ens.push({
        value: 0,
        label: '其他'
      })
      this.ens = ens
    },
    // 选择歌手分类
    chooseType(type, val) {
      if (type == 'lang') {
        this.lang = val
        this.params.area = val
      } else if (type == 'classify') {
        this.classify = val
        this.params.type = val
      } else if (type == 'en') {
        this.en = val
        this.params.initial = val
      }
      this.getSingerList()
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    // 获取歌手列表
    async getSingerList() {
      try {
        this.loading = true
        let res = await this.$api.getSingerList(this.params)
        if (res.code === 200) {
          this.singers = this.singers.concat(res.artists)
          if (res.more) {
            // this.finishedText = '加载中...'
            // this.isShow = true
            // this.loadStatus = true
            this.loading = true
            this.offset += 30
          } else {
            // this.finishedText = '厉害啊, 拉完了~~'
            this.loading = false
          }
        }
        this.singers = res.artists
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {},
  mounted() {
    this.getEn()
    this.getSingerList()
  }
}
</script>
<style lang="stylus" scoped>
.singer-wrap {
  li {
    &:hover {
      color: $color-theme;
      transition: all 0.4s;
    }
  }
  .tag-en {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      width: 28px;
      height: 28px;
      margin-right: 14px;
      text-align: center;
      line-height: 29px;
      border-radius: 50%;
      font-size: 13px;
      color: #333333;
      cursor: pointer;
      &:first-child,
      &.last-child {
        width: 56px;
        border-radius: 14px;
      }
      &.active {
        background: $color-theme;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
  .tag-lang {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    li {
      width: 56px;
      height: 28px;
      line-height: 29px;
      font-size: 13px;
      text-align: center;
      border-radius: 14px;
      cursor: pointer;
      margin-right: 6px;
      &.active {
        background: $color-theme;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
  .tag-type {
    li {
      width: auto;
      padding: 0 15px;
    }
  }
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
    li {
      padding: 0 15px 30px;
      flex: 0 0 10%;
      max-width: 10%;
      .cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 50%;
        background-color: #d9d9d9;
        .image {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 100%;
          }
          &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            -webkit-box-shadow: 1px 1px 0 rgba(0,0,0,.05) inset, -1px -1px 0 rgba(0,0,0,.05) inset;
            box-shadow: inset 1px 1px 0 rgba(0,0,0,.05), inset -1px -1px 0 rgba(0,0,0,.05);
          }
        }
      }
      .info {
        margin-top: 15px;
        text-align: center;
        .name {
          font-weight: 700;
          font-size: 14px;
          line-height: 18px;
          word-break: break-word;
        }
        .count {
          font-size: 12px;
          margin-top: 10px;
          color: $color-theme;
        }
      }
    }
  }
}
</style>
