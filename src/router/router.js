import React from 'react'
import Home from '../containers/home/'
import My from '../containers/my/'
import Detail from '../containers/detail/'
import {connect} from 'react-redux'
import {
    HashRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
import './router.css'

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
                       <div className="tab-panel">
                           <div className= {this.props.tab==="home"?"tab-panel-item active":"tab-panel-item" }>
                                <Link to="/">首页</Link>
                           </div>
                           <div className= {this.props.tab==="my"?"tab-panel-item active":"tab-panel-item" }>
                               <Link to="/my">我的</Link>
                           </div>
                       </div>

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
