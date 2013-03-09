var HttpServer = require('./HttpServer');
var WsServer = require('./WsServer');

var http = new HttpServer(8080);
var ws = new WsServer(8888);

