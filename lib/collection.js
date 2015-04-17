//Rooms contiene i dati delle stanza in cui si gioca gioco (stanze)
// nome e id  (e il nome del team)
//Players contiene i dati di ogni singolo giocatore e contiene il nome della Room in cui gioca 
//Object contiene i dati e le caratteristiche di ogni oggetto: gli oggetti sono duplicati per ogni stanza (hanno id stanza a cui appartengono)


Rooms = new Meteor.Collection("rooms");

Rooms.allow({
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


Objects = new Meteor.Collection("objects");

Objects.allow({
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



Uploads = new Meteor.Collection('uploads');

Uploads.allow({
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

