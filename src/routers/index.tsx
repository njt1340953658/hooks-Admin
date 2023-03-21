import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from '@/routers/interface'
import Login from '@/views/login/index'

// * 首页地址（默认）
export const HOME_URL: string = '/home/index'

const metaRouters = import.meta.glob('./router/*.tsx', { import: 'default', eager: true })

export const routerArray: any = Object.values(metaRouters).flat()

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  ...routerArray,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter as [])
  return routes
}

export default Router
