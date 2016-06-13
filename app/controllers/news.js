var News = require('../models/news');

exports.index = function(req, res) {
    res.render('news_edit', {
        title: '新闻编辑页',
        headTitle: '新闻编辑页',
        news: {}
    });
}

exports.save = function(req, res) {
	var _news = req.body.news;
	console.log(_news);
	// var type = _news.type;
	// var title = _news.title;
	// var content = _news.content;
	// var author = _news.author;
	News.findOne({'name': _news.name}, function(err, news) {
		if (err) {
			console.log(err);
		}
		if (!news) {
			//console.log(user);
			res.redirect('/news_edit');
		} else {
			var news = new News(_news);
			news.save(function(err, news) {
				if (err) {
					console.log(err);
				}
				res.redirect('/news/list');
			});
		}
	});	
}

exports.list = function(req, res) {
	res.render('newslist', {
		title: '新闻列表页',
		headTitle: '新闻列表页'
	});
}