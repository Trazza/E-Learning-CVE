


//*********************************************************************************************
// 
//  https://github.com/mizzao/meteor-user-status
//
//  la funzione serve a verificare se l'utente, anche se loggato, è connesso al gioco,
//  in quanto il login può rimanere anche se l'utente non è connesso al portale (tipo facebook)
//
//*********************************************************************************************

Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    console.log("-----------------------------------");
    console.log('ON');
    console.log(user._id);
  },
  removed: function(user) {
    if (typeof user._id != 'undefined'){
          console.log("-----------------------------------");
          console.log('OFF');
          console.log(user._id);
          //Meteor.call('updatePlayer', id._id, null, null, null);

          Players.findOne(user._id).set(null, null, null);  //questo metodo può generare errore al logout in quanto la collection Players potrebbe aggiornarsi dopo il controllo  ._id != undefined
    }
  }
});



if (Meteor.isServer) {

  //------------------------------------------------------------------------------------------------------------------
	Meteor.startup(function() {
	
			console.log('Restart....');
      

		
  }); //end 'Meteor.startup'  
  //------------------------------------------------------------------------------------------------------------------


} //end 'Meteor.isServer'













