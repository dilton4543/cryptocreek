//we import all our components here and also include the routes for the different components adn then we export it so it can be used in the index.js

import React from 'react';
import { Routes, Route, Link} from 'react-router-dom'; //versions 5 below use Switch not Routes
import { Layout, Typography, Space } from 'antd';

import { Navbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails } from './components'; // importing our Navbar component from the components folder because we have already exported it in our (components/index.js) folder.

import './App.css';
// import 'antd/dist/antd.css';

const App = () => { //Routes
  return (
    <div className="app">

      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout> {/* the layout componenent is a component from antDesign which basically just lays everything down */}
          <div className="routes">
            <Routes>  {/* old versions from 5 below use 'Switch' and pass in components directly instead of passing them in a prop element(element{<Example/>}) */}
              <Route  
              exact path="/"
              element={<Homepage />}
              />
              <Route  
              exact path="/exchanges"
              element={<Exchanges />}
              />
              <Route  
              exact path="/cryptocurrencies"
              element={<Cryptocurrencies />}
              />
              <Route  
              exact path="/crypto/:coinId"
              element={<CryptoDetails />}  
              />  {/* the colon means that the coinId will be dynamic, it could be 1,2,3,56,37,33... */}
              <Route  
              exact path="/news"
              element={<News />}
              />
              </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            Cryptocreek <br />
            All Rights Reserved
          </Typography.Title>

          <Space> {/* Space --ants designs way of creating a div */}
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
      </div> 

      </div>
    </div>
  )
}

export default App