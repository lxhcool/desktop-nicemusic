<template>
  <div class="artist-box">
    <table class="artist-table">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">专辑</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of songs" :key="item.id">
          <td>
            <div class="index-container flex-center">
              <span class="num">{{ index + 1 }}</span>
            </div>
          </td>
          <td>
            <div class="name-container">
              <!-- <div class="avatar">
                <el-image
                  :key="item.image + '?param=100y100'"
                  :src="item.image + '?param=100y100'"
                  lazy
                >
                  <div
                    slot="placeholder"
                    class="image-slot flex-center flex-column"
                  >
                    <i class="iconfont niceicon-3"></i>
                  </div>
                  <div slot="error" class="image-slot flex-center">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div> -->
              <p class="name ellipsis">{{ item.name }}</p>
            </div>
          </td>
          <td>
            <div class="artist-container">
              <p class="author ellipsis">{{ item.singer }}</p>
            </div>
          </td>
          <td>
            <div class="album-container">
              <p :title="item.album">{{ item.album }}</p>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <p>{{ item.duration }}</p>
              <div class="song-tools">
                <i class="iconfont niceicon-heart"></i>
                <i class="iconfont nicexiazai"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    songs: {
      type: Array
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.artist-box {
  .artist-table {
    width: 100%;
    thead {
      height: 50px;
      line-height: 50px;
      background: #fafafa;
      color: #999;
      th {
        padding: 0 9px;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        &.th-index {
          width: 10%;
          text-align: center;
        }
        &.th-name {
          width: 40%;
        }
        &.th-artist {
          width: 25%;
        }
        &.th-album {
          width: 15%;
        }
        &.th-duration {
          width: 15%;
          text-align: right;
          padding-right: 40px;
        }
      }
    }
    tbody {
      tr {
        height: 50px;
        line-height: 50px;
        transition: background-color .2s linear;
        &:&:nth-child(odd) {
          background: #f5f5f5;
        }
        td {
          padding: 0 9px;
          white-space: nowrap;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
        .index-container {
          .num {
            color: #4a4a4a;
            font-weight: 500;
          }
        }
        .artist-container {
          .author {
          }
        }
        .duration-container {
          text-align: right;
          padding-right: 15px;
          position: relative;
          p {
            padding-right: 10px;
          }
          .song-tools {
            display: flex;
            justify-content: flex-end;
            top: 0;
            right: 0;
            position: absolute;
            display: none;
            i {
              flex-shrink: 0;
              cursor: pointer;
              margin-right: 10px;
              font-size: 24px;
            }
          }
        }
        &:hover {
          .duration-container {
            p {
              display: none;
            }
            .song-tools {
              display: flex;
            }
          }
        }
      }
    }
  }
}
</style>
