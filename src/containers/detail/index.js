import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import axios from '../../axios/';
import { fromJS } from 'immutable';
import './detail.css';
var Base64 = require('js-base64').Base64;
var that;
class Detail extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			data: fromJS({
				newsDetail: {},
				detailNewsList: [],
				scroller: ''
			})
		};
		this.listWrapperRef = React.createRef();
		that = this;
	}

	componentDidMount() {
		this.getDetail();
	}

	componentDidUpdate() {
		if (that.state.scroller) {
			that.state.scroller.refresh();
		} else {
			that.state.scroller = new BScroll(that.listWrapperRef.current, {
				click: true
			});
			setTimeout(function() {
				that.state.scroller.refresh();
			}, 1000);
		}
	}

	//获取详情信息
	getDetail() {
		axios
			.get('/api/news/news_detail?id=' + that.props.match.params.id)
			.then(function(response) {
				let newsDetail = response.data.data;
				newsDetail.content = Base64.decode(newsDetail.content);
				let detailNewsList = response.data.data.recommend_list.dataList;
				that.setState(({ data }) => ({
					data: data
						.update('newsDetail', () => fromJS(newsDetail))
						.update('detailNewsList', () => fromJS(detailNewsList))
				}));
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
				<div className="detail-news" ref={this.listWrapperRef}>
					<div className="scroller">
						<div className="detail-news-body">
							<div className="detail-news-cover">
								<img
									src={this.state.data.getIn(['newsDetail', 'litpic'])}
									alt="img"
								/>
							</div>
							<div className="detail-news-content">
								<div className="detail-news-tag">
									{this.state.data.getIn(['newsDetail', 'cate_name'])}
								</div>
								<div className="detail-news-title">
									{this.state.data.getIn(['newsDetail', 'title'])}
								</div>
								<div className="detail-news-tags">
									<span className="detail-news-tags-from" />
									<span>
										<span className="detail-news-tags-price">
											{this.state.data.getIn(['newsDetail', 'price'])}
                      K币
										</span>
										<span className="detail-news-tags-read">
                      阅读： {this.state.data.getIn(['newsDetail', 'click'])}
										</span>
									</span>
								</div>
								<div className="detail-news-content-text">
									<p
										dangerouslySetInnerHTML={{
											__html: this.state.data.getIn(['newsDetail', 'content'])
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


Detail.propTypes = {
	history: PropTypes.object
};

export default Detail;
