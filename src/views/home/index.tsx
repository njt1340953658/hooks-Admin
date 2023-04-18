import './index.less'
import { useState } from 'react'

const Home = () => {
  const [iframeUrl] = useState<string>('https://www.123pan.com')

  return (
    <div>
      <div className="home">React vite首页</div>
      <iframe className="iframe_box" src={iframeUrl}></iframe>
    </div>
  )
}

export default Home
