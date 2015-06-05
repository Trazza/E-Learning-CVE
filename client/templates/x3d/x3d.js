Template.x3d_template.helpers({

  


  'on': function () {
      
        if ( (Players.findOne(Meteor.userId()).room == null) && (Players.findOne(Meteor.userId()).scene == null)){
            console.log('SESSIONE NON ATTIVA');
            return false;
        } else {
            console.log('SESSIONE ATTIVA');
            
            return true;
        }
        console.log('room: '+Players.findOne(Meteor.userId()).room);
        console.log('scene: '+Players.findOne(Meteor.userId()).scene);
  },

  'stages': function(){
      var player = Players.findOne(Meteor.userId());
      return Scenes.find({
                    $and: 
                        [
                           {room: player.room},
                           {id: player.scene},
                           {room: { $not:  null }}
                        ]

      });
  },

  'objects': function () {
      var player = Players.findOne(Meteor.userId());
      var objs = Objects.find({ 
                   $and: 
                        [
                           {room: player.room},
                           {scene: player.scene},
                           {room: { $not:  null }}
                        ]
      });

      return objs;
    },
  
  'players': function () {
      var player = Players.findOne(Meteor.userId());
      return Players.find({ 
                  $and: 
                        [
                           {room: player.room},
                           {scene: player.scene},
                           {room: { $not:  null }}
                        ]
      });
  },


  'zView_su': function () {
      return (String(parseFloat(Players.findOne(Meteor.userId()).z) + 10));
      
  },
  'zView_giu': function () {
      return (String(parseFloat(Players.findOne(Meteor.userId()).z) - 10));
      
  },
  'xView_des': function () {
      return (String(parseFloat(Players.findOne(Meteor.userId()).x) - 10));
      
  },
  'xView_sin': function () {
      return (String(parseFloat(Players.findOne(Meteor.userId()).x) + 10));
      
  },

  'fp1Active': function(){
      if (Players.findOne(Meteor.userId()).cam == 'fp1'){
        return true;
      } else {
        return false;
      }
  },

  'fp2Active': function(){
      if (Players.findOne(Meteor.userId()).cam == 'fp2'){
        return true;
      } else {
        return false;
      }
  },

  'fp3Active': function(){
      if (Players.findOne(Meteor.userId()).cam == 'fp3'){
        return true;
      } else {
        return false;
      }
  },

  'fp4Active': function(){
      if (Players.findOne(Meteor.userId()).cam == 'fp4'){
        return true;
      } else {
        return false;
      }
  },
});

/*
Template.on_template.helpers({
  'stages': function(){
      return Scenes.find({
                    $and: 
                        [
                           {room: Session.get('room')},
                           {title: Session.get('scene')},
                           {room: { $not:  null }}
                        ]

      });
  },

  'objects': function () {
      var objs = Objects.find({ 
                   $and: 
                        [
                           {room: Session.get('room')},
                           {scene: Session.get('scene')},
                           {room: { $not:  null }}
                        ]
      });

      return objs;
    },
  
  'players': function () {
      return Players.find({ 
                  $and: 
                        [
                           {room: Session.get('room')},
                           {scene: Session.get('scene')},
                           {room: { $not:  null }}
                        ]
      });
  },
});
*/
