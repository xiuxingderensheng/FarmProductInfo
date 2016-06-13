exports.index = function(req, res) {
	res.render('index', {
		title: '首页',
		headTitle: '首页'
	});
}