/* Layout */
import Layout from '@/views/layout/Index'

/**
 * 主路由
 */
export const appRouter = [
  {
    path: '/',
    redirect: {
      name: 'home'
    },
    meta: {
      title: '首页',
      keepAlive: true
    },
    component: Layout,
    children: [
      {
        path: 'home',
        meta: {
          title: '首页',
          keepAlive: true
        },
        name: 'home',
        component: resolve => {
          require(['@/views/Home'], resolve)
        }
      },
      {
        path: 'singer',
        meta: {
          title: '歌手',
          keepAlive: true
        },
        name: 'singer',
        component: resolve => {
          require(['@/views/singer/Index.vue'], resolve)
        }
      }
    ]
  }
]

export const routes = [...appRouter]
