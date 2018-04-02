import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Result,Button,List  } from 'antd-mobile'
import * as clicknumActions from '../../actions/clicknum'
import Header from '../../compontents/header/header'
import logo from './notice.png'
import { createSelector } from 'reselect'


class Rank extends React.Component {
    
    shouldComponentUpdate(nextProp,nextState){
        if(nextProp.match.path==='/my' && nextProp.number===this.props.number && nextProp.loading===this.props.loading){
            return false
        }else{
            return true
        }
    }
    gotoIndex(){
        this.props.history.push('/')
    }
    clicknumAsync(){
         this.props.clicknumActions.changeClickNumberAsync();
    }
    render(){
        var addbutton=<Button type="primary"  onClick={this.clicknumAsync.bind(this)}>手动加1</Button>;
        if(this.props.loading===true){
            addbutton=<Button disabled type="primary" >正在加1...</Button>;
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
                <List.Item extra={this.props.number}>阅读数：</List.Item>
                </List>
                {addbutton}
            </div>
        )
    }
}

//这里引用reselect库，缓存mapStateToProps中的number数据，下一次组件更新，如果number不变就不需要再计算了。
const numberSelector = state => state.clicknum.number
const subtotalSelector = createSelector(
    numberSelector,
    items => items+'(uv)'
  )

function mapStateToProps(state) {
    return { 
        number:subtotalSelector(state),
        loading:state.clicknum.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        clicknumActions: bindActionCreators(clicknumActions, dispatch)
    }
}

 export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rank)
