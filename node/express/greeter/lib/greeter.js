// greeter.js

var default_locale = "en-US";

var localizer = require('./localizer');

function getMessage(name, locale, isSameAsLastRequest) {
	var message;
	var modifier = "";
	var punctuation = "!";
	var punctuation_inverted = "¡";

	if (! localizer.isLocaleSupported(locale)) {
		locale = default_locale;
	}

	var dictionary = localizer.getDictionary(locale);

	var salutation = dictionary.greeting;
	
	if (isSameAsLastRequest) {
		salutation = dictionary.farewell;
	} 

	if (name === undefined) {
		name = dictionary.group;
	}

	if (name == "") {
		name = dictionary.individual;
	}

	if (salutation == dictionary.farewell && name == dictionary.group) {
		modifier = dictionary.modifier;
	}

	if (modifier != "") {
		if (locale == "es") {
			modifier = " " + modifier;
		} else {
			modifier = modifier + " ";
		}
	}

	message = salutation + ", " + modifier + name + punctuation;
	
	if (locale == "es") {
		message = punctuation_inverted + salutation + " " + name + modifier + punctuation;
	}


	return message;
}


var greeter = {
	getMessage : getMessage
}

exports = module.exports = (function() {
	return greeter;
}());
