var Greeter = {
	type: "greeter",

	greet: function(person) {
		if (! person.name) {
			name = "Individual";
		}

		return getMessage(name);
	},

	getMessage: function getMessage(name) {
		var greeting = "Hello, ";
		var punctuation = "!";
		var modifier = "";

		if (! name) {
			name = "World";
		} 

		var message = greeting + modifier + name + punctuation;
		return message;
	}
};

exports = module.exports = (function() {
	return Greeter;
}());
