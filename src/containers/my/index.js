import React from 'react'
import { Result, Button, List } from 'antd-mobile'
import Header from '../../compontents/header/header'
import { inject, observer } from 'mobx-react'
import logo from './notice.png'


class My extends React.Component {
    shouldComponentUpdate(nextProp, nextState) {
        if (nextProp.match.path === '/my' && nextProp.number === this.props.number && nextProp.loading === this.props.loading) {
            return false
        } else {
            return true
        }
    }
    gotoIndex() {
        this.props.history.push('/')
    }
    clicknumAsync() {
        //直接修改注入的appState属性，会被mobx检测到，然后重新渲染被修改的组件
        this.props.appState.number++
    }
    render() {
        var addbutton = <Button type="primary" onClick={this.clicknumAsync.bind(this)}>手动加1</Button>
        if (this.props.loading === true) {
            addbutton = <Button disabled type="primary">正在加1...</Button>;
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

//注入appState状态
export default inject("appState")(observer(My))
