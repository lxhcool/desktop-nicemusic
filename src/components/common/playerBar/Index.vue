<template>
  <div class="player-bar shadow flex-row">
    <div class="avatar">
      <img src="//pic.xiami.net/xiamiWeb/0957829a6a477f1eaa6425313da324aa/f6fa411349f031437a6d83b20883126a-480x480.gif?x-oss-process=image/resize,limit_0,m_fill,s_330/quality,q_80" alt="">
    </div>
    <div class="info">
      <h2>星航轨迹</h2>
      <p>白小白</p>
    </div>
    <div class="player-btn">
      <i class="iconfont icon-prev niceshangyishou"></i>
      <i class="iconfont icon-play nicebofang2"></i>
      <i class="iconfont icon-next nicexiayishou"></i>
    </div>
    <div class="progress-wrap">
      <p class="current-time">00:05</p>
      <div class="progress-bar">
        <div class="bar-inner">
          <div class="progress"></div>
          <div class="progress-btn"></div>
        </div>
      </div>
      <p class="duration-time">04:30</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.player-bar {
  width: 100%;
  height: 100px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8000;
  padding: 0 20px;
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin-right: 30px
    img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
    }
  }
  .info {
    margin-right: 55px;
    h2 {
      font-size: 14px;
      color: #333;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
      color: #999999;
    }
  }
  .player-btn {
    display: flex;
    align-items: center;
    .icon-prev {
      font-size: 40px;
    }
    .icon-play {
      font-size: 60px;
      margin: 0 10px;
    }
    .icon-next {
      font-size: 40px;
    }
  }
  .progress-wrap {
    width: 650px;
    display: flex;
    align-items: center;
    margin-left: 80px;
    p {
      font-size: 14px;
    }
    .progress-bar {
      position: relative;
      width: 100%;
      flex: 1;
      height: 3px;
      background: rgba(0,0,0,.05);
      border-radius: 2px;
      cursor: pointer;
      margin: 0 25px;
      .bar-inner {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        .progress {
          width: 100px;
          background: $color-theme;
          height: 3px;
          border-radius: 2px;
        }
        .progress-btn {
          position: absolute;
          z-index: 100;
          right: -4px;
          width: 12px;
          height: 12px;
          top: -4px;
          background: $color-theme;
          box-shadow: 0 0 15px 0 rgba(0,0,0,.15);
          border-radius: 50%;
          &::after {
            position: absolute;
            content: " ";
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            width: 7px;
            height: 7px;
            background: #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
