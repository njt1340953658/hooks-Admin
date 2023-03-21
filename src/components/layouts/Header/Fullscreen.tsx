import screenfull from 'screenfull'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons'

const Fullscreen = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true)
      else setFullScreen(false)
      return () => screenfull.off('change', () => {})
    })
  }, [])

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌')
    screenfull.toggle()
  }
  return (
    <i className={['icon-style iconfont'].join(' ')} onClick={handleFullScreen}>
      {fullScreen ? <CompressOutlined /> : <ExpandOutlined />}
    </i>
  )
}
export default Fullscreen
