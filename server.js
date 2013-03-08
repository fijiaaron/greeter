//server.js

var http = require('http');

var server = http.createServer(
	function(request, response) {
		var headers = {'Content-type':'text/plain'}
		response.writeHead(200, headers);
		response.write('Hello, World!');
		response.end();
	}
);

server.listen(8080);
