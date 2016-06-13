$(function() {
	var ue = UE.getEditor('inputContent');
	function getAllHtml() {
		var html = UE.getEditor('inputContent').getAllHtml();
		$('#inputContent').attr("value", html);
		alert($('#inputContent').attr("value"));
	}
});