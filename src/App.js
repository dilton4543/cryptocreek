import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails, Profile, Signup, Login,PrivateRoute } from './components';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className="main">
        <Layout className='layout'>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/homepage" element={<PrivateRoute isLoggedIn={isLoggedIn}><Homepage /></PrivateRoute>} />
              <Route path="/exchanges" element={<PrivateRoute isLoggedIn={isLoggedIn}><Exchanges /></PrivateRoute>} />
              <Route path="/cryptocurrencies" element={<PrivateRoute isLoggedIn={isLoggedIn}><Cryptocurrencies /></PrivateRoute>} />
              <Route path="/crypto/:coinuuId" element={<PrivateRoute isLoggedIn={isLoggedIn}><CryptoDetails /></PrivateRoute>} />
              <Route path="/news" element={<PrivateRoute isLoggedIn={isLoggedIn}><News /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn}><Profile /></PrivateRoute>} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Space className='footer-links'>
            <Link to="/homepage">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center', fontSize: '13px' }}>
            Cryptocreek <br />
            All Rights Reserved
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default App;
