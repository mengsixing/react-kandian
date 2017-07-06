import React from 'react'
import Home from '../containers/home/'
import My from '../containers/my/'
import Detail from '../containers/detail/'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

class APP extends React.Component {
    press(key) {
        switch (key) {
            case 'home':
                window.location.href = '/'
                break
            case 'my':
                window.location.href = '/#/my'
                break
            default:
                window.location.href = '/'
                break
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/detail/:id" component={Detail}/>
                            <Route path="/my" component={My}/>
                        </Switch>
                        <TabBar>
                            <TabBar.Item
                                title="首页"
                                key="首页"
                                icon={{uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg'}}
                                selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'}}
                                selected={this.props.tab === 'home'}
                                onPress={this.press.bind(this, 'home')}
                            >
                            </TabBar.Item>
                            <TabBar.Item
                                icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                                selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                                title="我的"
                                key="我的"
                                selected={this.props.tab === 'my'}
                                onPress={this.press.bind(this, 'my')}
                            >
                            </TabBar.Item>
                        </TabBar>
                    </div>
                </Router>
            </div>
        )
    }
}
//获取redux store里面的tab信息
function mapStateToProps(state) {
    return {tab: state.tabpanel.panel}
}

export default connect(
    mapStateToProps
)(APP) ;
