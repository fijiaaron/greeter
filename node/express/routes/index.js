
/*
 * GET home page.
 */

var util = require('util');
var greeter = require('../greeter');
var request_helper = require('../greeter/lib/request_helper');

var last_request;

exports.index = function(request, response){
  response.render('index', { title: 'Greeter' });
};

exports.hello = function(request, response) {
	var name = request_helper.getName(request);
	console.log("got name from request: " + name);

	var locale = request_helper.getLocale(request);
	console.log("got locale from request:" + util.inspect(locale));

	var isSame = request_helper.isSameAsLastRequest(request, last_request);
	console.log("is this the same as the last request:" + isSame);

	var message = greeter.getMessage(name, locale, isSame);
	console.log("message: " + message);

	var last_request = request;

	response.render('hello', {name: name, greeting: message});
}