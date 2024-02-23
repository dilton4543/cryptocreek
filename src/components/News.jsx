
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Title } = Typography;

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory: 'coindesk', count: simplified ? 10 : 100 }); //newsCategory can be changed to theguardian,coindesk, bsc

  if (isFetching) return <div>Loading...</div>;

  // If simplified, slice the array to get only the first 10 items
  const newsToRender = simplified ? cryptoNews?.data?.slice(0, 10) : cryptoNews?.data;

  return (
    <Row gutter={[24, 24]}>
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