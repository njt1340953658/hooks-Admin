import http from '@/utils/service'

// 后端微服务端口名@/utils/service
export const PORT1 = '/hooks'
export const PORT2 = '/userCenter'

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params = {}) => http.post(PORT1 + `/user/list`, params)

// * 新增用户
export const addUser = (params: { id: string }) => {
  return http.post(PORT1 + `/user/add`, params)
}

// * 批量添加用户
export const BatchAddUser = (params: FormData) => {
  return http.post(PORT1 + `/user/import`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// * 编辑用户
export const editUser = (params: { id: string }) => {
  return http.post(PORT1 + `/user/edit`, params)
}

// * 删除用户
export const deleteUser = (params: { id: string[] }) => {
  return http.post(PORT1 + `/user/delete`, params)
}

// * 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/user/change`, params)
}

// * 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(PORT1 + `/user/rest_password`, params)
}

// * 导出用户数据
export const exportUserInfo = (params = {}) => http.post(PORT1 + `/user/export`, params, { responseType: 'blob' })
