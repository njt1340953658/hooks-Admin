import { RouteObject } from '@/routers/interface'

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
  window.localStorage.clear()
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr: string = ''
  let newArr: any[] = []
  let arr = path.split('/').map((i) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {}
  for (let item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (path: string, menuList: []) => {
  let tempPath: any[] = []
  try {
    const getNodePath = (node: any) => {
      tempPath.push(node)
      // 找到符合条件的节点，通过throw终止掉递归
      if (node.path === path) {
        throw new Error('GOT IT!')
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i])
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop()
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop()
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i])
    }
  } catch (e) {
    return tempPath.map((item) => item.title)
  }
}

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
export const findAllBreadcrumb = (menuList: []): { [key: string]: any } => {
  let handleBreadcrumbList: any = {}
  const loop = (menuItem: any) => {
    if (menuItem?.children?.length) menuItem.children.forEach((item: any) => loop(item))
    else handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList)
  }
  menuList.forEach((item) => loop(item))
  return handleBreadcrumbList
}

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: [], newArr: string[] = []) {
  routerList.forEach((item: any) => {
    typeof item === 'object' && item.path && newArr.push(item.path)
    item.children && item.children.length && handleRouter(item.children, newArr)
  })
  return newArr
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
  let newObj: any
  try {
    newObj = obj.push ? [] : {}
  } catch (error) {
    newObj = {}
  }
  for (let attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepCopy(obj[attr])
    } else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}

// 字符串拼接a=1&b=2
export const stringify = (obj: object) => {
  if (!obj) return false
  return Object.entries(obj)
    .map((item) => `${item[0]}=${item[1]}`)
    .join('&')
}

/**
 * @param {Object} props
 * @description 针对搜索值做统一处理
 */
export function convertParams(props: Record<string, any>) {
  const newParams: Record<string, any> = {}
  for (const index in props) {
    const item = props[index]
    const type = typeof item
    if (item || item === 0) {
      if (item && type === 'string') {
        newParams[index] = item.replace(/(^\s+)|(\s+$)/g, '')
      } else if (Object.prototype.toString.call(item) === '[object Object]') {
        newParams[index] = convertParams(item)
      } else {
        newParams[index] = item
      }
    }
  }
  return newParams
}

/**
 * @param {Number} timelong 时间戳
 * @param {String} format 格式类型
 * @description 时间转换格式方法
 * */
export const formatDateTime = (timelong: any, format = 'YYYY-MM-DD') => {
  if (!timelong) return ''
  function format2n(val: any) {
    return val < 10 ? '0' + '' + val : val
  }
  const date = new Date(timelong)
  const year = date.getFullYear() + ''
  const month = format2n(date.getMonth() + 1) + ''
  const day = format2n(date.getDate()) + ''
  const hour = format2n(date.getHours()) + ''
  const minute = format2n(date.getMinutes()) + ''
  const second = format2n(date.getSeconds()) + ''
  return format
    .replace(/YYYY/g, year)
    .replace(/YYY/g, year.slice(1))
    .replace(/YY/g, year.slice(2))
    .replace(/Y/g, year.slice(1))
    .replace(/MM/g, month)
    .replace(/M/g, month.slice(1))
    .replace(/DD/g, day)
    .replace(/D/g, day.slice(1))
    .replace(/hh/g, hour)
    .replace(/h/g, hour.slice(1))
    .replace(/mm/g, minute)
    .replace(/m/g, minute.slice(1))
    .replace(/ss/g, second)
    .replace(/s/g, second.slice(1))
}

/**
 * @descripting 轮询功能
 * @param {Function} callback 回调事件
 * @param {Number} interval 轮询间隔时间
 */
export const pollingHttp = (callback: Function, interval = 2000) => {
  let timer: any,
    isStop = false
  const stop = () => {
    isStop = true
    clearTimeout(timer)
  }
  const start = async () => {
    isStop = false
    await loopEvent()
  }
  const loopEvent: any = async () => {
    try {
      await callback(stop)
    } catch (err: any) {
      throw new Error('轮询出错：', err)
    }
    if (isStop) return
    return (timer = setTimeout(loopEvent, interval))
  }
  return { start, stop }
}
