var Person = require("./person.js");

function Tenant(name, contact) {
  // inherits name contact from Person
  Person.call(this, name, contact);
  // tennant has 'array' of references
  this.references = [];
};

// Set prototype and constructor
Tenant.prototype = new Person;
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
	// Makes sure reference is a person
	if (reference instanceof Person) {
		// Pushes reference to the references array
		this.references.push(reference)
	}
};

Tenant.prototype.removeReference = function(reference) {
	if (reference instanceof Person) {
		this.references.pop()
	}
	return this;
};

module.exports = Tenant;
