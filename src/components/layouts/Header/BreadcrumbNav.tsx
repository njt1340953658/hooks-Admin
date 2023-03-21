import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { RootState, useSelector } from '@/redux'

const BreadcrumbNav = () => {
  const { pathname } = useLocation()
  const breadcrumbState = useSelector((state: RootState) => state.breadcrumb)
  const breadcrumbList = breadcrumbState.breadcrumbList[pathname] || []

  return <Breadcrumb items={breadcrumbList} />
}

export default BreadcrumbNav
