var HttpServer = require('./HttpServer');
var WsServer = require('./WsServer');

var http = new HttpServer(8080, postHandler);
var ws = new WsServer(8888, initHandler);

var _target = undefined

var _clients = {};

function initHandler(socket){
	var id = getClientId(socket);
	_clients[id] = socket;
	_target = id;
	console.log("current target = " + _target);
}

function postHandler(req, res, data) {
	var socket = _clients[_target];
	if(socket){
		socket.send(data);
		console.log("sent data:'" + data + "' to " + _target);
	}
	console.log("redirecting to:" + req.headers.referer);
	res.writeHead(302, {'Location': req.headers.referer});
}

function getClientId(socket){
	return socket.req.headers['sec-websocket-key'];
}