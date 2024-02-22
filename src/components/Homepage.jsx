import React from 'react'
import millify  from 'millify' //the package thats going to format our numbers
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography; //we are destructuring the Title from typography object because we dont always want to say Typography.title.

const Homepage = () => {
  return (
    <>
      <Title level={3}  className="heading" >Global Crypto Stats</Title>
      <Row>
        <Col span={12}> <Statistic title="Total Cryptocurrencies" value="5" /> </Col>
        <Col span={12}> <Statistic title="Total Exchanges" value="5" /> </Col>
        <Col span={12}> <Statistic title="Total Market Cap" value="5" /> </Col>
        <Col span={12}> <Statistic title="Total 24h Volume" value="5" /> </Col>
        <Col span={12}> <Statistic title="Total Markets" value="5" /> </Col>
        {/* <Col span={12}> <Statistic title="Total Cryptocurrencies" value="5" /> </Col> */}
      </Row>
    </>
  )
}

export default Homepage
