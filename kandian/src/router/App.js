import React from 'react';
import './App.css';
import Home from '../containers/home/'
import Rank from '../containers/rank/'
import Detail from '../containers/detail/'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


const APP = () => (
    <Router>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/detail/:id" component={Detail}/>
        <Route path="/rank" component={Rank}/>
        </Switch>
    </Router>
)


export default APP;
