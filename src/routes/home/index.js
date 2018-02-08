import React from 'react';
import { connect } from 'dva';
import axios from 'axios';
import BScroll from 'better-scroll'
import Header from '../../components/header/header.js'
import styles from './index.less'
import {
  Tabs,
  List,
  Flex,
  Carousel
} from 'antd-mobile'
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
            if (response.data.data.dataList.length > 0) {
              that.setState({
                cid: cid,
                pageIndex: 1,
                newsList: response.data.data.dataList
              });
            } else {
              that.setState({
                cid: cid,
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


  componentDidUpdate() {
    var bScroll = that.state.scroller;
    if (bScroll) {
      bScroll.refresh();
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
        bScroll = bScroll || that.state.scroller;
        bScroll.on("scrollEnd", function () {
          if (bScroll.maxScrollY === bScroll.y) {
            //获取选中的标签id
            let tagId = that.state.cid;
            let offset = that.state.pageIndex * 10;
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
      });
      that.setState({
        scroller: new BScroll(that.refs.newsListWrapper, {
          click: true,
          scrollbar: {
            fade: true,
            interactive: false // 1.8.0 新增
          }
        })
      });
    }
  }

  changeTab(modal) {
    //获取新闻列表信息
    var cid = modal.id;
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
    });
    this.props.history.push('/detail/' + item.id)
  }

  render() {
    var tabpanes = this.state.tagList.map((item, index) => (
      { title: item.name, id: item.id }
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
    ));
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

    </div>;
  }
}




Home.propTypes = {
};

function mapStateToProps(state) {
  return { appState: state.appState };
}

export default connect(mapStateToProps)(Home);
