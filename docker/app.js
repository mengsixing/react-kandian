var express = require('express');
var app = express();

app.get('/api/news/news_list', function(req, res) {
	res.send(require('./mock/newsList.js'));
});

app.get('/api/face/face_list', function(req, res) {
	res.send(require('./mock/bannerList.js'));
});

app.get('/api/news/news_detail', function(req, res) {
	res.send(require('./mock/newsDetail.js'));
});

app.get('/api/cate/cate_list', function(req, res) {
	res.send(require('./mock/newsTagList'));
});

app.use(express.static('build'));

console.log('server is running at 127.0.0.1:8081');

app.listen(8081);
