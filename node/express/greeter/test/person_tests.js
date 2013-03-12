var assert = require('assert');
var chai = require('chai');
chai.should();


describe("[Person]", function() {
	var Person = require('../lib/person');

	it("should exist", function() {
		Person.should.exist;
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

		it("should not have a name if none given", function() {
			var person = new Person();
			person.should.not.have.property("name");
		});	
	});	

	describe("getLanguage()", function() {
		it("should report a person's language based on their locale", function() {
			var person = new Person();

			var request = {	headers: [] };
			request.headers['Accept-Language'] = 'en-AU; en; q=0.8; en-US; q=0.5';

			var request_helper = require('../lib/request_helper');
			var locale = request_helper.getLocale(request);

			locale.should.equal("en-AU");
		});
	});
});