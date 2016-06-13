$(function() {
	$('.glyphicon-trash').click(function(e) {

		var target = $(e.target);
		var id = target.data('id');
		var tb = $('.item-id-' + id);

		if (confirm('确定删除吗？')) {
			$.ajax({
				url: '/demand/delete/?id=' + id,
				type: 'DELETE'
			})
			.done(function(results) {
				if(results.success === 1) {
					if(tb.length > 0) {
						tb.remove();
					}
				}
			});
		}
	});	
});