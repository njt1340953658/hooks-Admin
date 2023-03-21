import { Layout } from 'antd'
import AvatarIcon from './AvatarIcon'
import CollapseIcon from './CollapseIcon'
import BreadcrumbNav from './BreadcrumbNav'
import Fullscreen from './Fullscreen'
import './index.less'

const LayoutHeader = () => {
  const { Header } = Layout

  return (
    <Header>
      <div className="header-lf">
        <CollapseIcon />
        <BreadcrumbNav />
      </div>
      <div className="header-ri">
        <Fullscreen />
        <span className="username">Hooks</span>
        <AvatarIcon />
      </div>
    </Header>
  )
}

export default LayoutHeader
