/**
 * Created by yhlmmm on 2017/6/28.
 */

import React from 'react'

class Rank extends React.Component {
    constructor(){
        super()
        this.state={
            user:"xiaowang"
        };
    }
    componentWillMount(){

    }
    componentDidMount(){
        console.log(this.props.params)
    }
    render(){
        return (
            <div>
                <p>ranking {this.props.match.params.id}</p>
                <p>{this.state.user}</p>
            </div>
        )
    }
}

export default Rank