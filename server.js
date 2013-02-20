var StringUtils = require('./StringUtils');
var ws = require('websocket.io');

var listenPort = 8888;

var server = ws.listen(listenPort, function(){
	console.log("server running. port=" + listenPort);
});

server.on('connection', function(socket){
	socket.on('message', function(rawData){
		console.log('<<< ' + rawData);
		var data = JSON.parse(rawData);
		console.log(getClientNameList(server.clients));
	});
});

function getClientNameList(clients){
	var list = [];
	clients.forEach(function(c){
		list.push(c.ws.upgradeReq.headers['sec-websocket-key']);
	});
	return StringUtils.stringifyArray(list);
}