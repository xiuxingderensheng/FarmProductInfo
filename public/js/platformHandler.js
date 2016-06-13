$(function(){
// 	function doAjax() {
// 		$.ajax({
// 			url: '/getnewProducts',
// 			type: 'get',
// 			dataType: 'html',
// 			success: function(data) {
// 				$('.newproducts').html('');
// 				$('.newproducts').html(data);
// 			},
// 			error: function(){  
// 				alert('出错了亲，但不是您的错！');
// 			}
// 		});
// 	}
// 	setInterval(doAjax, 3000);

	//建立websocket连接
	socket = io.connect('http://localhost:3030');
	socket.on('newProduct', function(data) {
		$('.newproducts').html('');
		$('.newproducts').html('<h3>最新商品</h3>' + data);
	});
});
