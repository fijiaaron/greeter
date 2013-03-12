
/*
 * GET home page.
 */

var util = require('util');
var greeter = require('../greeter');
var request_helper = require('../greeter/lib/request_helper');

exports.index = function(request, response){
  response.render('index', { title: 'Greeter' });
};

exports.hello = function(request, response) {

	var headers = request.headers;
	var accept_language = request.headers['accept-language']; 


	// var locales = accept_language.split(';');
	// var locale = locales[0].substring(0,5);
	var locale = request_helper.getLocale(request);
	console.log("locale: " + locale);


	var name = request.query.name;
	console.log("name: " + name);

	var message = greeter.greet(name, locale);
	console.log("message: " + message);

	response.render('hello', {name: name, greeting: message});
}