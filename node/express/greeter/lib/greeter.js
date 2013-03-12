var Person = require('./Person');
var request_helper = require('./request_helper');


var Greeter = {
	type: 'greeter',

	default_greeting: "Hello",
	default_name: "World",
	default_modifier: "",
	default_punctuation: "!",
	default_locale: "en-US",

	locales: {
		"en-US" : {
			greeting: "Hello",
			farewell: "Goodbye",
			group: "World",
			individual: "Individual",
			modifier: "cruel"
		},
		"en-AU": {
			greeting: "G'Day" ,
			farewell: "Cheerio",
			group: "Planet",
			individual: "mate",
			modifier: "bloody",
		},
		"es": {
			greeting: "Hola",
			farewell: "Adios",
			group: "todo mundo",
			individual: "amigo",
			modifier: "malo"
		}
	},

	greet: function greet(person, locale) {
		var _greeting;
		var _modifier;
		var _name;
		var _punctuation;

		// var _person = setOrDefault(person, new Person());
		var _locale = setOrDefault(locale, Greeter.default_locale);
		if (! Greeter.locales[locale])
		_name = this.getName(person, _locale);
		_greeting = this.getGreeting(_locale);

		return this.getMessage(_name, _greeting, _modifier);
	},

	getMessage: function getMessage(name, greeting, modifier, punctuation) {
		var _name = setOrDefault(name, Greeter.default_name)
		var _greeting = setOrDefault(greeting, Greeter.default_greeting);
		var _modifier = setOrDefault(modifier, Greeter.default_modifier);
		var _punctuation = setOrDefault(punctuation, Greeter.default_punctuation);
		
		var message = _greeting + _modifier + _name + _punctuation;
		return message;
	},

	getName: function getName(person, locale) {
		var name; 
		
		var locale = setOrDefault(locale, Greeter.default_locale);
		if (! Greeter.locales[locale]) {
			locale = Greeter.default_locale;
		}
		console.log("locale-->: " + locale)

		if (person) {
			if (typeof(person) == 'string') {
				name = person;
			} 
			else if (person.name) {
				name = person.name;
			} else {
				name = Greeter.locales[locale].individual;				
			}
		} else {
			name = Greeter.locales[locale].group;
		}

		return name;
	},

	getGreeting: function getGreeting(locale) {
		console.log("locale-->: " + locale)
		if (! Greeter.locales[locale]) {
			locale = Greeter.default_locale;
		}

		var greeting = this.locales[locale].greeting;
		return greeting;
	}
};


function setOrDefault(variable, alternate) {
	if (variable) {
		return variable;
	}

	return alternate;
}

exports = module.exports = (function() {
	return Greeter;
}());
