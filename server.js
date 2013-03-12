var Logger = require('./Logger');
var logger = new Logger("server");

var HttpServer = require('./HttpServer');
var WsServer = require('./WsServer');

var httpHandlers = {};
var wsHandlers = {};

var http = new HttpServer(8989, httpHandlers);
var ws = new WsServer(8888, wsHandlers);

var _hosts = {};

httpHandlers.LIST = function(req, res) {
	var json = getList();
	res.write(JSON.stringify(json));
}

httpHandlers.STATUS = function(req, res) {
	// res.write("I'm on vacation.");
	res.write("OK");
}

function getList(){
	var json = {};
	var hostKeys = Object.keys(_hosts);
	for(var i=0; i<hostKeys.length; i++){
		var hostKey = hostKeys[i];
		if(!json[hostKey]) json[hostKey] = [];
		json[hostKey] = Object.keys(_hosts[hostKey]);
	}
}

httpHandlers.POST = function(req, res, json) {
	//logger.debug(req);
	logger.debug(json);
	var sockets = getTargetClient(json),
		soketKeys = Object.keys(sockets);
	for(var i=0; i<soketKeys.length; i++){
		var socket = sockets[soketKeys[i]];
		socket.send(json.data);
		logger.debug("sent data:'" + json.data + "' to " + json.user);
	}
	/*
	logger.debug("redirecting to:" + req.headers.referer);
	res.writeHead(302, {'Location': req.headers.referer});
	*/
}

wsHandlers.REGISTER = function(socket, json){
	var clients = setTargetClient(json, socket);
	logger.debug(_hosts);
}
wsHandlers.CLOSE = function(socket, data){
	var clients = removeTargetClient(socket);
	logger.debug(_hosts);
}

function getTargetClient(json){
	var host = _hosts[json.host] || {};
	var clients = host[json.user] || {};
	return clients;
}

var _reverseSocketMap = {};

function setTargetClient(json, socket){
	var host = json.service,
		user = json.user;
	if(!_hosts[host]) _hosts[host] = {};
	if(!_hosts[host][user]) _hosts[host][user] = {};
	var clientKey = getClientKey(socket);
	_hosts[host][user][clientKey] = socket;
	_reverseSocketMap[clientKey] = _hosts[host][user];
	socket.send("_WsProxy_REGISTERED_USER: serviceId=" + host + ", user=" + user);
}

function removeTargetClient(socket){
	var clientKey = getClientKey(socket);
	delete _reverseSocketMap[clientKey][clientKey];
}

function getClientKey(socket){
	return socket.req.headers['sec-websocket-key'];
}