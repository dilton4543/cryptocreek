import React, {useState} from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Link } = Typography;

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const onFinish = async (values) => {
     setIsLoading(true);
    try {

      const body = {
        ...values
      }

      const response = await fetch('https://cryprocreek.onrender.com/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to log in'); // Throw error if response is not okay
      }

     // Assuming the backend returns an object with token, refreshToken, and user details
      const { token, refreshToken, user } = await response.json();
  
      // Store the token and user ID in localStorage for later use
      localStorage.setItem('accessToken', token);
      if (refreshToken) { // If your API provides a refreshToken, store it; otherwise, this can be omitted
         localStorage.setItem('refreshToken', refreshToken);
      }
      localStorage.setItem('userId', user._id); // Adjust based on your actual user ID field name
 
      console.log('Login successful:', user);
      console.log('Token:', token);
      console.log('Refresh token:', refreshToken);

      setIsLoggedIn(true); // Update the login state
      // Redirect to homepage or dashboard upon successful login
      navigate('/profile');

    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, possibly show an error message to the user
      notification.error({
        message: 'Login Failed',
        description: 'Incorrect username or password.',
        duration: 4.5, // Duration the notification stays open, in seconds (optional)
      });
    }
    finally {
      setIsLoading(false); // This will execute after try/catch no matter what
    }
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
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
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
            <a className="login-form-forgot" href="/" style={{ float: 'right', color: 'white' }}>
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button" block loading={isLoading} // Pass the loading state to the button's loading prop
          >
      Log in
     </Button>
            <div style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>
              Or <Link to="/signup">Register now</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
