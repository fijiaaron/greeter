// server.js

var http = require('http');


var config = require('./config.js');
var greeter = require('./greeter.js');



var server = http.createServer(
	function(request, response) {
		 var name = greeter.getName(request);

		response.writeHead(greeter.getStatus(), greeter.getHeaders());
		response.write("Hello, " + name + "!");
		response.end();
	}
);

console.log("server listening on port: " + config.port);
server.listen(config.port);
