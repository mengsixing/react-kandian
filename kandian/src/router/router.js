import React from 'react';
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


    press(key){
        if(key==='home'){
            window.location.href='/';
        }
        if(key==='my'){
            window.location.href='/my';
        }
    }

    render(){
        return (
    <div>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/my" component={Rank}/>
                </Switch>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={false}
                >
                    <TabBar.Item
                        title="生活"
                        key="生活"
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg' }}
                        selected={this.props.tab === 'home'}
                        onPress={this.press.bind(this,'home')}
                    >

                    </TabBar.Item>

                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                        title="我的"
                        key="我的"
                        selected={this.props.tab === 'my'}
                        onPress={this.press.bind(this,'my')}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>

        </Router>


    </div>
)}
}

function mapStateToProps(state) {
    return { tab: state.tabpanel.panel }
}

export default  connect(
    mapStateToProps
)(APP) ;
