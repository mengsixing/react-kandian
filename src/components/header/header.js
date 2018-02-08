import React from 'react'
import styles from './header.css'

class Header extends React.Component{
    render(){
        return (
            <div className={styles.header}>{this.props.title}</div>
        )
    }
}

export default Header
