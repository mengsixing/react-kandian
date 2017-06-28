/**
 * Created by Thinkpad on 2017/6/28.
 */
import React from 'react'
import { NavLink } from 'react-router-dom'



class Home extends React.Component {
    componentWillMount(){
    }
    render() {
        return <div>
            <p>home</p>
            <p><NavLink to="/rank">qu rank</NavLink></p>
        </div>;
    }
}


export default Home
