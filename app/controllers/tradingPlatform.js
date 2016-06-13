var request = require('request');
exports.index = function(req, res) {
	request('http://localhost:8080/ncp_info0/product_listlimit.action', function (error, response, body) {
	 	if (!error && response.statusCode == 200) {
	 		var products = JSON.parse(body);
	 		//console.log(products);
	 		res.render('tradingPlatform', {
				title: '交易大厅',
				headTitle: '交易大厅',
				products: {}
			});
		}
	});
	
}