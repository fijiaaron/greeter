var assert = require('assert');
var chai = require('chai');
chai.should();


describe("Person", function() {
	var Person = require('../lib/person');

	it("should exist", function() {
		Person.should.be.a('function');
		Person.prototype.type.should.equal('person');
	});

	describe("A person", function() {
		it("should be a Person", function() {
			var person = new Person();
			person.constructor.name.should.equal("Person");
			person.type.should.equal("person");
		});

		it("should have a name if given", function() {
			var name = "Name";
			var person = new Person(name);
			person.should.have.property("name").equal(name);
		});	
	});	
});