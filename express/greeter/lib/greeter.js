// greeter.js

var default_locale = "en-US";
var localizer = require('./localizer');

var isSet = require('./helpers').isSet;
var capitalize = require('./helpers').capitalize;
var isMorning = require('./helpers').isMorning;

function getMessage(name, locale, isSameAsLastRequest) {
	var message;
	var modifier = "";
	var subject = name;
	var punctuation = "!";
	var punctuation_inverted = "¡";

	if (! localizer.isLocaleSupported(locale)) {
		locale = default_locale;
	}

	var dictionary = localizer.getDictionary(locale);

	var salutation = dictionary.greeting;
	
	if (isMorning()) {
		salutation = dictionary.good_morning;
	} 

	else if (isSameAsLastRequest) {
		salutation = dictionary.farewell;
	}

	if (! isSet(name)) {
		subject = dictionary.group;
	} 
	else if (name == '') {
		subject = dictionary.individual;
	} else {
		subject = capitalize(name);
	}

	if (salutation == dictionary.farewell && subject == dictionary.group) {
		modifier = dictionary.modifier;
	}

	if (modifier != "") {
		if (locale == "es") {
			modifier = " " + modifier;
		} else {
			modifier = modifier + " ";
		}
	}

	message = salutation + ", " + modifier + subject + punctuation;
	
	if (locale == "es") {
		message = punctuation_inverted + salutation + " " + subject + modifier + punctuation;
	}

	return message;
}


var greeter = {
	getMessage : getMessage
}

exports = module.exports = (function() {
	return greeter;
}());
