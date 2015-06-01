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

					var user_id = Meteor.userId();
					console.log('User id: '+ user_id);
				
					if (typeof(Players.findOne(Meteor.userId())) != 'undefined'){
    					console.log('Attenzione: Utente riloggato');
              //Session.set('room', Players.findOne(Meteor.userId()).room );
              //Session.set('scene', Players.findOne(Meteor.userId()).scene);
              console.log('Sessione: '+Session.get('room'));
              console.log('Scene: '+Session.get('scene'));
    			}else{

						  
 		
						  Session.set("user_id", user_id); 
              //Meteor.call('show');
              //insertPlayer': function(room_id, scene, x, y, z, color, y_view, fp_view)
              //Meteor.call('insertPlayer', Session.get('room_id'), x, y, z, color, y_view, fp_view);
              Meteor.call('insertPlayer', null, null, null, null, null, null, null, null);
					}	
	}, 2000 );			
	
	window.setTimeout( function () {
		var user_id = Meteor.userId()
		//Session.set('user_id', user_id); 
		//console.log('room: '+ Players.findOne(user_id).room);
		//Session.set('room_id', Players.findOne(user_id).room); 
	}, 2000 );	

}); // ENd Accounts.onLogin() **********

Template.user_login.events({
	
    
    'click button.login-mode' : function(e, t){  //login
    	
    	 e.preventDefault(); //  ???

      	//estraggo il nome dal form di login
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

	roomSelected: function() {
		return $('#rooms').value;
	},
	    
  activeRoom: function () {
    	return Rooms.find({_id: Session.get("room_id")});
  }
   
});


Template.user_logout.helpers({

  myName: function () {
    return Players.findOne({_id: Meteor.userId()}).nome;
  }
   
});

Template.user_logout.events({

    'submit #temporary_logout_form' : function(e, t){
    	e.preventDefault(); //  ???

      	//estraggo il nome dal form di login
    	
		//Session.set("mode", "login");
		//Session.set("utente", "Non sei loggato");
		//$("#nome_utente_log").empty();
		
		Meteor.call('removePlayer', Meteor.userId());
		Session.set('user_id', null);
		Session.set('room', null);	
    Session.set('scene', null);
		Meteor.logout();
		//Players.remove(Session.get('user_id'));
		window.setTimeout( function () {
      		location.reload(); //riaggiorna la pagina per pulire gli oggetti che non servono
      		//$('#login-button').show();
       	}, 2000 );
       	
    }
});


Template.select_session.events({
  "click .swatch": function() {
      Session.set("color", this.name);
  },

  "click .enableRoom": function() {
      
      Meteor.call('enableRoom', this.session, true);
  },

   "click .disableRoom": function() {
      
      Meteor.call('enableRoom', this.session, false);
  },

  'click #enterSession' : function(e, t){

        if (t.find('#rooms').value == 'default') {  //verifico che il nome non sia una sequenza di spazi
            alert("seleziona la room");
            return;
        } else {
            var session = t.find('#rooms').value;  // id la sessione in cui si collega il player 
            console.log('session:'+session);
            var pass = Rooms.findOne({session: session}).pass;
            //console.log('password: '+pass);
            var password = prompt('Inserisci la password' , pass);
            if(pass == password){
                
                var scene = Scenes.findOne({room: session}).title; // prima scena della sessione (è sempr la prima scena caricata)
                console.log('scene: '+scene); 
                //posizione iniziale della videocamera first-person
                var y_view = "2.5";
                var fp_view = "0";
                //posizione iniziale player
                var x = "3";
                var y = "0";
                var z = "0";
                var color = Random.choice(colors[Session.get("color")]);


                //'updatePlayer': function (room_id, scene, x, y, z, color, y_view, fp_view){
                Session.set('room', session); 
                Session.set('scene', scene );
                Meteor.call('updatePlayer', session, scene, x, y, z, color, y_view, fp_view);
                /*
                window.setTimeout( function () {
                    location.reload(); //riaggiorna la pagina per pulire gli oggetti che non servono
                    //$('#login-button').show();
                }, 2000 );
                */
            } else {
                alert('Password ERRATA\n\n Per accedere richiedi le credenziali all\'amministratore del mondo virtuale');
            }


            

        }     
  },

  'click #prova' : function(){
    
      //var email = Players.findOne({_id: Meteor.userId()}).email;
      //console.log('email: '+email);
      //Meteor.call('show');
      //alert('SuccesType: '+ 'succF'+'\n SuccesAttribute: '+ 'succA');
      var text = 'GoToTable';
      Meteor.call(text, '', null, null, null);

      
  }
    
});

Template.select_session.helpers({

  

  rooms: function () {
    return Rooms.find({loaded: true});
  },

  //tutte le sessioni (.xml) create dall'utente loggato
  myRooms: function() {
      // A causa dell'attesa nel caricare il Player nella collection può segalare un errore email: 'undefined'   
     return Rooms.find({userId: Players.findOne({_id: Meteor.userId()}).email});
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
      return Players.findOne({_id: Meteor.userId()}).scene;
  }

});


Template.exit_session.events({
  'click #exitSession' : function(e, t){

        
      //'updatePlayer': function(room, scene, x, y, z, color, y_view, fp_view){
      Meteor.call('updatePlayer', null, null, null, null, null, null, null, null);       
      Session.set('room', null); 
      Session.set('scene', null);
      location.reload();

          
  },

});
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  