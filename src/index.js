//WE THEN RENDER THE APP.JS THAT CAPTURES ALL THE DIFFFERENT COMPONENTS AND SEND IT TO THE INDEX.HTML FILE USING THE DOM method

import React from 'react';
import  ReactDOM  from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './App';
import store from './app/store'; //we are providing the store variable to our provider.

ReactDOM.render( //to be able to use the links we need to wrap our app component in a Router. we also put the app component in our provider so that every component from the app can have access to the store variable.
    <Router>
        <Provider store={store}> 
         <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);