var Logger = require('./Logger');
var logger = new Logger("server");

var HttpServer = require('./HttpServer');
var WsServer = require('./WsServer');

var httpHandlers = {};
var wsHandlers = {};

var http = new HttpServer(8080, httpHandlers);
var ws = new WsServer(8888, wsHandlers);

var _hosts = {};

httpHandlers.LIST = function(req, res) {
	var json = {};
	var hostKeys = Object.keys(_hosts);
	for(var i=0; i<hostKeys.length; i++){
		var hostKey = hostKeys[i];
		if(!json[hostKey]) json[hostKey] = [];
		json[hostKey] = Object.keys(_hosts[hostKey]);
	}
	res.write(JSON.stringify(json));
}

httpHandlers.POST = function(req, res, json) {
	var sockets = getTargetClient(json);
	for(var i=0; i<sockets.length; i++){
		var socket = sockets[i];
		socket.send(json.data);
		logger.debug("sent data:'" + json.data + "' to " + json.user);
	}
	logger.debug("redirecting to:" + req.headers.referer);
	res.writeHead(302, {'Location': req.headers.referer});
}

wsHandlers.REGISTER = function(socket, json){
	var clients = setTargetClient(json, socket);
	logger.debug(_hosts);
}

function getTargetClient(json){
	var host = _hosts[json.host] || {};
	var clients = host[json.user] || [];
	return clients;
}

function setTargetClient(json, socket){
	var host = json.host,
		user = json.user;
	if(!_hosts[host]) _hosts[host] = {};
	if(!_hosts[host][user]) _hosts[host][user] = [];
	_hosts[host][user].push(socket);
}

function getClientKey(socket){
	return socket.req.headers['sec-websocket-key'];
}