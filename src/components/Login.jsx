import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Add your login logic here and call navigate on success
    navigate('/');
  };

  return (
    <Row align="middle" justify="center" style={{ minHeight: '100vh', background: '#001529', borderRadius: '8px'  }}>
      <Col span={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Title level={2} style={{ color: 'white', textAlign: 'center' }}>Login</Title>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
            <a className="login-form-forgot" href="" style={{ float: 'right', color: 'white' }}>
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              Log in
            </Button>
            <div style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>
              Or <a href="/signup" style={{ color: 'white' }}>register now!</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
