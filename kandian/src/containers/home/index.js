import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BScroll from 'better-scroll';
import {
    Tabs,
    List,
    Flex,
    Carousel
} from 'antd-mobile'
import axios from '../../axios/';
import Header from '../../compontents/header/header'
import * as tabpanelActions from '../../actions/tabpanel'
import './index.css'
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

var that;
class Home extends React.Component {
    constructor() {
        super();
        that = this;
        this.state = {
            tagList: [{}],
            bannerList: [],
            newsList: [],
            cid: 0,
            scroller: '',
            pageIndex: 0

        }
        //获取头部tags信息
        axios({
            method: 'get',
            url: '/api/cate/cate_list'
        }).then(function (response) {
            if (response.data.code === 0) {
                //循环绑定data active
                for (var item of response.data.data) {
                    item.active = false;
                }
                that.setState({
                    tagList: response.data.data,
                    cid: response.data.data[0].id
                });
            }
        }).then(function () {
            //获取新闻列表信息
            var cid = that.state.tagList[0].id;
            axios.get('/api/news/news_list?cid=' + cid + '&offset=0')
                .then(function (response) {
                    if (response.data.code === 0) {
                        that.setState({
                            cid: cid
                        });
                        if (response.data.data.dataList.length > 0) {
                            that.setState({
                                pageIndex: 1,
                                newsList: response.data.data.dataList
                            });
                        }
                    }
                });
        });
        //获取banner广告信息
        axios.get('/api/face/face_list').then(function (response) {
            if (response.data.code === 0) {
                that.setState({
                    bannerList: response.data.data.filter(item => item.is_show === '1')
                });
            }
        });
    }

    componentWillMount() {
        this.props.tabPanelActions.changeTabPanel({panel:'home'});
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
        if (that.state.scroller) {
            that.state.scroller.refresh();
        } else {
            that.state.scroller = new BScroll(that.refs.newsListWrapper, {
                click: true,
                scrollbars: true
            });
            that.state.scroller.on("scrollEnd", function () {
                if (that.state.scroller.maxScrollY === that.state.scroller.y) {
                    //获取选中的标签id
                    let tagId = that.state.cid;
                    let offset = (that.state.pageIndex) * 10;
                    axios.get('/api/news/news_list?cid=' + tagId + '&offset=' + offset).then(function (response) {
                        if (response.data.code === 0) {
                            if (response.data.data.dataList.length > 0) {
                                that.setState({
                                    pageIndex: that.state.pageIndex + 1,
                                    newsList: that.state.newsList.concat(response.data.data.dataList)
                                });
                            }
                        }
                    });
                }
            });
        }
    }

    changeTab(key) {
        //获取新闻列表信息
        var cid = that.state.tagList[key].id;
        axios.get('/api/news/news_list?cid=' + cid + '&offset=0')
            .then(function (response) {
                if (response.data.code === 0) {
                    that.setState({
                        cid: cid
                    });
                    if (response.data.data.dataList.length > 0) {
                        that.setState({
                            pageIndex: 0,
                            newsList: response.data.data.dataList
                        });
                    }
                }
            });
    }

    gotoDetail(item){
        this.props.history.push('/detail/'+item.id)
    }

    render() {
        var tabpanes = this.state.tagList.map((item, index) => (
            <TabPane tab={item.name} key={index}></TabPane>
        ));
        var bannerLists = this.state.bannerList.map((item, index) => (
            <a href={item.url} key={index}>
                <img
                    src={item.pic}
                    alt="icon"
                />
            </a>
        ));
        var newsLists = this.state.newsList.map((item, index) => (
            <Item onClick={this.gotoDetail.bind(this,item)} key={index} align="top"
                  thumb={item.litpic.includes('http') ? item.litpic : 'http://211.149.160.35' + item.litpic}
                  multipleLine>
                {item.title}
                <Brief className="news-brief">
                    <Flex justify="between">
                        <Flex.Item>{item.news_from}</Flex.Item>
                        <Flex.Item>{item.price}K币</Flex.Item>
                        <Flex.Item>阅读：{item.click}</Flex.Item>
                    </Flex>
                </Brief>
            </Item>
        ));
        return <div className="home">
            <Header />
            <Tabs onChange={this.changeTab.bind(this)}>
                {tabpanes}
            </Tabs>
<p>{this.props.username}</p>
            <div ref="newsListWrapper"
                 className="newsListWrapper">
                <div className="scroller">
                    <Carousel
                        className="my-carousel"
                        autoplay={true}
                        infinite
                        selectedIndex={1}
                        swipeSpeed={35}
                    >
                        {bannerLists}
                    </Carousel>
                    <List className="my-list">
                        {newsLists}
                    </List>
                </div>
            </div>

        </div>;
    }
}

function mapStateToProps(state) {
    return { panel: state.tabpanel.panel }
}
function mapDispatchToProps(dispatch) {
    return {
        tabPanelActions: bindActionCreators(tabpanelActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
