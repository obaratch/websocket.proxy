var Logger = require('./Logger');
var logger = new Logger("WsServer");

var StringUtils = require('./StringUtils');
var ws = require('websocket.io');

var server = undefined;
var _handlers = undefined;

module.exports = function(port, handlers){

	_handlers = handlers;

	server = ws.listen(port, function(){
		logger.debug("WsServer running. port=" + port);
	});

	server.on('connection', function(socket){
		socket.on('message', doMessage);
		socket.on('close', doClose);
		socket.on('error', doError);
	});

	return server;
};

function doMessage(data){

	logger.debug('WS incoming:' + data);

	var socket = this;
	var json = JSON.parse(data);

	if(json.action=="register"){
		_handlers["REGISTER"](socket, json);
	}
}

function doClose(data){
	var socket = this;
	_handlers["CLOSE"](socket, data);
}

function doError(data){
	var socket = this;
	_handlers["ERROR"](socket, data);
}

function getClientNameList(clients){
	var list = [];
	clients.forEach(function(c){
		list.push(c.ws.upgradeReq.headers['sec-websocket-key']);
	});
	return StringUtils.stringifyArray(list);
}
