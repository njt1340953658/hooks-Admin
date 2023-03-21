import type { SizeType } from 'antd/lib/config-provider/SizeContext'

/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string
  isDark: boolean
  weakOrGray: string
}

/* GlobalState */
export interface GlobalState {
  token: string
  userInfo: any
  assemblySize: SizeType
  language: string
  themeConfig: ThemeConfigProp
}

/* MenuState */
export interface MenuState {
  isCollapse: boolean
  menuList: any[]
}

/* TabsState */
export interface TabsState {
  tabsActive: string
  tabsList: any[]
}

/* BreadcrumbState */
export interface BreadcrumbState {
  breadcrumbList: {
    [propName: string]: any
  }
}

/* AuthState */
export interface AuthState {
  authButtons: {
    [propName: string]: any
  }
  authRouter: string[]
}
