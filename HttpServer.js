var connect = require('connect');

var _staticHandler = connect.static('./web');
var _postHandler = undefined;

module.exports = function(port, postHandler){

	var server = connect.createServer();

	var methods = {
		GET: doGet,
		POST: doPost
	}
	_postHandler = postHandler;

	server.use(function(req, res){
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
	_staticHandler(req, res);
}

function doPost(req, res){
	console.log('HTTP POST', req.url);
	var data="";
	req.on("data", function(packet){
		data += packet;
	});
	req.on("end", function(){
		_postHandler(req, res, data);
		res.end();
	});
}

