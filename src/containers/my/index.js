import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Result,Button,InputItem,List  } from 'antd-mobile'
import * as tabpanelActions from '../../actions/tabpanel'
import * as clicknumActions from '../../actions/clicknum'
import Header from '../../compontents/header/header'
import logo from './notice.png'
var buttonText="点击加1";

class Rank extends React.Component {
    componentWillMount() {
        //设置redux 中tab的值
        this.props.tabPanelActions.changeTabPanel({panel:'my'});
    }
    gotoIndex(){
        this.props.history.push('/')
    }
    clicknumAsync(){
        this.props.clicknumActions.changeClickNumberAsync();
    }
    render(){
        var addbutton=<Button type="primary"  onClick={this.clicknumAsync.bind(this)}>{buttonText}</Button>;
        if(this.props.loading===true){
            addbutton=<Button disabled  type="primary">正在加1...</Button>;
            console.log('改变成+1状态');
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
          <InputItem
            editable="false"
            placeholder="click label to focus input"
            value={this.props.number}
          ><div>当前数量</div></InputItem>
                </List>
                {addbutton}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { tab: state.tabpanel.panel,number:state.clicknum.number,loading:state.clicknum.loading }
}
function mapDispatchToProps(dispatch) {
    return {
        tabPanelActions: bindActionCreators(tabpanelActions, dispatch),
        clicknumActions: bindActionCreators(clicknumActions, dispatch)
    }
}

 export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rank)