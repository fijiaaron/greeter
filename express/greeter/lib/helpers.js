// helpers.js

function isSet(arg) {
	return arg !== undefined && arg !== null;
}

function isMorning() {
	var time = new Date();

	if (time.getHours() < 12) {
		return true;
	}

	return false;
}

function capitalize(string) {
	if (string == null) { return ; }

	return string.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
}

var helpers = {
	isSet: isSet,
	isMorning: isMorning,
	capitalize: capitalize
};

exports = module.exports = (function() {
	return helpers;
}());

