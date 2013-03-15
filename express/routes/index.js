var util = require('util');
var S = require('string');

var greeter_path = '../greeter';
var greeter = require(greeter_path);
var request_helper = require(greeter_path + '/lib/request_helper');
var Cookies = require('cookies/lib/cookies.js');

var last_request;

exports.index = function(request, response) {
  response.render('index', { title: 'Greeter' });
};

exports.hello = function(request, response) {
	var name = request_helper.getName(request);
	console.log("got name from request: " + name);

	var locale = request_helper.getLocale(request);
	console.log("got locale from request:" + util.inspect(locale));

	console.log('this request IP: ' + request.connection.remoteAddress);

	if (last_request) {
		console.log('last request IP: ' + last_request.connection.remoteAddress);
	}
	
	var isSame = request_helper.isSameClient(request, last_request);
	console.log("is this the same client as the last request: " + isSame);

	var message = greeter.getMessage(name, locale, isSame);
	console.log("message: " + message);

	var cookies = new Cookies(request, response);
	var favorite_color = request_helper.getFavoriteColor(cookies);
	console.log("favorite_color: " + favorite_color);

	last_request = request;

	response.render('hello', {name: name, greeting: message, color: favorite_color});
}


exports.cookies = function(request, response) {
	var cookies = new Cookies(request, response);

	var kookies = request_helper.getCookies(request);

	console.log(util.inspect(kookies));

	// console.log("cookies: " + util.inspect(cookie_header)c);
	response.render('cookies', { title: 'Cookies', cookies: kookies });
};