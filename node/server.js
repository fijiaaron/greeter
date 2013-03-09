// server.js

var http = require('http');
var url = require('url');
var util = require('util');
// var S = require('string');
var S = require('./helpers.js');

var config = {
	port: 8080
}



var server = http.createServer(
	function(request, response) {
		var name = getName(request);

		response.writeHead(getStatus(), getHeaders());
		response.write("Hello, " + S.capitalize(name) + "!");
		response.end();
	}
);

function getName(request) {
	var name = "world";
	var queryString = getQueryString(request);

	if (queryString.name) {
		name = queryString.name;
	}

	return name;
}

function getQueryString(request) {
	var queryString = null;

	var url_parts = url.parse(request.url, true);
	queryString = url_parts.query;
	console.log("queryString: " + util.inspect(queryString));

	return queryString;
}

function getStatus() {
	var status = 200;
	return status;
}
function getHeaders() {
	var headers = {
		'Content-type':'text/plain'
	};

	return headers;
}


console.log("server listening on port: " + config.port);
server.listen(config.port);
