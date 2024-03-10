import React, { useState } from 'react';
import { Typography, Row, Col, Card, Select } from 'antd'; // Import Select correctly here
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const { Title } = Typography;
const { Option } = Select; // Destructure Option from Select correctly

const News = ({ simplified }) => {
  // Default news category, though this new API may not actually use this parameter
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ count: simplified ? 10 : 100 });

  if (isFetching) return <Loader />;

  // The API appears to return the news articles directly as an array
  const newsToRender = simplified ? cryptoNews?.slice(0, 9) : cryptoNews;

  return (
    <Row gutter={[24, 24]}>
      {/* ... Your existing code ... */}
      {newsToRender?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}> {/* Key changed to 'i' because 'news.url' may not be unique */}
          <Card hoverable>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              <div className="news-image-container">
                {/* The API doesn't seem to provide a thumbnail, so you might need to find another way to display images or remove the image container */}
              </div>
              <div className="news-card-content">
                <Title className="news-title" level={4}>{news.title}</Title>
                <p>
                  {news.description && news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
              </div>
              <div className="provider-container">
                <div>
                  {/* Convert the provided date string to a moment object and format it */}
                  {moment(news.date).fromNow()}
                </div>
                {/* You may want to add the source here if the API provides it */}
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
