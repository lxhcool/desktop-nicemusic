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
          isHome: true,
          keepAlive: true
        },
        name: 'home',
        component: resolve => {
          require(['@/views/Home'], resolve)
        }
      }
    ]
  }
]

export const routes = [...appRouter]
