import http from '@/utils/service'

// 后端微服务端口名
export const PORT1 = '/hooks'
export const PORT2 = '/userCenter'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params) => http.post(PORT1 + `/login`, params)

// * 获取按钮权限
export const getAuthorButtons = () => http.get(PORT1 + `/auth/buttons`)

// * 获取菜单列表
export const getMenuList = () => http.get(PORT1 + `/menu/list`)
