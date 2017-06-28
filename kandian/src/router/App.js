import React from 'react';
import './App.css';
import Home from '../containers/home/index'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'








const APP = () => (
    <Router>
            <Route exact path="/" component={Home}/>
    </Router>
)


export default APP;
