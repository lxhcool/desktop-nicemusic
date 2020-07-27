<template>
  <transition name="fade">
    <div class="player-bar shadow flex-row" v-if="playList.length > 0">
      <div class="avatar">
        <img
          :src="currentSong.image"
          alt="nicemusic"
        />
      </div>
      <div class="info">
        <h2>{{ currentSong.name }}</h2>
        <p>{{ currentSong.singer }}</p>
      </div>
      <div class="player-btn">
        <i class="iconfont icon-prev niceshangyishou" @click="prevSong"></i>
        <i class="iconfont icon-play nicebofang2" :class="playIcon" @click="togglePlaying"></i>
        <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
      </div>
      <div class="progress-wrap">
        <p class="current-time">{{ formatTime(currentTime) }}</p>
        <progress-bar :percent="percent"></progress-bar>
        <p class="duration-time">{{ utils.formatTime(currentSong.duration) }}</p>
      </div>
      <div class="volume-wrap">
        <i class="iconfont volume-icon niceshengyin1"></i>
        <div class="progress-bar">
          <div class="bar-inner">
            <div class="progress"></div>
            <div class="progress-btn"></div>
          </div>
        </div>
      </div>
      <div class="tool">
        <i class="iconfont icon-like nicecollection"></i>
        <!-- <i class="iconfont nicebofangqidanquxunhuan"></i> -->
        <i class="iconfont nicexunhuanbofang24"></i>
        <!-- <i class="iconfont nicebofangqisuijibofang"></i> -->
        <i class="iconfont nicegeci32"></i>
        <i class="iconfont nicebofangliebiao24"></i>
      </div>
      <audio ref="audio" :src="currentSong.url" @canplay="audioReady" @error="audioError" @timeupdate="updateTime"></audio>
    </div>
  </transition>
</template>

<script>
import progressBar from 'components/common/progressBar/Index'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
    }
  },
  components: {
    progressBar
  },
  computed: {
    // 播放暂停按钮
    playIcon() {
      return this.playing ? 'nicezanting1' : 'nicebofang2'
    },
    percent() {
      console.log(this.utils.formatSecond(this.currentSong.duration))
      return this.currentTime / this.utils.formatSecond(this.currentSong.duration)
    },
    ...mapGetters(['playList', 'currentSong', 'playing', 'currentIndex'])
  },
  watch: {
    // 监听歌曲内容变化
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    // 监听播放状态
    playing(isPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        isPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    // 点击播放暂停
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    // 上一首
    prevSong() {
      if(!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if(!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    // 下一首
    nextSong() {
      if(!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if(!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    // 播放准备完成
    audioReady() {
      this.songReady = true
    },
    // 歌曲错误
    audioError() {
      this.songReady = true
    },
    // 监听播放时间改变
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 格式化时间
    formatTime(interval) {
      interval = interval | 0
      const m = interval / 60 | 0
      const s = interval % 60
      return `${this.utils.formatZero(m, 2)}:${this.utils.formatZero(s, 2)}`
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  created() {},
  mounted() {
    console.log(this.playList)
  }
}
</script>
<style lang="stylus" scoped>
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-leave-active {
  transition: all 0.5s;
}
.player-bar {
  width: 100%;
  height: 72px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8000;
  padding: 0 10px 0 20px;
  justify-content: space-between;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 30px
    flex-shrink: 0;
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
  .info {
    margin-right: 55px;
    flex-shrink: 0;
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
    flex: 1;
    p {
      font-size: 14px;
    }
  }
  .volume-wrap {
    width: 180px;
    margin-left: 40px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    .volume-icon {
      font-size: 26px;
      font-weight: bold;
    }
    .progress-bar {
      position: relative;
      width: 100%;
      flex: 1;
      height: 2px;
      background: rgba(0,0,0,.05);
      border-radius: 2px;
      cursor: pointer;
      margin-left: 10px;
      .bar-inner {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        .progress {
          width: 50px;
          background: $color-theme;
          height: 2px;
          border-radius: 2px;
        }
        .progress-btn {
          position: absolute;
          z-index: 100;
          right: -4px;
          width: 10px;
          height: 10px;
          top: -4.5px;
          background: $color-theme;
          box-shadow: 0 0 15px 0 rgba(0,0,0,.15);
          border-radius: 50%;
          &::after {
            position: absolute;
            content: " ";
            top: 50%;
            left: 50%;
            margin: -3px 0 0 -3px;
            width: 6px;
            height: 6px;
            background: #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .tool {
    .iconfont {
      font-size: 26px;
      margin: 0 15px;
      &.icon-like {
        font-size: 26px;
      }
    }
  }
}
</style>
