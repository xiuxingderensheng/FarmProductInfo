var User = require('../models/user');
var request = require('request');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

//signup
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面',
		headTitle: '注册页面'
	});
}

//signin
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面',
		headTitle: '登录页面'
	});
}

exports.signup = function(req, res) {
	// var _user = req.body.user;
	// var name = _user.name;
	// var pwd = _user.password;

	// console.log('注册时：' + name + '-' + pwd);
	// request.post({url:'http://localhost:8080/ncp_info0/user_add.action', form: {name: name, pwd: pwd}}, 
	// function(error, response, body){
	// 	if (error) console.log(err);
	// 	res.redirect('/signin');
	// });

	//'/user/signup/:userid' var _userid = req.params.userid
	//'/user/signup/1111?userid=1112' var -userid = req.query.userid
	//'/user/signup/1111?userid=1112' {userid: 1113} params先找路由中的1111，再找body里的1113，最后是query的1112
	var _user = req.body.user;
	console.log(_user);
	User.findOne({'name': _user.name}, function(err, user) {
		if (err) {
			console.log(err);
		}

		if (user) {
			//console.log(user);
			res.redirect('/signin');
		} else {
			var user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				res.redirect('/');
			});
		}
	});
}

//signin
exports.signin = function(req, res) {
	// var _user = req.body.user;
	// var name = _user.name;
	// var pwd = _user.password;
	// console.log('登录时：' + name + '-' + pwd);
	// request.post({url:'http://localhost:8080/ncp_info0/user_comparePwd.action', form: {name: name, pwd: pwd}}, 
	// function(error, response, body){
	//  	if (!error && response.statusCode == 200) {
	//  		if (body != null && body.length > 0) {
	//  			var user = JSON.parse(body);
	//  			console.log(user);
	//  			req.session.user = user;
	//  			res.redirect('/');
	//  		} else {
	//  			res.redirect('/signin');
	//  		}
	// 	}
	// });

	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log('user is not exist!');
			return res.redirect('/signup');
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				console.log(err);
			}
			if (isMatch) {
				console.log('Password is matched!');
				req.session.user = user;
				return res.redirect('/');
			} else {
				console.log('Password is not matched!');
				res.redirect('/signin');
			}
		});
	});
}

exports.update = function(req, res) {
	var id = req.query.id;
	if (id) {
		User.findById(id, function(err, user) {
			res.render
		});
	}
}

//logout
exports.logout = function(req, res) {
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
}

//用户列表页
exports.list = function(req, res) {
	// request('http://localhost:8080/ncp_info0/user_list.action', function (error, response, body) {
	//  	if (!error && response.statusCode == 200) {
	//  		var users = JSON.parse(body);
	//  		//console.log(users);
	//  		res.render('userlist', {
	//  			title: '用户列表页',
	//  			headTitle: '用户列表页',
	//  			users: users
	//  		});
	// 	}
	// });

	User.fetch(function(err, users) {
		if (err) {
			console.log(err);
		}
		res.render('userlist', {
			title: '用户列表页',
			users: users
		});
	});
}

//midware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user;

	if (!user) {
		return res.redirect('/signin');
	}

	next();
}

//midware for user
exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
	console.log(user.role);

	if (user.role <= 10) {
		return res.redirect('/signin');
	}

	next();
}