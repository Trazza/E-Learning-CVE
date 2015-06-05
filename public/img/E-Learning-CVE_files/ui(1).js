(function(){Template.ui.helpers({

  'onSession': function () {
  		if ( Players.findOne(Meteor.userId()).room != null) {
  			return true;
  		} else {
  			return false;
  		}
     
  },

});

})();
