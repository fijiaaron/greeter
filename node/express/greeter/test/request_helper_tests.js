// request_helper_tests.js

var util = require('util');
var assert = require('assert');
var chai = require('chai');
chai.should();


describe("[Request Helper]", function() {
	var request_helper = require('../lib/request_helper');

	it("should exist", function() {
		request_helper.should.exist;
	});

	describe("getLocale()", function() {
		it("should return the user's locale en-AU", function() {
			var request = {	headers: [] };
			request.headers['Accept-Language'] = 'en-AU; en; q=0.8; en-US; q=0.5';
			
			var locale = request_helper.getLocale(request);

			locale.should.equal("en-AU");
		});
	});

	describe("getLocale()", function() {
		it("should return the user's locale en-US", function() {
			var request = {	headers: [] };
			request.headers['Accept-Language'] = 'en-US';

			var locale = request_helper.getLocale(request);

			locale.should.equal("en-US");
		});
	});
});