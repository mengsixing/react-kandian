import React from 'react'
import './header.css'

class Header extends React.Component{
    render(){
        return (
            <div className="header">{this.props.title}</div>
        )
    }
}

export default Header