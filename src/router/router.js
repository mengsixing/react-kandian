import React from 'react'
import Home from '../containers/home/'
import My from '../containers/my/'
import Detail from '../containers/detail/'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom'
import './router.css'

class APP extends React.PureComponent {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}  />
                            <Route exact path="/detail/:id" component={Detail}/>
                            <Route exact path="/my" component={My}/>
                        </Switch>
                       <div className="tab-panel">
                           <div className="tab-panel-item">
                                <NavLink exact to="/"  activeClassName="active">首页</NavLink>
                           </div>
                           <div className="tab-panel-item">
                               <NavLink exact to="/my" activeClassName="active">我的</NavLink>
                           </div>
                       </div>

                    </div>
                </Router>
            </div>
        )
    }
}


export default APP;
