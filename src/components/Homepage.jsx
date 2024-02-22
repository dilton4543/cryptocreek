import React from 'react'
import millify  from 'millify' //the package thats going to format our numbers
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';


const { Title } = Typography; //we are destructuring the Title from typography object because we dont always want to say Typography.title.

const Homepage = () => {
  const{data, isFetching } = useGetCryptosQuery(10); //we passed 10 here as augument for the function call
   //we are adding a custom hook from RTK Query and equating it to useGetCryptosQuery() as the initial state of our home component. so basically if the data is fetched or if its still fetching...
  const globalStats = data?.data?.stats; //storing the data we get in a variable so we can use it access different data from our API e.g totalMarketcap, total, exchanges e.t.c..

  console.log(data);
  if(isFetching) return 'Loading...';

  return (
    <> {/* the prescence of this react fragment serve as a lightweight syntax to group a list of children elements without adding extra nodes to the DOM. This feature is particularly useful when you want to return multiple elements from a component without wrapping them in a redundant <div> or other DOM element or tags...*/}
    
      <Title level={3}  className="heading" >Global Crypto Stats</Title>
      <Row>
        <Col span={12}> <Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins}/> </Col>
        <Col span={12}> <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}> <Statistic title="Total Market Cap" value= {millify(globalStats.totalMarketCap)} /> </Col>
        <Col span={12}> <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /> </Col>
        <Col span={12}> <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /> </Col>
        {/* <Col span={12}> <Statistic title="Total Cryptocurrencies" value="5" /> </Col> */}
      </Row>

      <div className="home-heading-container">
        <Title level={2} className='home-title'> Top 10 Cryptocurrencies in the world </Title>
        <Title level={3} className='show-more'> <Link to="/cryptocurrencies">Show more</Link> </Title>
      </div>
      <Cryptocurrencies simplified={true}/> {/* we are passing the cryptocurrencies.js as a simplified view which takes renders only 10 top cryptocurrencies and we can as well leave the value as empty because if we dont specify, automatically its true. */}

      <div className="home-heading-container">
        <Title level={2} className='home-title'> Latest Crypto News </Title>
        <Title level={3} className='show-more'> <Link to="/news">Show more</Link> </Title>
      </div>
      <News />

    </>
  )
}

export default Homepage
