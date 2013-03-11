var assert = require('assert');
var chai = require('chai');
chai.should();

describe("Greeter", function() {
	var greeter = require('../lib/greeter');
	var Person = require('../lib/person');

	it("should exist", function() {
		greeter.should.be.an('object');
		greeter.should.have.property('type').equal('greeter');
	});

	describe("getMessage", function() {
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

	// describe("greet", function(){
	// 	var person = new Person();

	// 	it("should return 'Hello, World!', if no name is given", function() {
	// 		var message = greeter.greet();
	// 		message.should.equal("Hello, World!");
	// 	});

	// 	it("should return 'Hello, Name!', if a name is given", function() {
	// 		var name = "Aaron";
	// 		var message = greeter.greet(name);
	// 		message.should.equal("Hello, " + name + "!");
	// 	});
	// });
});