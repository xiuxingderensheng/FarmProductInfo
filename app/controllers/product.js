var _ = require('underscore');
var Product = require('../models/product');
var request = require('request');
var fs = require('fs');
var path = require('path');

exports.list = function(req, res) {
	
	Product.fetch(function (err, products) {
 		res.render('productlist', {
 			title: '商品列表页',
 			headTitle: '商品列表页',
 			products: products
 		});
	});
}

exports.new = function(req, res) {
	res.render('newproduct', {
		title: '商品录入页',
		headTitle: '商品录入页',
		user: req.session.user,
		product: {}
	});
}

//保存商品
exports.save = function(req, res) {
	// var product = req.body.product;
	// var id = product.id;
	// console.log(id);
	// var productname = product.productname;
	// var type = product.type;
	// var num = parseInt(product.num);
	// var img = product.img;
	// var description = product.description;
	// var datefrom = product.datefrom;
	// var dateto = product.dateto;
	// var owner = product.owner;
	// if (id == 'undefined') {
	// 	request.post({url:'http://localhost:8080/ncp_info0/product_add.action', 
	// 	form: {productname: productname, type: type, num: num, img: img, description: description, datefrom: datefrom, dateto: dateto, owner: owner}}, 
	// 	function(error, response, body){
	// 	 	if (error) console.log(error);
	// 	 	res.redirect('/product/manager');
	// 	});
	// } else if (id != null && id.length > 0) {
	// 	request.post({url:'http://localhost:8080/ncp_info0/product_update.action', 
	// 	form: {id: id, productname: productname, type: type, num: num, img: img, description: description, datefrom: datefrom, dateto: dateto, owner: owner}}, 
	// 	function(error, response, body){
	// 	 	if (error) console.log(error);
	// 	 	res.redirect('/product/manager');
	// 	});
	// } else {
	// 	res.redirect('/product/new');
	// }

	var productObj = req.body.product;
	var id = productObj.id;
	var _product

	if (id) {
		Product.findById(id, function(err, product) {
			if (err) {
				console.log(err);
			}
			//用movieObj的属性覆盖movie的属性
			_product = _.extend(product, productObj);
			_product.save(function(err, product) {
				if (err) {
					console.log(err);
					res.redirect('error', {
						title: '系统错误'
					});
				}
				res.redirect('/product/manager');
			});
		});
	} else {
		var _product = new Product(productObj);
		_product.save(function(err, product) {
			if (err) {
				console.log(err);
			}
			res.redirect('/product/manager');
		});
	}
	
}

//保存图片
exports.saveImg = function(req, res, next){
	var imgData = req.files.uploadPoster;
	var filePath = imgData.path;
	var originalFilename = imgData.originalFilename;

	if (originalFilename) {
		fs.readFile(filePath, function(err, data) {
			var timestamp = Date.now();
			var type = imgData.type.split('/')[1];
			var img = timestamp + '.' + type;
			var newPath = path.join(__dirname, '../../', 'public/images/' + img);

			fs.writeFile(newPath, data, function(err) {
				req.body.product.img = img;
				next();
			});
		});
	} else {
		next();
	}
}

//管理商品
exports.productmanager = function(req, res) {
	var owner = req.session.user.name;
	Product.find({'owner': owner}, function (err, products) {
		if (err) {
			console.log(err);
		}
 		res.render('productManagerlist', {
 			title: '个人商品管理页',
			headTitle: '个人商品管理页',
 			products: products
 		});
 	});
}

//更新商品
exports.update = function(req, res) {
	var id = req.query.id;
	Product.findById(id, function(err, product) {
		res.render('newproduct', {
			title: '商品修改页',
			headTitle: '商品修改页',
			user: req.session.user,
			product: product
		});
	});
}

//删除商品
exports.del = function(req, res) {
	//解析通过链接传过来的id
	var id = req.query.id;
	if(id) {
		Product.remove({_id: id}, function(err, product) {
			if(err) {
				console.log(err);
			} else {
				res.json({success: 1})
			}
		});
	}
}