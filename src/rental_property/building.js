"use strict"

function Building(address) {
  // building has an address
  this.address = address;
  // and array of units
  this.units = [];
}

Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager.
  
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
    this.manager = person ;
  }
};

Building.prototype.getManager = function(){
  // return this.manager 
   return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
     var uniDex = this.units.indexOf(unit);
     if (
      uniDex > -1 &&  
      unit.available() &&
      this.manager  && 
      tenant.references.length > 1) {
        unit.tenant = tenant;
}
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  var uniDex = this.units.indexOf(unit);
  if( uniDex > -1 &&  
      !unit.available() &&
      this.manager  && 
      unit.tenant === tenant){
         unit.tenant = null;
  }
};

Building.prototype.availableUnits = function(){
  // return units available
   var avail = [];
   for (var i = 0; i < this.units.length ; i++){
    if(this.units[i].tenant === null){
      avail.push(this.units[i])
    }
   }
   return avail 
  };

Building.prototype.rentedUnits = function(){
  // return rented units
  var taken = [];
  for (var i = 0; i<this.units.length ; i++){
    if(this.units[i].tenant){
      taken.push(this.units[i])
    }
  }
  return taken;
};

module.exports = Building;
