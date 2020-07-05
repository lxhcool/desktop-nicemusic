<template>
  <div class="header">
    <div class="container flex-row">
      <div class="logo">
        <a href="index.html"></a>
      </div>
      <ul class="nav flex-row">
        <li>
          <router-link :to="{ name: 'home' }" tag="a">发现音乐</router-link>
        </li>
        <li><a href="###">排行榜</a></li>
        <li><a href="###">歌单</a></li>
        <li>
          <router-link :to="{ name: 'singer' }" tag="a">歌手</router-link>
        </li>
        <li><a href="###">视频</a></li>
      </ul>
      <div class="search">
        <i class="iconfont nicesearch-o"></i>
      </div>
      <div class="userbox">
        <el-avatar
          class="avatar"
          src="http://p3.music.126.net/CPOCNGKwvMJ7Njt17Lu-Tg==/109951164836393307.jpg?param="
        ></el-avatar>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            lxhcool丶<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">个人主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item divided icon="el-icon-switch-button">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: []
    }
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
.header {
  width: 100%;
  height: 70px;
  transition: all 400ms ease-in-out;
  box-shadow: 0px 5px 60px 0px rgba(17, 58, 93, 0.1);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .logo {
    width: 146px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    a {
      width: 100%;
      display: block;
      height: 70px;
      background-position: 0px center;
      background-repeat: no-repeat;
      background-size: 146px 26px;
      background-image: url(../../../assets/images/logo_black.png);
    }
    img {
      width: 130px;
    }
  }
  .nav {
    flex: 1
    li {
      font-size: 14px;
      height: 100%;
      padding: 0 15px;
      a {
        position: relative;
        transition: all 0.4s;
        &.router-link-active {
          color: $color-theme;
            &::after {
            content: "";
            position: absolute;
            background: $color-theme;
            left: 0;
            right: 0;
            bottom: -12px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 0 auto;
            opacity: 1;
          }
        }
      }
    }
  }
  .search {
    height: 100%;
    display: flex;
    align-items: center;
    i {
      font-size: 28px;
      color: #161e27;
      padding: 0 15px;
    }
  }
  .userbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      margin-right: 15px;
    }
  }
}
</style>
