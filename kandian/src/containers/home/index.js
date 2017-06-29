/**
 * Created by Thinkpad on 2017/6/28.
 */
import React from 'react'
import Header from '../../compontents/header/header'
import { Button } from 'antd-mobile'


class Home extends React.Component {
    componentWillMount(){
    }
    render() {
        return <div>
            <Header />
            <Button className="btn" type="primary">primary button</Button>
            <p>home</p>
        </div>;
    }
}


export default Home
