var request = require('request');
var products;
var html = '';

module.exports = function(io) {
	io.on('connection', function(socket){
		console.log('connection');
		var timer = function() {
			setInterval(function() {
				getnewProducts();
				socket.emit('newProduct', html);
			}, 5000);
		}
		timer();
	});
}

//获取新发布商品数据
var getnewProducts = function() {
	request('http://localhost:8080/ncp_info0/product_listlimit.action', function (error, response, body) {
	 	if (!error && response.statusCode == 200) {
 			products = JSON.parse(body);
 			html = '';
			for(var i = 0; i < products.length; i++) {
				html += '<a href="javascript:void(0)">' + products[i].owner + ' 发布了 '
						+ products[i].productname + '</a><br>';
			}	
		} 
	});	
}