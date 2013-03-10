// greeter.js

var http = require('http');
var url = require('url');
var util = require('util');
var S = require('string');

var helpers = require('./helpers');

function getMessage(request, previous_request) {
	var greeting = getGreeting(request, previous_request);
	var name = getName(request);
	var modifier = "";

	if (greeting == "Goodbye") {
		if (name == "World") {
			modifier = "cruel ";	
		}
	}

	var message = greeting + ", " + modifier + name + "!"
	
	return message;
}


function getGreeting(request, previous_request) {
	var greeting = "Hello";

	if (isMorning()) {
		greeting = "Good morning";
	}

	if (isAustralian(request)) {
		greeting = "G'Day";
	}

	if (isSameClient(request, previous_request)) {
		greeting = "Goodbye";
	}

	return greeting;
}


function getLocale(request) {
	var accept_language = request.headers['accept-language'];
	console.log("accept-language: " + accept_language);	

	// this doesn't really do it, but it will work for my example
	var locales = accept_language.split(';');
	return locales[0];
}

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
		'Content-type':'text/html'
	};

	return headers;
}




function isSameClient(request1, request2) {
	if (! request1 || ! request2) {
		return false;
	}


	console.log('request1: ' + util.inspect(request1.connection.remoteAddress));
	console.log('request2: ' + util.inspect(request2.connection.remoteAddress));
	
	return (request1.connection.remoteAddress == request2.connection.remoteAddress &&
		getName(request1) == getName(request2));
}



function isAustralian(request) {
	var locale = getLocale(request);
	console.log("locale: " + locale);

	if (S(locale).contains("en-AU")) {
		console.log("I'm ausralia");
		return true;
	}	
	return false;
}




function isMorning() {
	var time = new Date();

	if (time.getHours() < 12) {
		return true;
	}

	return false;
}


var greeter = {
	getMessage: getMessage,
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
