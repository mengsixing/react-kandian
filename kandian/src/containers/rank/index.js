/**
 * Created by yhlmmm on 2017/6/28.
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tabpanelActions from '../../actions/tabpanel'

class Rank extends React.Component {
    constructor(){
        super()
        this.state={
            user:"xiaowang",
            count2:'22'
        };
    }
    componentWillMount() {
        this.props.tabPanelActions.changeTabPanel({panel:'my'});
    }
    componentDidMount(){
        console.log(this.props)
    }
    changeUserName(){
        console.log(this.props);
    }
    gotoIndex(){
        this.props.history.push('/')
    }

    render(){
        return (
            <div>
                <p>ranking {this.props.match.params.id}</p>
                <p>{this.state.user}</p>
                <p>{this.props.tab}</p>
                <p><button onClick={this.changeUserName.bind(this)}>点击改变用户名</button></p>
                <p><button onClick={this.gotoIndex.bind(this)}>gotoIndex</button></p>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { tab: state.tabpanel.tab }
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