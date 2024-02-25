import React, { useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Select } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title,Text } = Typography;
const {Option} = Select;

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory]= useState('coindesk'); //since the initail state is coindesk here, we dont have to hardcode it below again.(newsCategory:'coindesk')
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 10 : 100 }); //newsCategory can be changed to theguardian,coindesk, bsc
  const {data} = useGetCryptosQuery(100);

  if (isFetching) return <Loader />;

  // If simplified, slice the array to get only the first 10 items
  const newsToRender = simplified ? cryptoNews?.data?.slice(0, 9) : cryptoNews?.data;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch 
            className='select-news'
            placeholder="select a crypto"
            optionFilterProp='children'
            onChange={(value)=> setNewsCategory(value)}
            filterOption={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
              <Option value="coindesk"> Cryptocurrency </Option>
              {data?.data?.coins.map((coin)=> <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {newsToRender?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={news.url}>
          <Card hoverable>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              <div className="news-image-container">
                <img
                  src={news.thumbnail}
                  alt={news.title}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
              <div className="news-card-content">
                <Title className="news-title" level={4}>{news.title}</Title>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
              </div>
              <div className="provider-container">
                <Title level={5}>{moment(news.createdAt).fromNow()}</Title>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;