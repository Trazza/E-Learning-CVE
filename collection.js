
Alerts = new Meteor.Collection("alerts");

Alerts.allow({
  
  update: function (userId, doc, fieldNames, modifier) {
   
    return true;
  }
  
  
});



Players = new Meteor.Collection("players");

Players.allow({
  insert: function (userId, doc) {
  
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
   
    return true;
  },
  remove: function (userId, doc) {
    
    return true;
  }
  
});




