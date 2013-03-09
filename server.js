var HttpServer = require('./HttpServer');
var WsServer = require('./WsServer');

var httpHandlers = {};
var wsHandlers = {};

var http = new HttpServer(8080, httpHandlers);
var ws = new WsServer(8888, wsHandlers);

var _users = {};
var _clients = {};

httpHandlers.LIST = function(req, res, data) {
	res.write(JSON.stringify(Object.keys(_clients)));
}

httpHandlers.POST = function(req, res, json) {
	var target = json.client;
	var sockets = _clients[target];
	if(sockets){
		for(var i=0; i<sockets.length; i++){
			var socket = sockets[i];
			socket.send(json.data);
			console.log("sent data:'" + json.data + "' to " + target);
		}
	}
	console.log("redirecting to:" + req.headers.referer);
	res.writeHead(302, {'Location': req.headers.referer});
}

wsHandlers.REGISTER = function(socket, json){
	var user = json.client;
	var clients = _clients[user];
	if(!clients) clients = [];
	clients.push(socket);
	_clients[user] = clients;
	console.log(_clients);
}

function getClientKey(socket){
	return socket.req.headers['sec-websocket-key'];
}