var connect = require('connect');

var _staticHandler = connect.static('./web');
var _handlers = undefined;

module.exports = function(port, handlers){

	var server = connect();

	var methods = {
		GET: doGet,
		POST: doPost
	}
	_handlers = handlers;

	server
		.use(connect.bodyParser())
		.use(function(req, res){
			var method = methods[req.method];
			if(!method){
				console.log("unsupprted method:"+req.method);
				res.statusCode=500;
				res.end();
			} else {
				method(req, res);
			}
		});

	server.listen(port, function(){
		console.log("HttpServer running. port=" + port);
	});

	return server;
};

function doGet(req, res){
	console.log('HTTP GET', req.url);
	if(req.url=='/list'){
		var handler = _handlers["LIST"];
		if(handler) handler(req, res);
		res.end();
	} else {
		_staticHandler(req, res);
	}
}

function doPost(req, res){
	console.log('HTTP POST', req.url, req.body);
	var handler = _handlers["POST"];
	if(handler) handler(req, res, req.body);
	res.end();
}

