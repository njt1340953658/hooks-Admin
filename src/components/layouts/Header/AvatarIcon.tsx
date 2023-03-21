import { Avatar, Modal, Dropdown, message, type MenuProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/routers'
import { useDispatch } from '@/redux'
import { setToken } from '@/redux/modules/global'
import avatar from '@/assets/images/avatar.png'

const AvatarIcon = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '温馨提示 🧡',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch(setToken(''))
        message.success('退出登录成功！')
        navigate('/login')
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span className="dropdown-item">首页</span>,
      onClick: () => navigate(HOME_URL)
    },
    {
      key: '2',
      label: <span className="dropdown-item">退出登录</span>,
      onClick: logout
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" arrow trigger={['click']}>
        <Avatar size="large" src={avatar} />
      </Dropdown>
    </>
  )
}

export default AvatarIcon
