// request_helper_tests.js

var util = require('util');
var assert = require('assert');
var chai = require('chai');
chai.should();

var request = require('../node_modules/express/lib/request.js');
request.headers = [];

describe("[Request Helper]", function() {
	var request_helper = require('../lib/request_helper');

	it("should exist", function() {
		request_helper.should.exist;
	});

	describe("getLocale()", function() {
		it("should return the user's locale en-AU", function() {
			//var request = {	headers: [] };
			request.headers['accept-language'] = 'en-AU; en; q=0.8; en-US; q=0.5';
			
			var locale = request_helper.getLocale(request);

			locale.should.equal("en-AU");
		});
		
		it("should return the user's locale en-US", function() {
			// var request = {	headers: [] };
			// request.headers = [];
			request.headers['accept-language'] = 'en-US';

			var locale = request_helper.getLocale(request);

			locale.should.equal("en-US");
		});
	});

	describe("getName()", function() {
		it("should return the name if it is in the query string", function() {
			request.query = { name: "Aaron" };
			request.headers['accept-language'] = 'en-US';

			var name = request_helper.getName(request);
			console.log("name: " + util.inspect(name));
			name.should.equal("Aaron");
		});

		it("should return undefined if no query string exists", function() {
			request.query = undefined;
			var name = request_helper.getName(request);
			assert(name === undefined);
		});

		it("should return null if the query string does not have a name", function() {
			request.query = {};
			var name = request_helper.getName(request);
			assert(name == null);
		});


		it("should return empty string is name is passed with no value", function() {
			request.query = { name : ""};
			request.headers['accept-language'] = 'en-US';

			var name = request_helper.getName(request);

			assert.strictEqual(name, "");
		});
	});



	describe("isSameAsLastRequest()", function() {
		it("should return true if both requests have the same name and IP address", function() {
			var request1 = {};
			request1.query = { name: "Aaron" };
			request1.connection = {};
			request1.connection.remoteAddress = '1.2.3.4' ;

			var request2 = {};
			request2.query = { name: "Aaron" };
			request2.connection = {};
			request2.connection.remoteAddress = '1.2.3.4' ;

			var comparison = request_helper.isSameClient(request1, request2)
			comparison.should.equal(true);
		})

		it("should return false if requests have a different name", function() {
			var request1 = {};
			request1.query = { name: "Aaron" };
			request1.connection = {};
			request1.connection.remoteAddress = '1.2.3.4' ;

			var request2 = {};
			request2.query = { name: "Different" };
			request2.connection = {};
			request2.connection.remoteAddress = '1.2.3.4' ;

			var comparison = request_helper.isSameClient(request1, request2)
			comparison.should.equal(false);
		})

		it("should return false if requests have a different IP address", function() {
			var request1 = {};
			request1.query = { name: "Aaron" };
			request1.connection = {};
			request1.connection.remoteAddress = '1.2.3.4' ;

			var request2 = {};
			request2.query = { name: "Aaron" };
			request2.connection = {};
			request2.connection.remoteAddress = '11.22.33.44' ;

			var comparison = request_helper.isSameClient(request1, request2)
			comparison.should.equal(false);
		})

	});

	describe("getSecureUrl", function() {
		it("should return https://domain from http://domain", function() {
			var request = {};
			request.app = {};
			request.app.settings = {};
			request.app.settings.port = 8080;
			request.app.settings.https_port = 8443;

		});
	});

});