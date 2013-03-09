var StringUtils = require('./StringUtils');
var ws = require('websocket.io');

module.exports = function(port){

	var server = ws.listen(port, function(){
		console.log("WsServer running. port=" + port);
	});

	server.on('connection', function(socket){
		socket.on('message', processMessage);
	});

};

function processMessage(rawData){
	console.log('<<< ' + rawData);
	var data = JSON.parse(rawData);
	console.log(getClientNameList(server.clients));
}

function getClientNameList(clients){
	var list = [];
	clients.forEach(function(c){
		list.push(c.ws.upgradeReq.headers['sec-websocket-key']);
	});
	return StringUtils.stringifyArray(list);
}
