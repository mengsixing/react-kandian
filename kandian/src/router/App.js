import React from 'react';
import './App.css';
import Home from '../containers/home/index'
import Rank from '../containers/rank/index'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'


const APP = () => (
    <Router>
        <div>
        <Route exact path="/" component={Home}/>
        <Route path="/rank/:id" component={Rank}/>
            <Route path="/child" component={Child}/>
        </div>
    </Router>
)

const Child = ({ match }) =>
    (

    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
)

export default APP;
