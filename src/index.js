//WE THEN RENDER THE APP.JS THAT CAPTURES ALL THE DIFFFERENT COMPONENTS AND SEND IT TO THE INDEX.HTML FILE USING THE DOM method

import React from 'react';
import  ReactDOM  from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';

ReactDOM.render( //to be able to use the links we need to wrap our app component in a Router 
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);