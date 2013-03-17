// request_helper.js

var util = require('util');
var _ = require('underscore');
var S = require('string');
var localizer = require('./localizer');

// NOTE: the request object used here is express.request, not necessarily http.request
// TODO: check for http request or express request and check accordingly

function getName(request) {
	var name;
	if (request) {
		if (request.query) {
			if (request.query.name) {
				name = request.query.name;
			}
			if (request.query.name === '') {
				name = '';
			}
		}

		// if (request.param("name")) {
		// 	name = request.param("name");
		// }
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
	// it doesn't rank properly
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


function getClientAddress(request) {
	var client =  request.connection.remoteAddress;
	return client;
}


function isSameClient(request1, request2) {
	if (! request1 || ! request2) {
		return false;
	}

	return (getClientAddress(request1) == getClientAddress(request2)) && 
	       (getName(request1) == getName(request2));
}


function getCookies(request) {
	var cookies = [];

	var cookie_header = request.headers['cookie'];

	if (cookie_header) {
		cookie_header.split(';').forEach(function(c) {
			var cookie = S(c).trim();
			cookies.push(cookie.split('='));
		});
	}
	return cookies;
}

function getFavoriteColor(cookies) {
	var color = "black";
	
	// if (!favorite_color) {
	// 	favorite_color = "purple";
	// }
	color = cookies.get('favorite_color');

	return color;
}


function getSecureUrl(request) {
	var host = request.headers['host'];

	var http_port = request.app.settings.port;
	var https_port = request.app.settings.https_port;

	// the simple way
	host = host.replace(http_port, https_port);
		

	var colon = host.indexOf(':');
	if (colon == -1) {
		host = host + ":" + https_port;
	}

	var secure_url = "https://" + host + request.path;

	return secure_url;
}

var request_helper = {
	getName: getName,
	getLocale: getLocale,
	getClientAddress: getClientAddress,
	isSameClient: isSameClient,
	getCookies: getCookies,
	getFavoriteColor: getFavoriteColor,
	getSecureUrl: getSecureUrl
}

exports = module.exports = (function() {
	return request_helper;
}());
