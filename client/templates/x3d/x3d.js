Template.x3d_template.helpers({

  


  'on': function () {
      
        if ( ((typeof Session.get('room') == 'undefined') || ( Session.get('room') == null) ) && ((typeof Session.get('scene') == 'undefined') || ( Session.get('scene') == null)) ){
            console.log('SESSIONE NON ATTIVA');
            console.log('room: '+Session.get('room'));
            console.log('scene: '+Session.get('scene'));
            return false;
        } else {
            console.log('SESSIONE ATTIVA');

            console.log('room: '+Session.get('room'));
            console.log('scene: '+Session.get('scene'));

            return true;
        }
      
  },

  'stages': function(){
      return Scenes.find({
                    $and: 
                        [
                           {room: Players.findOne({_id: Meteor.userId()}).room},
                           {title: Players.findOne({_id: Meteor.userId()}).scene},
                           {room: { $not:  null }}
                        ]

      });
  },

  'objects': function () {
      var objs = Objects.find({ 
                   $and: 
                        [
                           {room: Players.findOne({_id: Meteor.userId()}).room},
                           {scene: Players.findOne({_id: Meteor.userId()}).scene},
                           {room: { $not:  null }}
                        ]
      });

      return objs;
    },
  
  'players': function () {
      return Players.find({ 
                  $and: 
                        [
                           {room: Players.findOne({_id: Meteor.userId()}).room},
                           {scene: Players.findOne({_id: Meteor.userId()}).scene},
                           {room: { $not:  null }}
                        ]
      });
  },

});


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
