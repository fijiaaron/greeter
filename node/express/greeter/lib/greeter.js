// greeter.js

var default_locale = "en-US";

var localizer = require('./localizer');

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
	
	if (isSameAsLastRequest) {
		salutation = dictionary.farewell;
	} 

	console.log('typeof name: ' + typeof(name));
	if (! isSet(name)) {
		subject = dictionary.group;
	} 
	else if (name == null) {
		subject = dictionary.group;
	}
	else if (name == '') {
		subject = dictionary.individual;
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


function isSet(arg) {
	return arg !== undefined || arg != null;
}


var greeter = {
	getMessage : getMessage
}

exports = module.exports = (function() {
	return greeter;
}());
