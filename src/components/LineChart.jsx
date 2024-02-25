import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import 'chartjs-adapter-date-fns'; // Ensure you've installed chartjs-adapter-date-fns

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []; 
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    // Convert timestamp to a more chart-friendly format if necessary
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MM/dd/yyyy', // Corrected format
          unit: 'day',
        },
      },
      y: {
        ticks: {
          beginAtZero: false,
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'index',
        intersect: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <div style={{ height: "400px" }}> {/* Adjust height as necessary */}
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
