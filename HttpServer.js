var http = require('http');

module.exports = function(port){

	var methods = {
		GET: doGet
	}

	var server = http.createServer(function(req, res){
		var method = methods[req.method];
		if(!method){
			console.log("err: unsported method. method="+req.method);
		} else {
			method(req, res);
		}
	});

	server.listen(port, function(){
		console.log("HttpServer running. port=" + port);
	});
};

function doGet(req, res){
	console.log('GET');
	res.write("hello");
	res.end();
}