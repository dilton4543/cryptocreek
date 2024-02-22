import React from 'react'
import millify  from 'millify' //the package thats going to format our numbers
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography; //we are destructuring the Title from typography object because we dont always want to say Typography.title.

const Homepage = () => {
  const{data, isFetching } = useGetCryptosQuery(); //we are adding a custom hook from RTK Query and equating it to useGetCryptosQuery() as the initial state of our home component. so basically if the data is fetched or if its still fetching...
  const globalStats = data?.data?.stats; //storing the data we get in a variable so we can use it access different data from our API e.g totalMarketcap, total, exchanges e.t.c..

  console.log(data);
  if(isFetching) return 'Loading...';

  return (
    <>
      <Title level={3}  className="heading" >Global Crypto Stats</Title>
      <Row>
        <Col span={12}> <Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins}/> </Col>
        <Col span={12}> <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /> </Col>
        <Col span={12}> <Statistic title="Total Market Cap" value= {millify(globalStats.totalMarketCap)} /> </Col>
        <Col span={12}> <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /> </Col>
        <Col span={12}> <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /> </Col>
        {/* <Col span={12}> <Statistic title="Total Cryptocurrencies" value="5" /> </Col> */}
      </Row>
    </>
  )
}

export default Homepage
