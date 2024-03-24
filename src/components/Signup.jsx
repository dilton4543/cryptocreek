import React from 'react';
import { Form, Input, Button, Row, Col, Typography, DatePicker } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const { Title, Link } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Hook for navigation

  const onFinish = async (values) => {
    try {
      const response = await fetch('https://cryprocreek.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Sending form data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up'); // Throw error if response is not okay
      }
  
      // If signup is successful, redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, possibly show an error message to the user
    }
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
            <Link a href="/" style={{ color: 'white' }}>Already have an account? Login by clicking the link below</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;
