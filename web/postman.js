// postman.js read by postman.html
$(function(){

	var $hosts = $("select[name=host]");
	var $users = $("select[name=user]");

	var data;

	$.get("http://localhost:8080/list", function(json){
		data = $.parseJSON(json);
		console.debug(data);
		if(data){
			var hosts = Object.keys(data);
			for(var i=0; i<hosts.length; i++){
				$hosts.append($("<option>").text(hosts[i]));
			}
		}
		$hosts.change();
	});

	$hosts.change(function(){
		var host = $hosts.val();
		var users = data[host];
		if(users && users.length>0){
			for(var i=0; i<users.length; i++){
				$users.append($("<option>").text(users[i]));
			}
		}
	});

});