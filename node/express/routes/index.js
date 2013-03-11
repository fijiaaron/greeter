
/*
 * GET home page.
 */

var util = require('util');

exports.index = function(request, response){
  response.render('index', { title: 'Greeter' });
};

exports.hello = function(request, response) {
	var name = request.query.name;
	response.render('hello', {name: name});
}