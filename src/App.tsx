import { ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
import { RootState, useSelector } from '@/redux'
import AuthRouter from '@/routers/authRouter'
import Router from '@/routers/index'
import useTheme from '@/hooks/useTheme'
import zhCN from 'antd/lib/locale/zh_CN'

const App = () => {
  const { assemblySize } = useSelector((state: RootState) => state.global)

  // 全局使用主题
  useTheme()

  return (
    <HashRouter>
      <ConfigProvider locale={zhCN} componentSize={assemblySize}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </HashRouter>
  )
}

export default App
