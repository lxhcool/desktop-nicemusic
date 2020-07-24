<template>
  <div class="personal-wrap">
    <div class="banner layer"></div>
    <div class="personal-main container">
      <div class="left">
        <div class="user-box shadow">
          <div
            class="background layer"
            :style="{ backgroundImage: 'url(' + userInfo.backgroundUrl + ')' }"
          ></div>
          <div class="card flex-row">
            <div class="avatar">
              <img :src="userInfo.avatarUrl" />
            </div>
            <div class="info flex-between">
              <p class="name">{{ userInfo.nickname }}</p>
              <button class="sign-btn">签到</button>
            </div>
          </div>
          <p class="desc">{{ userInfo.signature }}</p>
          <div class="profile">
            <div class="tag">
              等级：
              <i
                class="iconfont lv-icon"
                :class="'nicelevel-' + userInfo.djStatus"
              ></i>
            </div>
            <div class="tag">
              年龄：
              <span>{{ age }}</span>
              <i
                v-if="userInfo.gender === 1"
                class="iconfont niceCRM_icon_nanxing sex-icon men"
              ></i>
              <i
                v-if="userInfo.gender === 2"
                class="iconfont niceCRM_icon_nvxing sex-icon women"
              ></i>
            </div>
            <div class="tag">
              地区：
              <span>{{ provinceName }} - {{ cityName }}</span>
            </div>
          </div>
          <ul class="follow">
            <li>动态<span>0</span></li>
            <li>关注<span>0</span></li>
            <li>粉丝<span>0</span></li>
          </ul>
          <div class="foot flex-center">
            <router-link tag="a" to="/">个人设置</router-link>
            <router-link tag="a" to="/">我的等级</router-link>
          </div>
        </div>
      </div>
      <div class="center shadow">
        <artist-list :songs="songs" />
      </div>
      <div class="right shadow"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createSong } from '@/model/song'
import ArtistList from 'components/common/artistList/Index'
import axios from 'axios'
export default {
  data() {
    return {
      provinceName: '',
      cityName: '',
      songs: []
    }
  },
  components: {
    ArtistList
  },
  computed: {
    ...mapGetters(['userInfo']),
    age() {
      return this.utils.getAstro(this.userInfo.birthday)
    }
  },
  watch: {},
  methods: {
    // 获取省市
    getArea() {
      axios
        .get('https://restapi.amap.com/v3/config/district', {
          params: {
            key: '0f57ee7d5045187c48cd268f9d19d815',
            keywords: this.userInfo.province,
            subdistrict: 1,
            extensions: 'base'
          }
        })
        .then(response => {
          if (response.data.status == 1 && response.data.info == 'OK') {
            let districts = response.data.districts[0]
            let subDistricts = response.data.districts[0].districts
            this.provinceName = districts.name
            subDistricts.map(item => {
              if (item.adcode == this.userInfo.city) {
                this.cityName = item.name
              }
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 获取用户播放记录
    async getUserRecord() {
      try {
        let res = await this.$api.getUserRecord(this.userInfo.userId, 0)
        if (res.code === 200) {
          console.log(this._normalizeSongs(res.allData))
          this.songs = this._normalizeSongs(res.allData)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 处理歌曲
    _normalizeSongs(list) {
      let ret = []
      list.map(item => {
        item.song.playCount = item.playCount
        item.song.score = item.score
        if (item.song.id) {
          ret.push(createSong(item.song))
        }
      })
      return ret
    }
  },
  created() {},
  mounted() {
    console.log(this.userInfo)
    this.getArea()
    this.getUserRecord()
  }
}
</script>
<style lang="stylus" scoped>
.personal-wrap {
  margin-top: -20px;
  .banner {
    width: 100%;
    height: 350px;
    background: url(../../assets/images/personal.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
  .personal-main {
    display: flex;
    .left {
      width: 360px;
      position: relative;
      top: -60px;
      margin-right: 30px;
      .user-box {
        background: #fff;
        border-radius: 5px;
        padding-bottom: 30px;
        .background {
          width: 100%;
          height: 140px;
          position: relative;
          border-radius: 5px 5px 0 0;
          background-size: cover;
          &::before {
            border-radius: 5px 5px 0 0;
          }
        }
        .card {
          margin-top: -20px;
          padding: 0 15px 0 30px;
          width: 100%;
          .avatar {
            width: 64px;
            height: 64px;
            flex-shrink: 0;
            z-index: 2;
            position: relative;
            img {
              width: 64px;
              height: 64px;
              border-radius: 3px;
            }
          }
          .info {
            width: 100%;
            padding-top: 20px;
            margin-left: 15px;
            .name {
              font-weight: 600;
              font-size: 16px;
            }
            .sign-btn {
              padding: 2px 15px;
              font-size: 12px;
              background: #fa2800;
              color: #fff;
              border: 1px solid #fa2800;
              cursor: pointer;
              border-radius: 30px;
            }
          }
        }
        .desc {
          padding: 0 40px;
          font-size: 13px;
          margin-top: 10px;
          color: #666;
        }
        .profile {
          padding: 0 40px;
          margin-top: 10px;
          .tag {
            position: relative;
            font-size: 13px;
            padding-left: 15px;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            .lv-icon {
              font-size: 22px;
              position: relative;
              top: 1px;
            }
            .sex-icon {
              font-size: 14px;
              margin-left: 5px;
              font-weight: bold;
              &.men {
                color: #4192eb;
              }
              &.women {
                color: #f4606c;
              }
            }
            .area-icon {
              font-size: 12px;
              margin-right: 5px;
            }
            span {
              font-size: 13px;
            }
            &::before {
              content: '';
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: $color-theme;
              position: absolute;
              top: 50%;
              left: 0px;
              margin-top: -3px;
            }
          }
        }
        .follow {
          list-style: none;
          display: flex;
          margin: 0 30px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #f9f9ff;
          li {
            width: 33%;
            text-align: center;
            font-size: 14px;
            color: #958ebb;
            span {
              display: block;
            }
          }
        }
        .foot {
          width: 100%;
          padding: 0 30px;
          margin-top: 30px;
          a {
            display: block;
            width: 50%;
            text-align: center;
            margin: 0 3% 10px 3%;
            padding: 10px 0;
            background: #ff416c;
            background: linear-gradient(to right, #ff4b2b, #ff416c);
            color: #fff;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
    }
    .center {
      width: 675px;
      background: #fff;
      position: relative;
      padding-bottom: 30px;
      margin-top: 40px;
      margin-right: 30px;
    }
    .right {
      width: 285px;
      background: #fff;
      position: relative;
      padding-bottom: 30px;
      margin-top: 40px;
    }
  }
}
</style>
