import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Your new API key and host for the crypto-news16 API
const cryptoNewsHeaders = {
  'X-RapidAPI-Key': '35ba829ae0mshc74a68ae4717089p16b127jsne6140ff25e92',
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
};

// The new base URL for the crypto-news16 API
const baseUrl = 'https://crypto-news16.p.rapidapi.com/news';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// Defining the API slice
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Updating the query to match the new API's endpoints
    // Assuming you want to fetch top news from CoinDesk
    getCryptoNews: builder.query({
      query: ({ count = 10 }) => createRequest(`/top/${count}`),  
    }),
    // Add other endpoints here if needed
  }),
});

// Export hooks for usage in function components
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
