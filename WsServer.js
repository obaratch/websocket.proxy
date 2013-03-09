var StringUtils = require('./StringUtils');
var ws = require('websocket.io');

var server = undefined;
var _handlers = undefined;

module.exports = function(port, handlers){

	_handlers = handlers;

	server = ws.listen(port, function(){
		console.log("WsServer running. port=" + port);
	});

	server.on('connection', function(socket){
		socket.on('message', doMessage);
	});

	return server;
};

function doMessage(data){

	console.log('WS incoming:' + data);

	var socket = this;
	var json = JSON.parse(data);

	if(json.mode=="register"){
		_handlers["REGISTER"](socket, json);
		socket.send("init-accepted");
	}
}

function getClientNameList(clients){
	var list = [];
	clients.forEach(function(c){
		list.push(c.ws.upgradeReq.headers['sec-websocket-key']);
	});
	return StringUtils.stringifyArray(list);
}
