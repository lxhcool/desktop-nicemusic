<template>
  <div class="playlist-wrap container">
    <div class="filter">
      <div class="title flex-center" slot="reference">
        全部歌单
        <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: {},
      cateList: [],
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 获取歌单数据
    async getCatList() {
      try {
        let res = await this.$api.getCatList()
        if (res.code === 200) {
          console.log(res)
          this.categories = res.categories
          this.cateList = this.categoryGroup(res.sub, 'category')
        }
      } catch (error) {
        this.$message.error('error')
      }
    },
    // 根据分类进行分组
    categoryGroup(list, field) {
      var obj = {}
      for (var i = 0; i < list.length; i++) {
        for (let item in list[i]) {
          if (item == field) {
            obj[list[i][item]] = {
              list: obj[list[i][field]] ? obj[list[i][field]].list : []
            }
          }
        }
        obj[list[i][field]].list.push(list[i])
      }
      var att = []
      for (let item in obj) {
        att.push({
          list: obj[item].list
        })
      }
      return att
    }
  },
  created() {},
  mounted() {
    this.getCatList()
  }
}
</script>
<style lang="stylus" scoped>
.playlist-wrap {
  .filter {
    width: 100%;
    display: flex;
    align-items: center;
    .title {
      width: auto;
      height: 34px;
      padding: 0 10px 0 15px;
      border-radius: 17px;
      background: #fff;
      border: 1px solid #e6e6e6;
      color: #333333;
      cursor: pointer;
      i {
        transform: rotate(90deg);
        margin-left: 10px;
        font-size: 18px;
      }
      &:hover {
        border: 1px solid #cccccc;
      }
    }
  }
}
</style>
