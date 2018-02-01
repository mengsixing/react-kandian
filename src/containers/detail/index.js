import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BScroll from 'better-scroll';
import axios from '../../axios/';
import { fromJS } from 'immutable'
import * as tabpanelActions from '../../actions/tabpanel'
import './detail.css'
var Base64 = require('js-base64').Base64;
var that;
class Detail extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            data: fromJS({
                newsDetail: {},
                detailNewsList: [],
                scroller: ''
            })
        };
        that = this;
    }

    componentWillMount() {
        this.getDetail();
        this.props.tabPanelActions.changeTabPanel({ panel: 'home' });
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
                that.setState(({ data }) => ({
                    data: data.update('newsDetail', () => fromJS( newsDetail))
                          .update('detailNewsList',()=> fromJS(detailNewsList))
                }));
            });
    }

    gotoIndex() {
        this.props.history.push('/');
    }


    render() {
        window.kkk = this.state.data;
        return (
            <div>
                <div className="detail-header">
                    <span onClick={this.gotoIndex.bind(this)}> &lt;&nbsp;返回</span>
                </div>
                <div className="detail-news" ref="listWrapper">
                    <div className="scroller">
                        <div className="detail-news-body">
                            <div className="detail-news-cover">
                                <img src={this.state.data.getIn(['newsDetail', 'litpic'])} alt="img" />
                            </div>
                            <div className="detail-news-content">
                                <div className="detail-news-tag">
                                    {this.state.data.getIn(['newsDetail','cate_name'])}
                                </div>
                                <div className="detail-news-title">
                                {this.state.data.getIn(['newsDetail','title'])}
                                </div>
                                <div className="detail-news-tags">
                                    <span className="detail-news-tags-from">
                                    </span>
                                    <span>
                                        <span className="detail-news-tags-price">
                                        {this.state.data.getIn(['newsDetail','price'])}
                                           K币
                                    </span>
                                        <span className="detail-news-tags-read">
                                            阅读： {this.state.data.getIn(['newsDetail','click'])}
                                        </span>
                                    </span>
                                </div>
                                <div className="detail-news-content-text">
                                    <p dangerouslySetInnerHTML={{ __html: this.state.data.getIn(['newsDetail','content']) } }></p>
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
