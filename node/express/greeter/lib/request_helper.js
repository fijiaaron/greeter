// request_helper.js

var util = require('util');
var String = require('string');

var request_helper = {
	getLocale: function(request) {
		var locale = 'en-US';

		var accept_language = request.headers['accept-language'];

		if (! accept_language) {
			return locale;
		}

		// this is a hack that just get's what I want for the demo
		if ( String(accept_language).contains(',') ) {
			var locales = accept_language.split(',');
		
			locale = locales[0];
		}
		else {
			locale = accept_language;
		}
		
		if ( String(locale).contains(';') ) {
			var a = locale.split(';');
			locale = a[0];

		} 

		return locale;
	}
}

exports = module.exports = (function() {
	return request_helper;
}());