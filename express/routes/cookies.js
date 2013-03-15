var Cookies = require('cookies/lib/cookies.js');

exports.index = function(request, response){
	var cookies = new Cookies(request, response);
	
	response.render('cookies', { cookies: 'Cookies' });
};