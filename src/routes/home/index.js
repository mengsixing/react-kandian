import React from 'react'
import { connect } from 'dva'
import axios from 'axios'
import BScroll from 'better-scroll'
import Header from '../../components/header/header'
import styles from './index.less'
import {
  Tabs,
  List,
  Flex,
  Carousel
} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

var that
class Home extends React.Component {
  constructor() {
    super()
    that = this
    this.state = {
      scroller: ''
    }
  }

  componentWillMount() {
    this.props.dispatch({ type: 'appState/getDefaultInfo' })
    this.props.dispatch({ type: 'appState/getBanner' })
  }

  componentDidUpdate() {
    var bScroll = that.state.scroller
    if (bScroll) {
      bScroll.refresh()
    } else {
      that.setState({
        scroller: new BScroll(that.refs.newsListWrapper, {
          click: true,
          scrollbar: {
            fade: true,
            interactive: false
          }
        })
      }, function () {
        bScroll = bScroll || that.state.scroller
        bScroll.on("scrollEnd", function () {
          if (bScroll.maxScrollY === bScroll.y) {
            //获取选中的标签id
            let tagId = that.props.cid
            let offset = that.props.pageIndex * 10
            that.props.dispatch({ type: 'appState/getNewsList', payload: { cid: tagId, offset: offset } })
          }
        });
      });
    }
  }

  changeTab(modal) {
    //获取新闻列表信息
    var cid = modal.id
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

  gotoDetail(item) {
    //增加今日阅读数
    this.props.dispatch({
      type: "appState/add"
    })
    this.props.history.push('/detail/' + item.id)
  }

  render() {
    var tagList = this.props.tagList || []
    var newsList = this.props.newsList || []
    var bannerList = this.props.bannerList || []
    var tabpanes = tagList.map((item, index) => (
      { title: item.name, id: item.id }
    ));
    var bannerLists = bannerList.map((item, index) => (
      <a href={item.url} key={index}>
        <img
          src={item.pic}
          alt="icon"
        />
      </a>
    ));
    var newsLists = newsList.map((item, index) => (
      <Item onClick={this.gotoDetail.bind(this, item)} key={index} align="top"
        thumb={item.litpic.includes('http') ? item.litpic : 'http://211.149.160.35' + item.litpic}
        multipleLine>
        {item.title}
        <Brief className={styles.newsBrief}>
          <Flex justify="between">
            <Flex.Item>{item.news_from}</Flex.Item>
            <Flex.Item>{item.price}K币</Flex.Item>
            <Flex.Item>阅读：{item.click}</Flex.Item>
          </Flex>
        </Brief>
      </Item>
    ))
    return <div className={styles.home}>
      <Header title="首页"></Header>
      <Tabs tabs={tabpanes} onChange={this.changeTab.bind(this)}>
      </Tabs>

      <div ref="newsListWrapper"
        className={styles.newsListWrapper}>
        <div className="scroller">
          {bannerLists.length > 0 ?
            <Carousel
              className={styles.myCarousel}
              autoplay={true}
              infinite
              selectedIndex={1}
              swipeSpeed={35}
            >
              {bannerLists}
            </Carousel> : ""
          }

          <List className={styles.myList}>
            {newsLists}
          </List>
        </div>
      </div>

    </div>
  }
}

function mapStateToProps(state) {
  return { ...state.appState }
}

export default connect(mapStateToProps)(Home)
