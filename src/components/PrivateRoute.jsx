import React from 'react';
import { Navigate } from 'react-router-dom';
import { notification } from 'antd'; // Import notification

const PrivateRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    // Trigger a notification before redirecting
    notification.open({
      message: 'Authentication Required',
      description: 'Please login to your account to access this page.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });

    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
