import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': '35ba829ae0mshc74a68ae4717089p16b127jsne6140ff25e92',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};
const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      // For demonstration, we're using CoinDesk. Replace with your actual endpoint logic.
      query: ({ newsCategory = 'coindesk', count }) => createRequest(`/v1/${newsCategory}?limit=${count}`),
    }), //newsCategory can be changed to theguardian,coindesk, bsc
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;