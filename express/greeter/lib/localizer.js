var dictionaries = {
	"en-US" : {
		greeting: "Hello",
		good_morning: "Good morning",
		farewell: "Goodbye",
		group: "world",
		individual: "individual",
		modifier: "cruel"
	},
	"en-AU": {
		greeting: "G'day" ,
		good_morning: "Good morning",
		farewell: "Cheerio",
		group: "world",
		individual: "mate",
		modifier: "bloody",
	},
	"es": {
		greeting: "Hola",
		good_morning: "Buenas dias",
		farewell: "Adiós",
		group: "a todo el mundo",
		individual: "amigo",
		modifier: "mal"
	}
}

function getDictionary(locale) {
	if(! isLocaleSupported(locale)) {
		locale = default_locale;
	}

	return dictionaries[locale];;
}


function isLocaleSupported(locale) {
	if (locale in dictionaries) {
		return true;
	}

	return false;
}

var localizer = {
	dictionaries: dictionaries,
	getDictionary: getDictionary,
	isLocaleSupported : isLocaleSupported
}

exports = module.exports = (function() {
	return localizer;
}());
