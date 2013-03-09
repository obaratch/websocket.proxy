// postman.js read by postman.html
$(function(){

	var $select = $("select[name=client]");

	$.get("http://localhost:8080/list", function(json){
		json = $.parseJSON(json);
		console.debug(json);
		if(json && json.length>0){
			for(var i=0; i<json.length; i++){
				$select.append($("<option>").text(json[i]));
			}
		}
	});

});