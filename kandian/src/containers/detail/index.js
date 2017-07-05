/**
 * Created by Thinkpad on 2017/7/1.
 */
import React from 'react'
import axios from 'axios';
import './detail.css'
import BScroll from 'better-scroll';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tabpanelActions from '../../actions/tabpanel'
axios.defaults.baseURL = 'http://211.149.160.35';
var Base64 = require('js-base64').Base64;

var that;
class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            newsDetail: {},
            detailNewsList: [],
            scroller: ''
        };
        that = this;
    }

    componentWillMount() {
        this.getDetail();
        this.props.tabPanelActions.changeTabPanel({panel:'home'});
    }

    componentDidUpdate() {
        if (that.state.scroller) {
            that.state.scroller.refresh();
        } else {
            that.state.scroller = new BScroll(that.refs.listWrapper, {
                click: true
            });
            setTimeout(function () {
                that.state.scroller.refresh();
            }, 1000)
        }
    }

    //获取详情信息
    getDetail() {
        axios.get('/api/news/news_detail?id=' + that.props.match.params.id)
            .then(function (response) {
                let newsDetail = response.data.data;
                newsDetail.content = Base64.decode(newsDetail.content)
                let detailNewsList = response.data.data.recommend_list.dataList;
                that.setState({
                    newsDetail: newsDetail,
                    detailNewsList: detailNewsList
                });
            });
    }

    gotoIndex() {
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <div className="detail-header">
                    <span onClick={this.gotoIndex.bind(this)}> &lt;&nbsp;返回</span>
                </div>
                <div className="detail-news" ref="listWrapper">
                    <div className="scroller">
                        <div className="detail-news-body">
                            <div className="detail-news-cover">
                                <img src={this.state.newsDetail.litpic} alt="img"/>
                            </div>
                            <div className="detail-news-content">
                                <div className="detail-news-tag">
                                    {this.state.newsDetail.cate_name}
                                </div>
                                <div className="detail-news-title">
                                    {this.state.newsDetail.title}
                                </div>
                                <div className="detail-news-tags">
          <span className="detail-news-tags-from">
          </span>
                                    <span>
            <span className="detail-news-tags-price">
              {this.state.newsDetail.price}K币
            </span>
            <span className="detail-news-tags-read">
              阅读：{this.state.newsDetail.click}
            </span>
          </span>
                                </div>
                                <div className="detail-news-content-text">
                                    <p dangerouslySetInnerHTML={{__html: that.state.newsDetail.content}}></p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
)(Detail)
