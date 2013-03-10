// greeter.js

var http = require('http');
var url = require('url');
var util = require('util');

var helpers = require('./helpers');

function getName (request) {
	var name = "world";
	var queryString = getQueryString(request);

	if (queryString.name) {
		name = queryString.name;
	}

	name = helpers.capitalize(name);
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

var greeter = {
	getName: getName,
	getHeaders: getHeaders,
	getStatus: getStatus 
};


module.exports = (function() {
	return greeter;
}());

// module.exports = (function() {
// 	return {
// 		getName : getName,
// 		getQueryString : getQueryString,
// 		getStatus : getStatus,
// 		getHeaders : getHeaders
// 	}
// }());

// exports.getName = getName;
// exports.getQueryString = getQueryString;
// exports.getHeaders = getHeaders;
// exports.getStatus = getStatus;
