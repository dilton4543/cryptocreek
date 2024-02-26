import React from 'react';
import { Form, Input, Button, Row, Col, Typography, DatePicker } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const { Title, Link } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Hook for navigation

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Here you would send a request to your backend to register the user
    // After successful registration, redirect to the login page
    navigate('/login'); // Replace '/login' with your login route
  };

  return (
    <Row align="middle" justify="center" style={{ minHeight: '100vh', background: '#001529', borderRadius: '8px'}}>
      <Col>
        <Form
          name="register"
          onFinish={onFinish}
          form={form}
          scrollToFirstError
        >
          <Title style={{ color: 'white', textAlign: 'center' }}>Sign Up</Title>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            rules={[{ type: 'object', required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker prefix={<CalendarOutlined />} style={{ width: '100%' }} placeholder="Date of Birth" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Re-enter Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Link href="/login" style={{ color: 'white' }}>Already have an account? Login</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;