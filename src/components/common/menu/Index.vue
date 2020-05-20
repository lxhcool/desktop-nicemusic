<template>
  <div class="menu">
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt="" />
    </div>
    <div class="nav">
      <div class="item" v-for="item of menus" :key="item.id">
        <h2 :class="currentParentIndex == item.id ? 'active' : ''">
          <i class="iconfont" :class="item.icon"></i>{{ item.title }}
        </h2>
        <p
          :class="currentIndex == subItem.id ? 'active' : ''"
          v-for="subItem of item.list"
          :key="subItem.id"
          @click="tab(subItem.id)"
        >
          <i class="iconfont nicecaidan"></i>
          <span>{{ subItem.title }}</span>
          <i class="dot"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          id: 1,
          title: '发现音乐',
          icon: 'niceSound-wave',
          list: [
            {
              title: '推荐',
              id: 101
            },
            {
              title: '排行榜',
              id: 102
            },
            {
              title: '歌单',
              id: 103
            },
            {
              title: '歌手',
              id: 104
            },
            {
              title: '视频',
              id: 105
            }
          ]
        },
        {
          id: 2,
          title: '我的音乐',
          icon: 'niceicon-',
          list: [
            {
              title: '我的歌手',
              id: 201
            },
            {
              title: '我的视频',
              id: 202
            },
            {
              title: '创建的歌单',
              id: 203
            },
            {
              title: '收藏的歌单',
              id: 204
            }
          ]
        },
        {
          id: 3,
          title: '写点什么',
          icon: 'niceicon-8',
          list: [
            {
              title: '乐评',
              id: 301
            }
          ]
        }
      ],
      currentParentIndex: 1,
      currentIndex: 101
    }
  },
  components: {},
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tab(id) {
      this.currentIndex = id
      this.currentParentIndex = id.toString().charAt(0)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.menu {
  width: 180px;
  height: 100%;
  background: #0d122f;
  position: fixed;
  overflow: auto;
  z-index: 9999;
  padding: 0 20px;
  color: #fff;
  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 130px;
    }
  }
  .nav {
    color: #fff;
    line-height: 2;
    h2 {
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &.active {
        color: #fcc85f;
      }
    }
    p {
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.4s;
      span {
        flex: 1;
      }
      .dot {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fcc85f;
        opacity: 0;
      }
      &.active {
        color: #fcc85f;
        .dot {
          opacity: 1;
        }
      }
      &:hover {
        color: #fcc85f;
        margin-left: 8px;
        .dot {
          opacity: 1;
        }
      }
    }
    .iconfont {
      margin-right: 8px;
    }
  }
}
</style>
