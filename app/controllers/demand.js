var request = require('request');
var fs = require('fs');
var path = require('path');
var Demand = require('../models/demand');
var _ = require('underscore');

exports.list = function(req, res) {
	Demand.fetch(function(err, demands) {
		if (err) {
			console.log(err);
		}
		res.render('demandlist', {
			title: '需求列表页',
			demands: demands
		});
	});
}

exports.new = function(req, res) {
	res.render('newdemand', {
		title: '需求录入页',
		headTitle: '需求录入页',
		user: req.session.user,
		demand: {}
	});
}

//保存商品
exports.save = function(req, res) {
	var demandObj = req.body.demand;
	var id = demandObj.id;
	var _demand;

	if (id) {
		Demand.findById(id, function(err, demand) {
			console.log(id);
			if (err) {
				console.log(err);
			}
			//用movieObj的属性覆盖movie的属性
			_demand = _.extend(demand, demandObj);
			_demand.save(function(err, demand) {
				if (err) {
					console.log(err);
					res.redirect('/demand/new');
				}
				res.redirect('/demand/manager');
			});
		});
	} else {
		var demand = new Demand(demandObj);
		demand.save(function(err, demand) {
			if (err) {
				console.log(err);
			}
			console.log('返回的：' + demand);
			res.redirect('/demand/manager');
		});
	}
	
}

//保存图片
exports.saveImg = function(req, res, next){
	
}

//管理商品
exports.demandmanager = function(req, res) {
	console.log(req.session.user.name);
	Demand.find({user: req.session.user.name},function(err, demands) {
		if (err) {
			console.log(err);
		}
		res.render('demandManagerlist', {
			title: '需求列表页',
			demands: demands
		});
	});
}

//更新商品
exports.update = function(req, res) {
	var id = req.query.id;
	if (id) {
		Demand.findById(id, function(err, demand) {
			res.render('newdemand', {
				title: '需求录入页',
				headTitle: '需求录入页',
				user: req.session.user,
				demand: demand
			});
		});
	}
}

//删除需求
exports.del = function(req, res) {
	//解析通过链接传过来的id
	var id = req.query.id;
	if(id) {
		Demand.remove({_id: id}, function(err, demand) {
			if(err) {
				console.log(err);
			} else {
				res.json({success: 1})
			}
		});
	}
}
