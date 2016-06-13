//利用jQuery发送ajax请求实现删除记录
$(function() {
	//删除用户
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);

		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		})
		.done(function(results) {
			if(results.success === 1) {
				if(tr.length > 0) {
					tr.remove();
				}
			}
		});
	});
});