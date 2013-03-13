// greeter.js

var default_locale = "en-US";

var dictionaries = require('./dictionaries');

function getMessage(name, locale, isSameAsLastRequest) {
	var message;
	var modifier = "";
	var punctuation = "!";
	var punctuation_inverted = "¡";

	if (! dictionaries.isLocaleSupported(locale)) {
		locale = default_locale;
	}

	var dictionary = dictionaries.getDictionary(locale);

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
	isLocaleSupported : isLocaleSupported,
	getDictionary : getDictionary,
	getMessage : getMessage
}

exports = module.exports = (function() {
	return greeter;
}());
