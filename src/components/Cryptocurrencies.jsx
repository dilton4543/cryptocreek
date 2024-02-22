import React, { useState } from 'react';
import millify from 'millify'; 
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import {useGetCryptosQuery} from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => { //we are accessing the prop here which makes it locally available as a varibale to this script file.
  const minus= '-';
  const plus = '+';
  const count = simplified ? 10: 100; //to only show 10 cryptocurrencies in the homepage
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count); //destructuring the data and isFetching states from the RTK Query, then we are changing the data variable to cryptosList which we would use as our initial state in this component. WE ARE PASSING THE count VARIABLE THAT STORES THE SIMPLIFIED VIEW PASSED AS A PROP FROM THE Homepage, as the current state of the cryptocurrencies page. so the simplified prop is what differentiates it from the cryptocurrencies. 
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins); //this initial state  will give us access to all the coins.
  console.log(cryptos);

  if(isFetching) return 'Loading...';
  return (
    <>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos ?.map((crypto)=>( 
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card 
                title={`${crypto.rank} . ${crypto.name}`}
                extra={<img className='crypto-image' src={crypto.iconUrl} />}
                hoverable
              >
                  <p> Price: ${millify(crypto.price)} </p>
                  <p> Market Cap: ${millify(crypto.marketCap)} </p>
                 <p> Daily Change:+{millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))} 
      </Row>
    </>
  )
}

export default Cryptocurrencies
