// greeter2.js

var default_locale = "en-US";

var dictionaries = {
	"en-US" : {
		greeting: "Hello",
		farewell: "Goodbye",
		group: "world",
		individual: "individual",
		modifier: "cruel"
	},
	"en-AU": {
		greeting: "G'day" ,
		farewell: "Cheerio",
		group: "world",
		individual: "mate",
		modifier: "bloody",
	},
	"es": {
		greeting: "Hola",
		farewell: "Adiós",
		group: "a todo el mundo",
		individual: "amigo",
		modifier: "mal"
	}
}

function getMessage(name, locale, isSameAsLastRequest) {
	var message;
	var modifier = "";
	var punctuation = "!";
	var punctuation_inverted = "¡";

	if (! isLocaleSupported(locale)) {
		locale = default_locale;
	}

	var dictionary = dictionaries[locale];

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

function isLocaleSupported(locale) {
	if (locale in dictionaries) {
		return true;
	}

	return false;
}

var greeter = {
	isLocaleSupported : isLocaleSupported,
	getMessage : getMessage
}

exports = module.exports = (function() {
	return greeter;
}());