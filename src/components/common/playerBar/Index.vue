<template>
  <transition name="fade">
    <div class="player-bar shadow flex-row" v-if="playList.length > 0">
      <div class="avatar">
        <img :src="currentSong.image" alt="nicemusic" />
      </div>
      <div class="info">
        <h2>{{ currentSong.name }}</h2>
        <p>{{ currentSong.singer }}</p>
      </div>
      <div class="player-btn">
        <i class="iconfont icon-prev niceshangyishou" @click="prevSong"></i>
        <i
          class="iconfont icon-play nicebofang2"
          :class="playIcon"
          @click="togglePlaying"
        ></i>
        <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
      </div>
      <div class="progress-wrap" id="progress-wrap">
        <p class="current-time">{{ formatTime(currentTime) }}</p>
        <progress-bar
          :percent="percent"
          @percentChange="onPercentBarChange"
        ></progress-bar>
        <p class="duration-time">
          {{ formatTime(currentSong.duration) }}
        </p>
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
        <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
        <i class="iconfont nicegeci32"></i>
        <i class="iconfont nicebofangliebiao24"></i>
      </div>
      <audio
        ref="audio"
        :src="currentSong.url"
        @playing="audioReady"
        @error="audioError"
        @timeupdate="updateTime"
        @ended="audioEnd"
        @pause="audioPaused"
      ></audio>
      <div class="lyric-box shadow">
        <div class="title">歌词</div>
        <scroll
          class="lyric"
          ref="lyricList"
          :data="currentLyric && currentLyric.lines"
        >
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p
                ref="lyricLine"
                class="lyric-text"
                :class="currentLyricNum === index ? 'active' : ''"
                v-for="(item, index) of currentLyric.lines"
                :key="index"
              >
                {{ item.txt }}
              </p>
            </div>
          </div>
        </scroll>
      </div>
      <!-- <transition name="fade">
        <div class="lyric shadow" v-if="currentLyric">
          <div class="title">歌词</div>
          <div class="lyric-list">
            <p
              ref="lyricLine"
              class="lyric-text"
              :class="currentLyricNum === index ? 'active' : ''"
              v-for="(item, index) of currentLyric.lines"
              :key="index"
            >
              {{ item.txt }}
            </p>
          </div>
        </div>
      </transition> -->
    </div>
  </transition>
</template>

<script>
import progressBar from 'components/common/progressBar/Index'
import { mapGetters, mapMutations } from 'vuex'
import { playMode } from '@/common/playConfig'
import Scroll from 'components/common/scroll/Index'
import Lyric from 'lyric-parser'
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLyricNum: 0
    }
  },
  components: {
    progressBar,
    Scroll
  },
  computed: {
    // 播放暂停按钮
    playIcon() {
      return this.playing ? 'nicezanting1' : 'nicebofang2'
    },
    // 播放模式
    modeIcon() {
      return this.mode === playMode.sequence
        ? 'nicexunhuanbofang24'
        : this.mode === playMode.loop
        ? 'nicebofangqidanquxunhuan'
        : 'nicebofangqisuijibofang'
    },
    // 进度条
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  watch: {
    // 监听歌曲内容变化
    currentSong(newSong, oldSong) {
      if (!oldSong) {
        oldSong = {
          id: ''
        }
      }
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.src = newSong.url
          audio.play()
          this.getLyric(newSong.id)
        }
      })
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 5000)
    },
    // 监听播放状态
    playing(isPlaying) {
      if (!this.songReady) {
        return
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          isPlaying ? audio.play() : audio.pause()
        }
      })
    }
  },
  methods: {
    // 获取歌词
    async getLyric(id) {
      try {
        let res = await this.$api.getLyric(id)
        if (res.code === 200) {
          let lyric = res.lrc.lyric
          this.currentLyric = new Lyric(lyric, this.lyricHandle)
          if (this.playing) {
            this.currentLyric.play()
          }
          console.log(this.currentLyric)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 歌词回调
    lyricHandle({ lineNum, txt }) {
      console.log(txt)
      this.currentLyricNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    // 点击播放暂停
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    // 上一首
    prevSong() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loopSong()
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    // 下一首
    nextSong() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loopSong()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    // 单曲循环播放
    loopSong() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
    },
    // 播放准备完成
    audioReady() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    // 歌曲错误
    audioError() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    // 歌曲暂停
    audioPaused() {
      this.setPlayingState(false)
    },
    // 歌曲播放完成
    audioEnd() {
      this.currentTime = 0
      if (this.mode === playMode.loop) {
        this.loopSong()
      } else {
        this.nextSong()
      }
    },
    // 监听播放时间改变
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 进度条拖动改变播放进度
    onPercentBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.currentTime = this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    // 切换播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = this.utils.shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 重置当前播放歌曲序号
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    // 格式化时间
    formatTime(interval) {
      interval = interval | 0
      const m = (interval / 60) | 0
      const s = interval % 60
      return `${this.utils.formatZero(m, 2)}:${this.utils.formatZero(s, 2)}`
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  },
  created() {},
  mounted() {}
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
    i {
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
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
    height: 100%;
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
      cursor: pointer;
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
      cursor: pointer
      &:active {
        opacity: 0.7;
      }
      &.icon-like {
        font-size: 26px;
      }
    }
  }
  .lyric-box {
    width: 360px;
    height: 580px;
    position: absolute;
    right: 0;
    bottom: 80px;
    padding: 30px;
    overflow: hidden
    .title {
      margin: 10px 0 40px;
      font-weight: 500;
      font-size: 16px;
    }
    .lyric {
      display: inline-block
      vertical-align: top
      width: 100%
      height: 100%
      overflow: hidden
      padding: 30px 0;
      .lyric-wrapper {
        width: 100%
        margin: 0 auto
        overflow: hidden
        .lyric-text {
          margin: 5px 0;
          line-height: 24px;
          font-size: 14px;
          font-weight: 300;
          &.active {
            color: $color-theme;
          }
        }
      }
    }
  }
}
</style>
