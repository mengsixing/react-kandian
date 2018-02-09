import React from 'react'
import { Router, Route, Switch, NavLink } from 'dva/router'
import Home from './routes/home/index'
import My from './routes/my/index'
import Detail from './routes/detail/index'
import routerStyle from './router.less'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route path="/my" component={My} />
        </Switch>
        <div className={routerStyle.tabPanel}>
          <div className={routerStyle.tabPanelItem}>
            <NavLink exact to="/" activeClassName="active">首页</NavLink>
          </div>
          <div className={routerStyle.tabPanelItem}>
            <NavLink exact to="/my" activeClassName="active">我的</NavLink>
          </div>
        </div>
      </div>
    </Router>
  )
}


export default RouterConfig
