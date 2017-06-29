/**
 * Created by Thinkpad on 2017/6/28.
 */
import React from 'react'
import Header from '../../compontents/header/header'
import { Tabs,List } from 'antd-mobile'
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


class Home extends React.Component {
    componentWillMount(){
    }
    render() {
        return <div>
            <Header />
            <Tabs>
                <TabPane tab="头条" key="1"></TabPane>
                <TabPane tab="社会" key="2"></TabPane>
                <TabPane tab="国内" key="3"></TabPane>
                <TabPane tab="国际" key="4"></TabPane>
                <TabPane tab="娱乐" key="5"></TabPane>
                <TabPane tab="体育" key="6"></TabPane>
                <TabPane tab="军事" key="7"></TabPane>
                <TabPane tab="科技" key="8"></TabPane>
                <TabPane tab="财经" key="9"></TabPane>
                <TabPane tab="时尚" key="10"></TabPane>
            </Tabs>
            <List className="my-list">
                <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    标题文字 <Brief>副标题  副标题  副标题</Brief>
                </Item>
            </List>
        </div>;
    }
}


export default Home
