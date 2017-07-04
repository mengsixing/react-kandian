import React from 'react';
import './App.css';
import Home from '../containers/home/'
import Rank from '../containers/rank/'
import Detail from '../containers/detail/'
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

class APP extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }

    press(key){
        this.setState({
            selectedTab: key,
        });
    }
    componentDidMount(){

    }

    render(){
        return (
    <div>
        <Router>
            <div>
                <div>{this.props.tab}</div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/rank" component={Rank}/>
                </Switch>
            </div>

        </Router>
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
        >
            <TabBar.Item
                title="生活"
                key="生活"
                icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg' }}
                selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg' }}
                selected={this.state.selectedTab === 'blueTab'}
                onPress={this.press.bind(this,'blueTab')}
            >
                '生活'
            </TabBar.Item>
            <TabBar.Item
                icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                title="我的"
                key="我的"
                selected={this.state.selectedTab === 'yellowTab'}
                onPress={this.press.bind(this,'yellowTab')}
            >
            </TabBar.Item>
        </TabBar>
    </div>
)}
}

function mapStateToProps(state) {
    debugger;
    return { tab: state.tabpanel.panel }
}

export default  connect(
    mapStateToProps
)(APP) ;
