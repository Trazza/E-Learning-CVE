
Alerts = new Meteor.Collection("alerts");

Players = new Meteor.Collection("players");

Players.allow({
  insert: function () {
  
    return true;
  },
  update: function () {
   
    return true;
  },
  remove: function () {
    
    return true;
  }
  
});



