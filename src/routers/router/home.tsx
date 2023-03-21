import Home from '@/views/home/index'
import { RouteObject } from '@/routers/interface'

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    path: '/home/index',
    element: <Home />,
    meta: {
      title: '首页',
      key: 'home'
    }
  }
]

export default homeRouter
