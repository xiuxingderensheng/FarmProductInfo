var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Product = require('../app/controllers/product');
var multipart = require('connect-multiparty');
var TradingPlatform = require('../app/controllers/tradingPlatform');
var News = require('../app/controllers/news');
var Demand = require('../app/controllers/demand');
var multipartMiddleware = multipart();


module.exports = function(app) {
	//prehandle user
	app.use(function(req, res, next) {
		var _user = req.session.user;

		app.locals.user = _user;

		next();
	});


	//首页
	app.get('/', Index.index);

	//注册
	app.post('/user/signup', User.signup);
	//登录
	app.post('/user/signin', User.signin);
	//跳到登录页
	app.get('/signin', User.showSignin);
	//跳到注册页
	//app.get('/signup', User.showSignup);
	//logout
	app.get('/logout', User.logout);
	//update
	app.post('admin/update', User.signupRequired, User.adminRequired, User.update);
	//用户列表
	app.get('/admin/user/list', User.signinRequired, User.list);

	//商品列表
	app.get('/product/list', User.signinRequired, User.adminRequired, Product.list);
	//新增商品
	app.get('/product/new', User.signinRequired, Product.new);
	//保存商品
	app.post('/product/save', multipartMiddleware, User.signinRequired, Product.saveImg, Product.save);
	//管理商品
	app.get('/product/manager', User.signinRequired, Product.productmanager);
	//更新商品
	app.get('/product/update', User.signinRequired, Product.update);

	//需求列表
	app.get('/demand/list', User.signinRequired, User.adminRequired, Demand.list);
	//新增需求
	app.get('/demand/new', User.signinRequired, Demand.new);
	//保存商品
	app.post('/demand/save', User.signinRequired, Demand.save);
	//管理商品
	app.get('/demand/manager', User.signinRequired, Demand.demandmanager);
	//更新商品
	app.get('/demand/update', User.signinRequired, Demand.update);
	//删除商品
	app.delete('/demand/delete', User.signinRequired, Demand.del);

	//交易平台
	app.get('/tradingPlatform', TradingPlatform.index);
	//app.get('/getnewProducts', TradingPlatform.getnewProducts);

	//新闻管理
	app.get('/news_edit', News.index);
	app.post('/manager/news/save', News.save);
	app.get('/news/list', News.list);
}
