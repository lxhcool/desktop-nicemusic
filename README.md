# vue-desktop-nicemusic 仿网易云音乐

## 感谢
[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 预览地址
[vue-desktop-nicemusic](http://nicenav.cn/desktop-music)

##### 登录
![Image text](https://image-static.segmentfault.com/186/150/1861508309-5f2a2058d2596)

##### 首页
![Image text](https://image-static.segmentfault.com/120/045/1200451576-5f2a20094e36d)

##### 个人中心
![Image text](https://image-static.segmentfault.com/138/073/138073350-5f2a20fc510e5)

##### 歌单
![Image text](https://image-static.segmentfault.com/196/651/1966510659-5f2a211b3038e)

## 目录结构
##### | --dist 生成打包后的文件
##### | --node_modules 安装的依赖包
##### | --public 静态资源会被输出到目录dist
##### | --src
##### |   |--api 与后端交互使用相关方法和配置
##### |   |   |--services 对应使用的api方法和数据处理
##### |   |   |   |--instance.js 封装请求，拦截器等等 （axios，fetch）
##### |   |   |   |--home.js home相关api
##### |   |   |--config.js 配置生产，开发，测试接口配置
##### |   |   |--index.js services文件api，统一出口
##### |   |   |--resource.js 全局使用的常量
##### |   |--assets 存放静态资源，图片等等
##### |   |--model 处理歌曲视频数据等等
##### |   |--components 公用组件
##### |   |--router vue-router相关配置
##### |   |   |--index.js 导出路由配置，路由守卫配置
##### |   |   |--routes.js 所有路由
##### |   |--utils 封装的工具函数
##### |   |--views 所有的路由组件
##### |   |--app.vue 顶层路由
##### |   |--main.js 入口文件

## 安装运行
```shell
$ git clone git@gitee.com:lxhcool/desktop-nicemusic.git
$ cd desktop-nicemusic
$ npm install
$ npm run serve
```