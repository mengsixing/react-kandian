import React from 'react';
import './App.css';
import Home from '../containers/home/index'
import Rank from '../containers/rank/index'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


const APP = () => (
    <Router>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/rank" component={Rank}/>
        </Switch>
    </Router>
)


export default APP;
