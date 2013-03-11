var Person = function Person(name) {
	this.name = name;
}

Person.prototype.type = "person";

exports = module.exports = (function() {
	return Person;
}());
