var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  Person.call(this, name, contact);
  this.buildings = [];
}

Manager.prototype = new Person;
Manager.prototype.constructor = Manager;

Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
  // ...
  if (building instanceof Building) {
    this.buildings.push(building);
  }
  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  // ...
  if (building instanceof Building) {
    this.buildings.pop(building);
  }
  return this;
};

module.exports = Manager;