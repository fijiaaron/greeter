var i18n = require('i18n');

var Person = function Person(name) {
	this.name = name;

}

Person.prototype.type = "person";

function getLanguage(locale) {
	return false;
}


function isAustralian(locale) {
	if (locale == "en-AU") {
		return true;
	}

	return false;
}


function isSpanish(locale) {
	if (locale== "es") {
		return true;
	}

	return false;
}

Person.getLanguage = getLanguage;
Person.isAustralian = isAustralian;
Person.isSpanish = isSpanish;

exports = module.exports = (function() {
	return Person;
}());
