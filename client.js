
var ws = new WebSocket('ws://localhost:8888');
console.debug(ws);

ws.onerror = function(e){
	console.debug(e);
	throw e;
};

ws.onopen = function() {
	console.log('open');
	ws.send(JSON.stringify({
		msg: 'hello'
	}));
};

