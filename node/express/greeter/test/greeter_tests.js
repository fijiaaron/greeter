// greeter2_tests.js
var inspect = require('util').inspect;
var assert = require('assert');
var chai = require('chai');
chai.should();

describe("Greeter", function() {
	var greeter = require('../lib/greeter');
		
	it("should exist", function() {
		greeter.should.exist;
		greeter.should.be.an('object');
	});

	describe("getMessage()", function () {
		it("should return 'Hello, world!' if no parameters are given", function () {
			var message = greeter.getMessage();
			message.should.equal("Hello, world!");
		});

		it("should return 'Hello, world!' if all parameters are not set", function () {
			var name;
			var locale ='en-US';
			var isSame = false;
			var message = greeter.getMessage(name, locale, isSame);
			message.should.equal("Hello, world!");
		});

		it("should return 'Hello, world!' if all parameters are null", function () {
			var name = null;
			var locale = null;
			var isSame = null;
			var message = greeter.getMessage(name, locale, isSame);
			message.should.equal("Hello, world!");
		});

		it("should return 'Hello, individual!' if name is an empty string", function () {
			var name = "";
			var message = greeter.getMessage(name);
			message.should.equal("Hello, individual!");
		});

		it("should return 'Hello, Name!' if a name is give", function () {
			var name = "Name"; 
			var message = greeter.getMessage(name);
			message.should.equal("Hello, " + name + "!");
		});

		it("should return 'Goodbye, Name!' if request is same as last", function () {
			var name = "Name"; 
			var locale = "en-US";
			var isSame = true;
			var message = greeter.getMessage(name, locale, isSame);
			message.should.equal("Goodbye, " + name + "!");
		});

		it("should return 'Goodbye, cruel world!' if request is same as last and name is 'World'", function () {
			var name = "world"; 
			var locale = "en-US";
			var isSame = true;
			var message = greeter.getMessage(name, locale, isSame);
			message.should.equal("Goodbye, cruel " + name + "!");
		});



		describe("for Spanish locale", function() {
			var locale = "es";
				
			it("should return '¡Hola a todo el mundo!' if no name is given", function () {
				var message = greeter.getMessage(undefined, locale);
				message.should.equal("¡Hola a todo el mundo!");
			});

			it("should return '¡Hola a todo el mundo!' if name is null", function () {
				var name;
				var message = greeter.getMessage(name, locale);
				message.should.equal("¡Hola a todo el mundo!");
			});

			it("should return '¡Hola amigo!' if name is an empty string", function () {
				var name = "";
				var message = greeter.getMessage(name, locale, false); 
				message.should.equal("¡Hola amigo!");
			});

			it("should return '¡Hola Nombre!' if name is given", function () {
				var name = "Nombre";
				var message = greeter.getMessage(name, locale); 
				message.should.equal("¡Hola Nombre!");
			});

			it("should return '¡Hola Nombre!' if name is given and request is not the same as last", function () {
				var name = "Nombre";
				var message = greeter.getMessage(name, locale, false); 
				message.should.equal("¡Hola " + name + "!");
			});

			it("should return '¡Adiós Nombre!' if name is given and request is same as last", function () {
				var name = "Nombre";
				var message = greeter.getMessage(name, locale, true); 
				message.should.equal("¡Adiós " + name + "!");
			});

			it("should return '¡Adiós amigo!' if request is same as last and name is an empty string", function() {
				var name = "";
				var message = greeter.getMessage(name, locale, true);
				message.should.equal("¡Adiós amigo!");
			})

			it("should return '¡Adiós a todo el mundo mal!' if request is same as last and name is an empty string", function() {
				var name;
				var message = greeter.getMessage(name, locale, true);
				message.should.equal("¡Adiós a todo el mundo mal!");
			})
		})
	

		describe("for Australian locale", function() {
			var locale = "en-AU";
				
			it("should return 'G'day, world!", function () {
				var message = greeter.getMessage(undefined, locale);
				message.should.equal("G'day, world!");
			});

			it("should return 'G'day mate!' if name is an empty string", function () {
				var name = "";
				var message = greeter.getMessage(name, locale, false); 
				message.should.equal("G'day, mate!");
			});

			it("should return 'G'day Name' if name is given", function () {
				var name = "Name";
				var message = greeter.getMessage(name, locale); 
				message.should.equal("G'day, " + name + "!");
			});

			it("should return 'Cheerio, Name!' if name is given and request is same as last", function () {
				var name = "Name";
				var message = greeter.getMessage(name, locale, true); 
				message.should.equal("Cheerio, " + name + "!");
			});

			it("should return 'Cheerio, mate!' if request is same as last and name is an empty string", function() {
				var name = "";
				var message = greeter.getMessage(name, locale, true);
				message.should.equal("Cheerio, mate!");
			})

			it("should return 'Cheerio, bloody world!' if request is same as last and name is an empty string", function() {
				var name;
				var message = greeter.getMessage(name, locale, true);
				message.should.equal("Cheerio, bloody world!");
			})
		})
	});
});