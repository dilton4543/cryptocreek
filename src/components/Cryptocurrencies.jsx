import React, { useState, useEffect } from 'react';
import millify from 'millify'; 
import { Link } from 'react-router-dom';

import {Card, Row, Col, Input} from 'antd';

import {useGetCryptosQuery} from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => { //we are accessing the prop here which makes it locally available as a varibale to this script file.

  const count = simplified ? 10: 100; //to only show 10 cryptocurrencies in the homepage
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count); //destructuring the data and isFetching states from the RTK Query, then we are changing the data variable to cryptosList which we would use as our initial state in this component. WE ARE PASSING THE count VARIABLE THAT STORES THE SIMPLIFIED VIEW PASSED AS A PROP FROM THE Homepage, as the current state of the cryptocurrencies page. so the simplified prop is what differentiates it from the cryptocurrencies.

  const [cryptos, setCryptos] = useState([]); //this initial state  will give us access to all the coins. and the initial state is an empty array because we already have a useEffect hook that mounts the initial state of the component.

  // console.log(cryptos);  
  const [SearchTerm, setSearchTerm] = useState(''); 

  useEffect(()=>{
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(SearchTerm.toLowerCase()) ); //this line helps us search or filter out only the searched coin in the array of fetched data from the API.

    setCryptos(filteredData); //we can now update the state of cryptocurrencies.jsx(setCryptos) to filteredData which returns the filtered cryptocurrencies. 

  },[cryptosList, SearchTerm]); //creating the useEffect for when we are chaning the search term. we are adding the cryptosList and the search term as dependency array which signifies that the useeffect call back function only gets executed if their value changes. 

  if(isFetching) return <Loader />;
  return (
    <>
    {!simplified && ( 
      <div className='search-crypto'>
        <input placeholder='Search Cryptocurrency' onChange={(e)=> setSearchTerm(e.target.value)}/>
      </div>)}  {/* we use conditional templating here whereby only if the thing on the left hand is true, then the thing on the right is executed. so if its not a simplified view i.e if the view is more than 10 cryptocurrencies then show the search input field. */}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos ?.map((crypto)=>( 
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card 
                title={`${crypto.rank} . ${crypto.name}`}
                // eslint-disable-next-line
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
