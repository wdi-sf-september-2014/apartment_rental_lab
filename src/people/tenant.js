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
  // add reference to references. Reference must be of type Person
 if (reference instanceof Person) {
    this.references.push(reference);
  }
  return this;
};

Tenant.prototype.removeReference = function(reference) {
  if (reference instanceof Person) {
    var referenceindex = this.references.indexOf(reference);
    for (var i=0; i<this.references.length; i++){
      if (referenceindex !== -1) {
        this.references.splice(referenceindex, 1);
      } else {
        console.log("No reference exists");
      }
    }
  }
  return this;
};


module.exports = Tenant;
