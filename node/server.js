// server.js

var http = require('http');
var fs = require('fs');

var Mustache = require('mustache');
var S = require('string');
var Cookies = require('cookies/lib/cookies.js');

var config = require('./config.js');
var greeter = require('./greeter.js');

var previous_request;

var server = http.createServer(
	function(request, response) {
		console.log("request url: " + request.url);

		// workaround bug in chrome that always sends request for favicon
		if (request.url == '/favicon.ico') {
			sendResponse(response, "");
			return;
		}

		
		var cookies = new Cookies(request, response);
		var color = cookies.get('favorite_color');

		var message = greeter.getMessage(request, previous_request);

		if (S(message).contains("cruel")) {
			server.close();
		}
		
		var model = {
			message: message,
			color:  color
		}

		var template = fs.readFileSync("greeting.html", "utf-8");
		// var template = "<h1 style=\"color: {{color}}\">{{message}}</h1>";
		var html = Mustache.to_html(template, model);

		sendResponse(response, html);
		previous_request = request;

 	}
);

function sendResponse(response, content, headers, status) {
	status = greeter.getStatus();
	headers = greeter.getHeaders();

	response.writeHead(status, headers);
	response.write(content);
	response.end();
}

server.listen(config.port);

console.log("server listening on port: " + config.port);