//Creating our own custom Api service that we will use to fetch Api data from rapid Api.

import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//the first thing we need is the headers
const cryptoApiHeaders={  //setting the headers we get from rapidApi then storing it in an object variable
    'X-RapidAPI-Key': '35ba829ae0mshc74a68ae4717089p16b127jsne6140ff25e92',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com' 
} 

//Second thing we need is the baseUrl
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders}) //we created a simple utitlity function that adds the url and headers to our call. So instead of just calling exchanges we call this function and pass in auguments for both the url and headers(the headers is the cryptoApiHeader object we created)

export const cryptoApi = createApi({  //we have to pass some options inside of an object
    reducerPath: 'cryptoApi',   //the first thing is the reudcer path i.e what is this reducer for?, and so that we can call the reducerpath using the cryptoApi in the store.js

    baseQuery: fetchBaseQuery({baseUrl}), //the second is the baseQuery 
    endpoints: (builder) =>({  //the third are the endpoints
        getCryptos: builder.query({
            query: () => createRequest('/coins') //you provide a function that points to that request
        }) //you can name the getCryptos anything you want
    })  
});

export const {
    useGetCryptosQuery, //redux toolkit creates a custom hook that we can call to get all the data for our query, and also manage the state of our component. so we export it here so we can use it in our home component where the data is fetched.
} = cryptoApi;