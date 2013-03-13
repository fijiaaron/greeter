// request_helper.js

var util = require('util');
var S = require('string');
var dictionaries = require('./dictionaries');

function getName(request) {
	var name;
	var locale = getLocale(request);
	
	var dictionary = greeter.getDictionary(locale);
	console.log("dictionary: " + util.inspect(dictionary));

	if (! request || request.query) {

		name = dictionary.group;
	}

	if (! request.query) {
		console.log("no request.query");
		return name;
	}

	if (! 'name' in request.query) {
		console.log("name not in request.query");
		return name;
	}

	if (! request.query.name) {
		name = "Individual";
	} else {
		name = "Individual";
	} 
	
	return name;
}

function getLocale(request) {
	var locale = 'en-US';

	var accept_language = request.headers['accept-language'];

	if (! accept_language) {
		return locale;
	}

	// this is a hack that just gets what I want for the demo
	// it doesn't rank or properly format
	if ( S(accept_language).contains(',') ) {
		var locales = accept_language.split(',');
	
		locale = locales[0];
	}
	else {
		locale = accept_language;
	}
	
	if ( S(locale).contains(';') ) {
		var parts = locale.split(';');
		locale = parts[0];
	} 

	if ( S(locale).startsWith('es') ) {
		locale = 'es';
	}

	return locale;
}

function isSameClient(request1, request2) {
	if (! request1 || ! request2) {
		return false;
	}
	if (request1.connection.remoteAddress == request2.connection.remoteAddress &&
		getName(request1) == getName(request2));
}

var request_helper = {
	getName: getName,
	getLocale: getLocale,
	isSameClient: isSameClient
}

exports = module.exports = (function() {
	return request_helper;
}());
