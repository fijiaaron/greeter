// request_helper_tests.js

var util = require('util');
var assert = require('assert');
var chai = require('chai');
chai.should();

var request = require('../node_modules/express/lib/request.js');

describe("[Request Helper]", function() {
	var request_helper = require('../lib/request_helper');

	it("should exist", function() {
		request_helper.should.exist;
	});

	describe("getLocale()", function() {
		it("should return the user's locale en-AU", function() {
			var request = {	headers: [] };
			request.headers['accept-language'] = 'en-AU; en; q=0.8; en-US; q=0.5';
			
			var locale = request_helper.getLocale(request);

			locale.should.equal("en-AU");
		});

		it("should return the user's locale en-US", function() {
			var request = {	headers: [] };
			request.headers['accept-language'] = 'en-US';

			var locale = request_helper.getLocale(request);

			locale.should.equal("en-US");
		});

	});

	describe("getName()", function() {
		it("should return 'World' if no name parameter exists", function() {
			var name = request_helper.getName(request);

			name.should.equal("World");
		});

		it("should return the name if given", function() {
			request.query = { name: "Aaron" };
			var name = request_helper.getName(request);

			name.should.equal("Aaron");
		});

		it("should return Individual is name is passed with no value", function() {
			request.query.name = "";
			var name  = request_helper.getName(request);

			name.should.equal("Individual");
		});
	});



	describe("isSameAsLastRequest()", function() {

		it("should return true if both requests have the same name and IP address", function() {
			assert.fail('not implemented yet');
		})

	});

});