<template>
  <div class="singer-detail">
    <div class="singer-info flex-layout">
      <div class="avatar">
        <img
          src="https://star.kuwo.cn/star/starheads/300/10/6/294045140.jpg"
          alt=""
        />
      </div>
      <div class="info">
        <h2>周杰伦</h2>
        <ul class="tag flex-row">
          <li><i class="iconfont icon-level nicelevel-8"></i></li>
          <li class="birst"><i class="iconfont niceCRM_icon_nanxing"></i> 95后 - 天枰座</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {},
  computed: {
    ...mapGetters(['singer'])
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.singer-detail {
  .singer-info {
    .avatar {
      width: 180px;
      height 180px;
      border-radius: 5px;
      margin-right: 15px;
      img {
        width: 180px;
        height 180px;
        border-radius: 5px;
      }
    }
    .info {
      h2 {
        font-size: 20px;
        font-weight: bold;
        margin-top: 5px;
      }
      .tag {
        margin-top: 15px;
        li {
          padding: 0 15px;
          height: 25px;
          // border: 1px solid $color-theme;
          // background: #fff;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          .icon-level {
            font-size: 24px;
            color: $color-theme;
            margin-left: 3px;
          }
          &.birst {
            i {
              font-size: 18px;
              color: $color-theme;
              margin-right: 5px;
            }
            color: $color-theme;
          }
        }
      }
    }
  }
}
</style>
