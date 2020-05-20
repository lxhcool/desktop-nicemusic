<template>
  <div class="header flex-center">
    <div class="search">
      <i class="iconfont nicesearch"></i>
      <input type="text" class="search-input" placeholder="Search" />
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
  width: calc(100% - 180px);
  height: 60px;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 180px;
  box-shadow: 0px 0px 5px rgba(0,0,0,.1);
  padding: 0 20px;
  .search {
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    i {
      font-size: 20px;
      color: #666666;
      margin-right: 10px;
    }
    .search-input {
      width: 100%;
      height: 100%;
      flex: 1;
      border: 0;
      background: none;
      font-size: 16px;
      color: #333333;
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
