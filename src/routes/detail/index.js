import React from 'react'
import BScroll from 'better-scroll'
import { connect } from 'dva'
import './index.less'
var that;
class Detail extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      scroller: ''
    };
    that = this
  }

  componentWillMount() {
    //获取详情信息
    this.props.dispatch({ type: 'appState/getNewsDetail', payload: { id: that.props.match.params.id } })
  }

  componentDidUpdate() {
    if (that.state.scroller) {
      that.state.scroller.refresh()
    } else {
      that.state.scroller = new BScroll(that.refs.listWrapper, {
        click: true,
        scrollbar: {
          fade: true,
          interactive: false
        }
      });
      setTimeout(function () {
        that.state.scroller.refresh()
      }, 1000)
    }
  }

  gotoIndex() {
    this.props.history.push('/')
  }
  render() {
    if (this.props.newsDetail) {
      return (
        <div>
          <div className="detail-header">
            <span onClick={this.gotoIndex.bind(this)}> &lt;&nbsp;返回</span>
          </div>
          <div className="detail-news" ref="listWrapper">
            <div className="scroller">
              <div className="detail-news-body">
                <div className="detail-news-cover">
                  <img src={this.props.newsDetail.litpic} alt="img" />
                </div>
                <div className="detail-news-content">
                  <div className="detail-news-tag">
                    {this.props.newsDetail.cate_name}
                  </div>
                  <div className="detail-news-title">
                    {this.props.newsDetail.title}
                  </div>
                  <div className="detail-news-tags">
                    <span className="detail-news-tags-from">
                    </span>
                    <span>
                      <span className="detail-news-tags-price">
                        {this.props.newsDetail.price}
                        K币
                                  </span>
                      <span className="detail-news-tags-read">
                        阅读： {this.props.newsDetail.click}
                      </span>
                    </span>
                  </div>
                  <div className="detail-news-content-text">
                    <p dangerouslySetInnerHTML={{ __html: this.props.newsDetail.content }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }

  }
}

function mapStateToProps(state) {
  return { ...state.appState }
}



export default connect(mapStateToProps)(Detail)
