var assert = require('assert');
var chai = require('chai');
chai.should();

describe("[Greeter]", function() {

	var greeter = require('../lib/greeter');
	var Person = require('../lib/person');
	var request_helper = require('../lib/request_helper');

	it("should exist", function() {
		greeter.should.exist;
		greeter.should.be.an('object');
		greeter.should.have.property('type').equal('greeter');
	});

	describe("getMessage()", function() {
		it("should return 'Hello, World!', if no name is given", function() {
			var message = greeter.getMessage();
			message.should.equal("Hello, World!");
		});

		it("should return 'Hello, Name!', if a name is given", function() {
			var name = "Aaron";
			var message = greeter.getMessage(name);
			message.should.equal("Hello, " + name + "!");
		});
	});

	describe("greet()", function() {
		it("should return 'Hello, World!', if no person is sent", function() {
			var message = greeter.greet();
			message.should.equal("Hello, World!");
		});

		it("should return 'Hello, Name!', if person is a string", function() {
			var message = greeter.greet("Name");
			message.should.equal("Hello, Name!");
		});

		it("should return 'Hello, Individual!', if person has no name", function() {
			var person = new Person();
			var message = greeter.greet(person);
			message.should.equal("Hello, Individual!");
		});

		it("should return 'Hello, Name!', if a name is given", function() {
			var name = "Aaron";
			var person = new Person(name);
			var message = greeter.greet(person);
			message.should.equal("Hello, " + name + "!");
		});

		describe("locale based greeting", function() {
			it("should greet Australians with 'G'Day'", function() {
				var name = "Mick";
				var person = new Person(name);
				
				var request = {	headers: [] };
				request.headers['Accept-Language'] = 'en-AU; en; q=0.8; en-US; q=0.5';
				var locale = request_helper.getLocale(request);
				console.log(locale);

				var message = greeter.greet(person, 'en-AU');
				message.should.equal("G'Day, " + name + "!");
			});

			it("should greet Americans with 'Hello'", function() {
				var message = greeter.greet("John", 'en-US');
				message.should.equal("Hello, John!");
			});

			it("should greet Mexicans with 'Hola'", function() {
				var message = greeter.greet(null, 'es-MX');
				message.should.equal("Hola, todo mundo!");
			});


			it("should greet Mexicans with 'Hola'", function() {
				var message = greeter.greet(new Person(), 'es-MX');
				message.should.equal("Hola, amigo!");
			});

			it("should greet Mexicans with 'Hola'", function() {
				var name = "Juan";
				var message = greeter.greet(new Person(name), 'es-MX');
				message.should.equal("Hola, " + name + "!");
			});
		});
	});
});