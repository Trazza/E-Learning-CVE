// each color has a list so that we have a little variation
var colors = {
  brown: ["#c2892b"],
  red: ["#e91d45"],
  green: ["#30d02c"],
  blue: ["#1d57e9"],
  purple: ["#9414c9"],
  gray: ["#999999"],
  yellow: ["#fee619"]
};


	// TODO per migliorare le prestazioni
  //    provare a sostituite i timeout con Future() per la sincronizzazione 




Accounts.onLogin( function (){

	window.setTimeout( function () { //attesa per dare a meteor il tempo di aggiornare la collection Users		
			
      		if (typeof(Players.findOne(Meteor.userId())) != 'undefined'){
    					console.log('Attenzione: Utente riloggato');
    			}else{
              Meteor.call('insertPlayer');
					}	
	}, 2000 );			
	
	window.setTimeout( function () {
	}, 2000 );	

}); // ENd Accounts.onLogin() **********

Template.user_login.events({    
    'click button.login-mode' : function(e, t){  //login
    	 e.preventDefault(); //  ???
    	 Meteor.loginWithGoogle({
            //requestPermissions: ['profile']
            requestPermissions: ['email']
          }, function (err) {
              if (err)
                Session.set('errorMessage', err.reason || 'Unknown error');
        });
    },
}); // end user.login event

Template.user_login.helpers({

	    
   
});


Template.user_logout.helpers({

  myName: function () {
    return Players.findOne({_id: Meteor.userId()}).nome;
  }
   
});

Template.user_logout.events({

    'submit #temporary_logout_form' : function(e, t){
          e.preventDefault(); //  ???
          var user = Players.findOne(Meteor.userId());
          if (typeof user != 'undefined'){
              user.remove();
          }
      		Meteor.logout();
      		window.setTimeout( function () {}, 2000 );
    }
});


Template.select_session.events({
  "click .swatch": function() {
      Session.set("color", this.name);
  },

  "click .enableRoom": function() {
      //Meteor.call('enableRoom', this.session, true);
      Rooms.findOne({session: this.session}).active(true);
  },

   "click .disableRoom": function() {
      //Meteor.call('enableRoom', this.session, false);
      Rooms.findOne({session: this.session}).active(false);
  },

  'click #enterSession' : function(e, t){

        if (t.find('#rooms').value == 'default') {  //verifico che il nome non sia una sequenza di spazi
            alert("seleziona la room");
            return;
        } else {
            var session = t.find('#rooms').value;  // id la sessione in cui si collega il player 
            console.log(session);
            var pass = Rooms.findOne({session: session}).pass;
            console.log(session);
            var password = prompt('Inserisci la password' , pass);
            if(pass == password){
                var scene = Scenes.findOne({room: session}).id; // prima scena della sessione (dovrebbe essere la prima scena caricata)
                var color = Random.choice(colors[Session.get("color")]);
                Players.findOne(Meteor.userId()).set(session, scene, color);
            } else {
                alert('Password ERRATA\n\n Per accedere richiedi le credenziali all\'amministratore del mondo virtuale');
            }
        }     
  },

  'click #prova' : function(){
     Prova.getFrase();
  }
    
});

Template.select_session.helpers({
  rooms: function () {
      return Rooms.find({loaded: true});
  },

  //tutte le sessioni (.xml) create dall'utente loggato
  myRooms: function() {
      // A causa dell'attesa nel caricare il Player nella collection può segalare un errore email: 'undefined'   
      return Rooms.find({userId: Meteor.user().services.google.email});
  },


  colors: function () { 
      return _.map(_.keys(colors), function (name) {
            return {
              name: name,
              code: colors[name][0]
            };
        });
  },
    
  // active color helper for color picker
  activeColor: function () {
      return this.name === Session.get("color");
  },

});



Template.exit_session.helpers({

  'session': function () {
      return Rooms.findOne({session: Players.findOne({_id: Meteor.userId()}).room}).title;
  },

  'scene': function () {
      return Scenes.findOne({id: Players.findOne({_id: Meteor.userId()}).scene}).title;
  }

});


Template.exit_session.events({
  'click #exitSession' : function(e, t){
      Players.findOne(Meteor.userId()).set(null, null, null);          
  },

});
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  