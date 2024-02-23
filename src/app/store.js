import { configureStore } from "@reduxjs/toolkit";
import {cryptoApi} from '../services/cryptoApi'; //now we need to connect our cryptoApi to this store which will be used by our app component
import {cryptoNewsApi} from '../services/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer, //this is the connection
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(cryptoApi.middleware)
        .concat(cryptoNewsApi.middleware),
});