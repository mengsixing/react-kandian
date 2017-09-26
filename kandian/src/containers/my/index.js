import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Result } from 'antd-mobile'
import * as tabpanelActions from '../../actions/tabpanel'
import Header from '../../compontents/header/header'
import logo from './notice.png'

class Rank extends React.Component {
    componentWillMount() {
        //设置redux 中tab的值
        this.props.tabPanelActions.changeTabPanel({panel:'my'});
    }
    gotoIndex(){
        this.props.history.push('/')
    }
    render(){
        return (
            <div>
                <Header title="我的"></Header>
                <Result
                    img={<img src={logo} alt="Logo" />}
                    title="温馨提示"
                    message="我的页面！"
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { tab: state.tabpanel.panel }
}
function mapDispatchToProps(dispatch) {
    return {
        tabPanelActions: bindActionCreators(tabpanelActions, dispatch)
    }
}

 export default connect(
    mapStateToProps,
     mapDispatchToProps
)(Rank)