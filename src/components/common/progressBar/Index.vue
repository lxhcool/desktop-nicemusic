<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn" ref="progressBtn" @mousedown.prevent="progressTouchStart" @mousemove.prevent="progressTouchMove" @mouseup.prevent="progressTouchEnd"></div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 12
export default {
  data() {
    return {}
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  },
  methods: {
    progressTouchStart(e) {
      console.log(e)
      this.touch.initiated = true
      this.touch.startX = e.pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if(!this.touch.initiated) {
        return
      }
      const deltaX = e.pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this.touch.startX = e.pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
    }
  },
  created() {
    this.touch = {}
  }
}
</script>

<style lang="stylus" scoped>
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
      width: 0px;
      background: $color-theme;
      height: 3px;
      border-radius: 2px;
    }
    .progress-btn {
      position: absolute;
      z-index: 100;
      right: -12px;
      width: 12px;
      height: 12px;
      top: -4.5px;
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
</style>