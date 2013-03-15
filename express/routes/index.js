var util = require('util');
var S = require('string');

var greeter_path = '../greeter';
var greeter = require(greeter_path);
var request_helper = require(greeter_path + '/lib/request_helper');
var Cookies = require('cookies/lib/cookies.js');

var last_request;

exports.index = function(request, response) {
	var cookies = new Cookies(request, response);
	var brand = cookies.get('brand');
	var favorite_color = request_helper.getFavoriteColor(cookies);

	response.render('index', { title: 'Greeter', brand: brand });
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
	var brand = cookies.get('brand');

	var favorite_color = request_helper.getFavoriteColor(cookies);
	console.log("favorite_color: " + favorite_color);

	
	last_request = request;

	response.render('hello', {name: name, greeting: message, brand: brand, color: favorite_color});
}

exports.register = function(request, response) {
	var cookies = new Cookies(request, response);
	var brand = cookies.get('brand');
	var favorite_color = request_helper.getFavoriteColor(cookies);

	response.render('register', {title: "Registration", brand: brand, color: favorite_color});
}

exports.cookies = function(request, response) {
	var cookies = new Cookies(request, response);
	var brand = cookies.get('brand');
	var favorite_color = request_helper.getFavoriteColor(cookies);

	var kookies = request_helper.getCookies(request);

	console.log(util.inspect(kookies));

	// console.log("cookies: " + util.inspect(cookie_header)c);
	response.render('cookies', { title: 'Cookies', cookies: kookies, brand: brand, color: favorite_color });
};

exports.admin = function(request, response) {
	// for use with a reverse proxy (e.g Apache)
	//if (req.headers['x-forwarded-proto'] {
	if (! request.connection.encrypted) {
		var secure_url = request_helper.getSecureUrl(request);
		response.redirect(secure_url);
	}

	var cookies = new Cookies(request, response);
	var brand = cookies.get('brand');
	var favorite_color = request_helper.getFavoriteColor(cookies);

	response.render('admin', { title: 'Admin', cookies: kookies, brand: brand, color: favorite_color });

}
