import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '@/api/login'
import { HOME_URL } from '@/routers'
import { setToken } from '@/redux/modules/global'
import { useDispatch } from '@/redux'
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  // login
  const onFinish = async (loginForm) => {
    try {
      setLoading(true)
      loginForm.password = 'e10adc3949ba59abbe56e057f20f883e'
      const { data } = await loginApi(loginForm)
      dispatch(setToken(data!.access_token))
      message.success('登录成功！')
      navigate(HOME_URL)
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields()
          }}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
        <Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
