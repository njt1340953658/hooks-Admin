import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { setAuthButtons } from '@/redux/modules/auth'
import { updateCollapse } from '@/redux/modules/menu'
import { getAuthorButtons } from '@/api/login'
import { RootState, useDispatch, useSelector } from '@/redux'
import LayoutMenu from './Menu'
import LayoutHeader from './Header'
import './index.less'

const LayoutIndex = () => {
  const dispatch = useDispatch()
  const { isCollapse } = useSelector((state: RootState) => state.menu)

  const { Sider, Content } = Layout

  // 获取按钮权限列表
  const getAuthButtonsList = async () => {
    const { data } = await getAuthorButtons()
    dispatch(setAuthButtons(data!))
  }

  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth
        if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true))
        if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false))
      })()
    }
  }

  useEffect(() => {
    listeningWindow()
    getAuthButtonsList()
  }, [])

  return (
    // 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
    <section className="container">
      <Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
        <LayoutMenu></LayoutMenu>
      </Sider>
      <Layout>
        <LayoutHeader></LayoutHeader>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </section>
  )
}

export default LayoutIndex
