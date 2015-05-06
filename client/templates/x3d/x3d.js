Template.x3d_template.helpers({

	'objects': function () {
    	return Objects.find({room: Session.get('room_id')});
  	},
	
	'players': function () {
    	return Players.find({room: Session.get('room_id')});
  	}

});