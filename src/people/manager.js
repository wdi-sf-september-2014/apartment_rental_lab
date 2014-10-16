var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  // inherit name and contact
  Person.call(this, name, contact);
  // manager manages an 'array' of buildings
  this.buildings = [];

}
// Set prototype and constructor
Manager.prototype = new Person;
Manager.prototype.constructor = Manager;


Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
  if (building instanceof Building) {
    // Pushes buildng to the buildings array
    this.buildings.push(building)
  }
  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  if (building instanceof Building) {
    this.buildings.pop()
  }
  return this;
};

module.exports = Manager;




// thing.prototype = new BasicThing;
// thing.prototype.constructor = thing;