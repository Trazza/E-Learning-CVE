//****************************************************
//
//  http://docs.meteor.com/#/full/publishandsubscribe
//
//****************************************************


//pubblico anche l'insieme di informazioni ricavate dal google account
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish("objects", function () {
  //return Objects.find({room: Players.findOne(this.userId()).room, scene: Players.findOne(this.userId()).scene});
  return Objects.find({});
});

Meteor.publish("uploads", function () {
  return Uploads.find({});
});

Meteor.publish("alerts", function () {
  //return Alerts.find({room: Players.findOne(this.userId()).room});
  return Alerts.find({});
});

Meteor.publish("rooms", function () {
  return Rooms.find({});
});

Meteor.publish("scenes", function () {
  //return Scenes.find({id: Players.findOne(this.userId()).scene});
  return Scenes.find({});
});

Meteor.publish("players", function () {
  //if (Meteor.userId()){
  //  return Players.find({room: Players.findOne(Meteor.userId()).room, scene: Players.findOne(Meteor.userId()).scene});
  //} else {
      return Players.find({});
  //}
  
});