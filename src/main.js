"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('Show available units', 
  function() {
    for (var i = 0; i < building.units.length; i++){
      if (building.units[i].tenant ===  null){
        console.log("Available units" + "\n");
        console.log("number:" + building.units[i].number + 
                    "  sqft:" + building.units[i].sqft + 
                    " rent: $" + building.units[i].rent);
      } 
    }

    } 
);

menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
  	  // Note: Don't create a new Tenant. Pick a name of exiting tenant.
  	  // Find the corresponding tenant object and add reference. Reference
  	  // is a new Person object.
      for(var i = 0; i<people.length ; i++){
        if(people[i].constructor.name === "Tenant" &&
           people[i].name === tenant_name){
           var referencer = new app.Person(ref_name, ref_contact);
           people.push(referencer);
           people[i].addReference(referencer);
        
        } 
      }
      
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('Move tenant in unit', 
  function(unit_number, tenant_name) {
  	  // Assumes that tenant and unit were previously created. 
      // Find tenant and unit objects, then use building's addTenant() function.
       var unitToAsign;
       var tenantToRent;
       for (var i = 0 ; i < building.units.length; i++){
        if (building.units[i].available() &&
            building.manager){
        unitToAsign = building.units[i]}
        } for (var j = 0; j < people.length; j++){
             if(people[j].constructor.name === "Tenant" &&
                people[j].name === tenant_name &&
                people[j].references.length > 1){
                  tenantToRent = people[j];
              } 
        } unitToAsign.tenant = tenantToRent;
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Evict tenant', 
  function(unit_number , tenant_name) {
      // Similar to above, use building's removeTenant() function.
      var unitToLeave;
      for(var i = 0 ; i < building.units.length; i++){
        if(building.units[i].tenant.name === tenant_name){
           unitToLeave = building.units[i];
           unitToLeave.tenant = null
        }
      }
    
  },
    null, 
    [{'name': 'unit_number', 'type': 'string'}, 
    {'name': 'tenant_name', 'type': 'string'}] 

);

menu.addItem('Show total sqft rented', 
  function() {
    var sqftRented = 0
    for (var i = 0 ; i < building.units.length; i++){
      if (building.units[i].tenant !== null){
        sqftRented = sqftRented + building.units[i].sqft
      }
    } console.log("Total sqft rented: " + sqftRented)
      ;
    }, null,
    [] 
);

menu.addItem('Show total yearly income', 
  function() {
      // Note: only rented units produce income
      var yearlyIncome = 0;
      for (var i = 0; i < building.units.length; i++){
        if(building.units[i].tenant !== null){
          yearlyIncome = yearlyIncome + (building.units[i].rent * 12)
        }
      } console.log ("Total yearly Income : $" + yearlyIncome)
    }, null,
    [] 
);

menu.addItem('Monthly income per sqft rented', 
  function() {
      var incomePerSqft = 0;
      var totalIncome = 0;
      var totalSqftRented = 0
      for (var i=0 ; i<building.units.length ; i++){
        if(building.units[i].tenant !== null){
          totalIncome = totalIncome + building.units[i].rent ;
          totalSqftRented = totalSqftRented + building.units[i].sqft;

        }
      } incomePerSqft = totalIncome/totalSqftRented ;
      console.log("Monthly income per sqft rented : $" + incomePerSqft); 
    }, null,
    [] 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();