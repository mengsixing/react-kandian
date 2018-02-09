import React from 'react'
import { connect } from 'dva'
import { Result, Button, List } from 'antd-mobile'
import Header from '../../components/header/header'
import logo from './notice.png'

const My =(props)=>{
    const clicknumAsync=()=>props.dispatch({ type: 'appState/add' })
    var addbutton = <Button type="primary" onClick={clicknumAsync}>手动加1</Button>
    if (props.appState.loading === true) {
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
          <List.Item extra={props.appState.number}>阅读数：</List.Item>
        </List>
        {addbutton}
      </div>
    )
  }

function mapStateToProps(state) {
  return { appState: state.appState }
}

export default connect(mapStateToProps)(My)
