// localizer_tests.js

var util = require('util');
var _ = require('underscore');
var assert = require('assert');
var chai = require('chai');
chai.should();

var locales = ['en-US', 'en-AU', 'es'];

describe("localizer", function() {
	var localizer = require('../lib/localizer');

	it("should exist", function () {
		localizer.should.exist;
		localizer.should.be.an('object');
	})

	it("should have a dictionaries object ", function() {
			localizer.dictionaries.should.be.an('object');
	})

	describe("dictionaries", function() {	
		locales.forEach(function (locale) {
			it("should have dictionary for the '" + locale + " 'locale: " , function() {
				localizer.dictionaries[locale].should.exist;

				describe("locale " + locale, function() {
					var words = ['greeting', 'farewell', 'group', 'individual', 'modifier'];
					words.forEach(function(word) {

						it("should have an entry for " + word, function() {
							localizer.dictionaries[locale].should.contain.key(word);
						})
					})
				})
			})
		});

	}) 

	describe("getDictionary", function() {
		locales.forEach(function(locale) {
			it("should return the dictionary for the locale", function() {
				var dictionary = localizer.getDictionary(locale);
				console.log(util.inspect(dictionary));

				dictionary.should.have.property('greeting').not.to.be.null;
				dictionary.should.have.property('farewell');
				dictionary.should.have.property('group');
				dictionary.should.have.property('individual');
				dictionary.should.have.property('modifier');
			})	
		})
	})
})