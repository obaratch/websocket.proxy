// client.js read by client.html
$(function(){

	var ws = undefined;
	var $logBox = $("#log");

	$("#register").click(function(){

		if(ws){
			console.log("already registered.");
			return;
		}

		ws = new WebSocket('ws://localhost:8888');
		console.debug(ws);

		ws.onerror = function(e){
			console.debug(e);
			throw e;
		};

		ws.onopen = function() {
			_send("init");
		};

		ws.onclose = function(){
			log("ws connection closed.");
		}

		ws.onmessage = function(event){
			var msg = event.data;
			log("recieved: '" + msg + "'");
		}

	});

	function _send(msg){
		var json = { msg: msg };
		ws.send(JSON.stringify(json));
		log("sent: '" + msg + "'");
	}

	function log(msg){
		var time = moment().format("HH:mm:ss ");
		$logBox.append("<span class='time'>" + time + "</span>" + msg + "<br/>");
	}

});
