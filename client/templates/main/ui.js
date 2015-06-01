Template.ui.helpers({

  'onSession': function () {
  		if ( (typeof Session.get('room') != 'undefined') && (Session.get('room') != null) ) {
  			return true;
  		} else {
  			return false;
  		}
     
  },

  

});