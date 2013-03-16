// client.js read by client.html
$(function(){

	var ws = undefined;
	var $logBox = $("#log");

	$("#host").val(location.hostname);

	$("#register").click(function(){

		if(ws){
			console.log("already registered.");
			return;
		}
		
		var server = location.hostname;
		ws = new WebSocket('ws://' + server + ':8888');
		console.debug(server, ws);

		ws.onerror = function(e){
			console.debug(e);
			throw e;
		};

		ws.onopen = function() {
			var json = {
				action: "register",
				service: $("#host").val(),
				user: $("#user").val()
			}
			_send(json);
		};

		ws.onclose = function(){
			log("ws connection closed.");
			ws = null;
		}

		ws.onmessage = function(event){
			var msg = event.data;
			log("recieved: '" + msg + "'");
		}

	});

	function _send(json){
		ws.send(JSON.stringify(json));
		log("sent: " + JSON.stringify(json));
	}

	function log(msg){
		var time = moment().format("HH:mm:ss ");
		$logBox.append("<span class='time'>" + time + "</span>" + msg + "<br/>");
	}

});
