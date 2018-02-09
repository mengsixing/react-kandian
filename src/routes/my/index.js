import React from 'react'
import { connect } from 'dva'
import { Result, Button, List } from 'antd-mobile'
import Header from '../../components/header/header'
import logo from './notice.png'

class My extends React.Component {
  shouldComponentUpdate(nextProp, nextState) {
    if (nextProp.match.path === '/my' && nextProp.appState.number === this.props.appState.number && nextProp.appState.loading === this.props.appState.loading) {
      return false
    } else {
      return true
    }
  }
  clicknumAsync() {
    this.props.dispatch({ type: 'appState/add' })
  }
  render() {
    var addbutton = <Button type="primary" onClick={this.clicknumAsync.bind(this)}>手动加1</Button>
    if (this.props.appState.loading === true) {
      addbutton = <Button disabled type="primary">正在加1...</Button>
    }
    return (
      <div>
        <Header title="我的"></Header>
        <Result
          img={<img src={logo} alt="Logo" />}
          title="温馨提示"
          message="我的页面！"
        />
        <List>
          <List.Item extra={this.props.appState.number}>阅读数：</List.Item>
        </List>
        {addbutton}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { appState: state.appState }
}

export default connect(mapStateToProps)(My)
