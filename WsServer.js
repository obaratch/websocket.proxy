var StringUtils = require('./StringUtils');
var ws = require('websocket.io');

var server = undefined;
var _initHandler = undefined;

module.exports = function(port, initHandler){

	_initHandler = initHandler;

	server = ws.listen(port, function(){
		console.log("WsServer running. port=" + port);
	});

	server.on('connection', function(socket){
		socket.on('message', doMessage);
	});

	return server;
};

function doMessage(data){

	var socket = this;

	console.log('WS incoming:' + data);
	var json = JSON.parse(data);
	console.log("WS clients=" + getClientNameList(server.clients));

	if(json.msg=="init"){
		_initHandler(socket);
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
