<template>
  <div class="menu shadow">
    <div class="logo">
      <a href="index.html">
        <!-- 奈斯导航 - 三亩鱼塘<i>Nicenav.cn</i> -->
      </a>
    </div>
    <div class="nav">
      <div class="item">
        <a href="###">
          <i class="iconfont niceSound-wave"></i>
          <span class="title">发现音乐</span>
          <i class="iconfont nice-dot"></i>
        </a>
      </div>
      <ul class="sub-item">
        <li><a href="/Tag/设计平台/">设计平台</a></li>
        <li><a href="/Tag/灵感创意/">灵感创意</a></li>
        <li><a href="/Tag/发现/">发现</a></li>
        <li><a href="/Tag/素材资源/">素材资源</a></li>
        <li class="sub"><a href="/Tag/图标/">图标</a></li>
        <li class="sub"><a href="/Tag/图库/">图库</a></li>
        <li class="sub"><a href="/Tag/字体/">字体</a></li>
        <li class="sub"><a href="/Tag/Sketch资源/">Sketch资源</a></li>
        <li><a href="/Tag/设计软件/">设计软件</a></li>
        <li><a href="/Tag/在线工具/">在线工具</a></li>
        <li><a href="/Tag/教程文章/">教程文章</a></li>
        <li><a href="/Tag/社区交流/">社区交流</a></li>
        <li><a href="/Tag/绘画/">绘画</a></li>
        <li><a href="/Tag/前端开发/">前端开发</a></li>
        <li><a href="/Tag/设计团队/">设计团队</a></li>
        <li><a href="/Tag/设计师/">设计师</a></li>
        <li><a href="/Tag/媒体与公众号/">媒体与公众号</a></li>
      </ul>
    </div>
    <div class="ad">
      <a href="/goto/?url=https://portal.shadowsocks.la/aff.php?aff=6144" target="_blank">
        <img src="../../../assets/images/ad.jpg">
      </a>
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
  width: 208px;
  height: 100%;
  position: fixed;
  // overflow: auto;
  background: #ffffff;
  z-index: 999;
  top: 0px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  .logo {
    width: 100%;
    padding: 8px 0;
    display: flex;
    border-bottom: 1px solid #f8f8f8;
    align-items: center;
    a {
      width: 100%;
      display: block;
      height: 64px;
      line-height: 18px;
      background-position: 0px center;
      background-repeat: no-repeat;
      background-size: 146px 26px;
      background-image: url(../../../assets/images/logo_black.png);
      color: #da5621;
      padding: 16px 0 0px 55px;
    }
    img {
      width: 130px;
    }
  }
  .nav {
    overflow: auto;
    flex: 1;
    .item {
      width: 100%;
      height: 48px;
      border-bottom: 1px solid #f8f8f8;
      a {
        width: 100%;
        height: 100%;
        font-weight: normal;
        display: flex;
        align-items: center;
        color: #6b7386;
      }
      i {
        margin-right: 7px;
        float: left;
        font-size: 18px;
        font-weight: bold;
      }
      .title {
        color: #6b7386;
        display: block;
        float: left;
        width: 100%;
        flex: 1;
      }
    }
    .sub-item {
      padding: 8px 0;
      border-top: 1px rgba(255, 255, 255, .04) solid;
      border-bottom: 1px rgba(255, 255, 255, .04) solid;
      li {
        height: 32px;
        line-height: 32px;
        a {
          display: block;
          padding-left: 10px;
          color: #6B7386;
          &:before {
            content: "";
            width: 8px;
            height: 8px;
            display: inline-block;
            background-color: #DCE8EC;
            border: 2px solid #f3f4fb;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
        &.sub {
          a {
            padding-left: 40px;
          }
        }
      }
    }
  }
  .ad {
    margin-top: 20px;
    margin-bottom: 15px;
    border-radius: 2px;
    img {
      border-radius: 2px;
      transition: all 0.2s;
    }
    &:hover {
      img {
        box-shadow: 0 3px 8px -1px rgba(140, 160, 255, 0.36), 0 22px 20px -27px rgba(151, 168, 251, 0.19);
      }
    }
  }
}
</style>
