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
        <div class="card-header flex-between">
          <p class="flex-row">听歌排行 <span>（累积听歌{{ userInfo.listenSongs }}首）</span></p>
          <div class="tab flex-row">
            <span :class="type == 1 ? 'active' : ''" @click="changeType(1)">最近一周</span>
            <span class="line"></span>
            <span :class="type == 0 ? 'active' : ''" @click="changeType(0)">所有时间</span>
          </div>
        </div>
        <artist-list :songs="songs" />
      </div>
      <div class="right">
        <div class="my module shadow">
          <div class="card-header flex-row">
            <span>我创建的歌单</span>
          </div>
          <song-sheet :sheetList="myList" :num="num"></song-sheet>
        </div>
        <div class="my collect module shadow">
          <div class="card-header flex-row">
            <span>我收藏的歌单</span>
          </div>
          <song-sheet :sheetList="collectList" :num="num"></song-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createSong } from '@/model/song'
import ArtistList from 'components/common/artistList/Index'
import songSheet from 'components/common/songSheet/Index'
import axios from 'axios'
export default {
  data() {
    return {
      provinceName: '',
      cityName: '',
      myList: [],
      collectList: [],
      songs: [],
      num: 2,
      type: 1
    }
  },
  components: {
    ArtistList,
    songSheet
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
    // 修改一周数据或者全部
    changeType(type) {
      this.type = type
      this.getUserRecord()
    },
    // 获取用户播放记录
    async getUserRecord() {
      try {
        let res = await this.$api.getUserRecord(this.userInfo.userId, this.type)
        if (res.code === 200) {
          if(this.type == 1) {
            this.songs = this._normalizeSongs(res.weekData)
          } else {
            this.songs = this._normalizeSongs(res.allData)
          }
          
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取用户歌单
    async getUserArtist() {
      try {
        let res = await this.$api.getUserArtist(this.userInfo.userId)
        if (res.code === 200) {
          let list = res.playlist
          let myList = []
          let collectList = []
          list.map(item => {
            if (!item.subscribed) {
              myList.push(item)
            } else {
              collectList.push(item)
            }
          })
          this.myList = myList
          this.collectList = collectList
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
    this.getUserArtist()
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
      width: 350px;
      position: relative;
      top: -60px;
      margin-right: 20px;
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
      width: 640px;
      background: #fff;
      position: relative;
      margin-top: 40px;
      margin-right: 20px;
      border-radius: 5px;
      padding: 15px;
      .card-header {
        border-left: 3px solid $color-theme;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: bold;
        span {
          font-weight: 100;
          color: #666666;
          font-size: 12px;
        }
        .tab {
          span {
            font-size: 12px;
            cursor: pointer;
            &.active {
              color: $color-theme;
            }
          }
          .line {
            width: 1px;
            height: 13px;
            background: #999;
            display: block;
            margin: 0 10px;
          }
        }
      }
    }
    .right {
      width: 350px;
      flex-shrink: 0;
      border-radius: 5px;
      background: #fff;
      position: relative;
      padding-bottom: 30px;
      margin-top: 40px;
      .card-header {
        border-left: 3px solid $color-theme;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: bold;
        .icon-like {
          font-size: 20px;
        }
      }
      .module {
        padding: 15px;
        width: 100%;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .my {
        padding-bottom: 5px;
        ul {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -5px;
          li {
            flex: 0 0 14.285714285714%;
            max-width: 14.285714285714%;
            padding: 0 5px 10px;
            .avatar {
              width: 100%;
              border-radius: 3px;
              img {
                width: 100%;
                border-radius: 3px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
