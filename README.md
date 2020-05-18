# | --dist 生成打包后的文件
# | --node_modules 安装的依赖包
# | --public 静态资源会被输出到目录dist
# | --src
# |   |--api 与后端交互使用相关方法和配置
# |   |   |--services 对应使用的api方法和数据处理
# |   |   |   |--instance.js 封装请求，拦截器等等 （axios，fetch）
# |   |   |   |--home.js home相关api
# |   |   |--config.js 配置生产，开发，测试接口配置
# |   |   |--index.js services文件api，统一出口
# |   |   |--resource.js 全局使用的常量
# |   |--assets 存放静态资源，图片等等
# |   |--components 公用组件
# |   |--router vue-router相关配置
# |   |   |--index.js 导出路由配置，路由守卫配置
# |   |   |--routes.js 所有路由
# |   |--utils 封装的工具函数
# |   |--views 所有的路由组件
# |   |--app.vue 顶层路由
# |   |--main.js 入口文件