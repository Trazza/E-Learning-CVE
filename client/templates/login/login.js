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


	
Accounts.onLogin( function (){

	window.setTimeout( function () { //attesa per dare a meteor il tempo di aggiornare la collection Users

					var user_id = Meteor.userId();
					console.log('User id: '+ user_id);
				
					if (typeof(Players.findOne(user_id)) != 'undefined'){
    					alert('Attenzione: Utente già Loggato');
    					Meteor.logout();
    				}else{
						
						
						//posizione iniziale della videocamera first-person
						var y_view = "2.5";
						var fp_view = "0";
						//posizione iniziale player
 						var x = "3";
 						var y = "0";
 						var z = "0";
 						var color = Random.choice(colors[Session.get("color")]);
 		
 						console.log('room: '+ Session.get('room_id'));
						Session.set("user_id", user_id); 
 						Meteor.call('insertPlayer', Session.get('room_id'), x, y, z, color, y_view, fp_view);
 						//Meteor.call('insertPlayer', room_id, user_id, username, x, y, z, color, y_view, fp_view);
					
					}	
				}, 2000 );			
	
	window.setTimeout( function () {
		var user_id = Meteor.userId()
		//Session.set('user_id', user_id); 
		//console.log('room: '+ Players.findOne(user_id).room);
		//Session.set('room_id', Players.findOne(user_id).room); 
	}, 2000 );			
});


Template.user_login.events({
	
	"click .swatch": function() {
    	Session.set("color", this.name);
  	},
  	
  	'click #room-button' : function(e, t){
    	
    	e.preventDefault(); //  ???
      	var roomname = t.find('#room-name').value;
    	 
    	if (roomname.replace(/ /g, '') == "") {  //verifico che il nome non sia una sequenza di spazi
    		alert("inserisci il nome della Stanza");
    	} else {
    		// l'id temporaneo è costruito dall'username eliminando gli spazzi e aggiungendo '_id' in coda
    		var room_id = roomname.replace(/ /g, '')+ "_id";
    		if (typeof(Rooms.findOne(room_id)) != 'undefined'){
    			alert('Stanza ESISTENTE');
    		}else{;
				 
				//viene creata la room con gli oggetti e le attività associate
				Meteor.call('insertRoom', room_id, roomname);
				Meteor.call('insertObject', 'lavagna', room_id);
				Meteor.call('insertActivity', 'quiz', room_id);
				//Session.set('room_id', room_id);
				
			}
       	}
     	t.find('#room-name').value = ""; 	
	},
    
    
    'click button.login-mode' : function(e, t){  //login
    	
    	e.preventDefault(); //  ???

      	//estraggo il nome dal form di login
    	 
    	if (t.find('#rooms').value == 'default') {  //verifico che il nome non sia una sequenza di spazi
    		alert("seleziona la room");
    		return;
    	} else {
    	
    			$('#login-button').hide(); 
    		// l'id temporaneo è costruito dall'username eliminando gli spazzi e aggiungendo '_id' in coda
    		
    		
				//Session.set("mode", "scenaMode"); //si cambia il template 
				//Session.set("utente", username); 
				
				var room_id = t.find('#rooms').value;
				Session.set('room_id', room_id);
				
		
				Meteor.loginWithGoogle({
  					requestPermissions: ['profile']
					}, function (err) {
  						if (err)
    						Session.set('errorMessage', err.reason || 'Unknown error');
    					
				});
				
				
				
       	}
       	
      },
    
    
    
      
    'click #prova' : function(e, t){
    
    	Meteor.call('prova');
    	//Meteor.log.info('1234567890'); 
    	/* visualizzare slide da google drive 
    	var url = "https://drive.google.com/file/d/0B_rkHyo_rKS4Zk1zLVB1WUpieGs/view?usp=sharing&output=embed";
    	window.open(url);
    	*/
    	//window.location.replace(url);
       
       /*
       AntiModals.dismissAll();
  		AntiModals.overlay('slideshow', {
      					modal: true,
      				});

    	
		console.log('personalizza');
       		
	}
   */
       /*
       AntiModals.dismissAll();
  		AntiModals.overlay('personalize_modalView', {
      					modal: true,
      				});

    	
		console.log('personalizza');
		*/
       		
	}
   
}); // end user.login event

Template.user_login.helpers({
	
	// list of colors for color picker
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

	roomSelected: function() {
		return $('#rooms').value;
	},
	
	rooms: function () {
    	return Rooms.find();
    },
    
    activeRoom: function () {
    	return Rooms.find({_id: Session.get("room_id")});
  	}

    
});



Template.user_logout.events({

    'submit #temporary_logout_form' : function(e, t){
    	e.preventDefault(); //  ???

      	//estraggo il nome dal form di login
    	
		//Session.set("mode", "login");
		//Session.set("utente", "Non sei loggato");
		//$("#nome_utente_log").empty();
		
		Meteor.call('removePlayer',Session.get('user_id'));
		Session.set('user_id', null);
		Session.set('room_id', null);	
		Meteor.logout();
		//Players.remove(Session.get('user_id'));
		window.setTimeout( function () {
      		location.reload(); //riaggiorna la pagina per pulire gli oggetti che non servono
      		$('#login-button').show();
       	}, 2000 );
       	
    }
});







Template.temporary_login.events({
 
 	"click .swatch": function() {
    	Session.set("color", this.name);
  	},

    'click button.login-mode' : function(e, t){  //login
    	
    	e.preventDefault(); //  ???

      	//estraggo il nome dal form di login
    	var username = t.find('#login-username').value;
    	 
    	if (username.replace(/ /g, '') == "" || t.find('#rooms').value == 'default') {  //verifico che il nome non sia una sequenza di spazi
    		alert("inserisci username e seleziona la room");
    	} else {
    		// l'id temporaneo è costruito dall'username eliminando gli spazzi e aggiungendo '_id' in coda
    		var user_id = username.replace(/ /g, '')+ "_id";
    		if (typeof(Players.findOne(user_id)) != 'undefined'){
    			alert('utente ESISTENTE');
    		}else{;
				Session.set("mode", "scenaMode"); //si cambia il template 
				//Session.set("utente", username); 
				
				
				 //posizione iniziale della videocamera first-person
				var y_view = "2.5";
				var fp_view = "0";
				//posizione iniziale player
 				var x = "3";
 				var y = "0";
 				var z = "0";
 				var color = Random.choice(colors[Session.get("color")]);
				var room_id = t.find('#rooms').value;
				
				Meteor.call('insertPlayer', room_id, user_id, username, x, y, z, color, y_view, fp_view);
				
				Session.set("user_id", user_id); 
				Session.set('room_id', room_id);
				
				Meteor.loginWithGoogle({
  					requestPermissions: ['profile']
					}, function (err) {
  						if (err)
    						Session.set('errorMessage', err.reason || 'Unknown error');
				});
			}
       	}
       	
      },
      
      'click #room-button' : function(e, t){
    	
    	e.preventDefault(); //  ???
      	var roomname = t.find('#room-name').value;
    	 
    	if (roomname.replace(/ /g, '') == "") {  //verifico che il nome non sia una sequenza di spazi
    		alert("inserisci il nome della Stanza");
    	} else {
    		// l'id temporaneo è costruito dall'username eliminando gli spazzi e aggiungendo '_id' in coda
    		var room_id = roomname.replace(/ /g, '')+ "_id";
    		if (typeof(Rooms.findOne(room_id)) != 'undefined'){
    			alert('Stanza ESISTENTE');
    		}else{;
				 
				//viene creata la room con gli oggetti e le attività associate
				Meteor.call('insertRoom', room_id, roomname);
				Meteor.call('insertObject', 'lavagna', room_id);
				Meteor.call('insertActivity', 'quiz', room_id);
				//Session.set('room_id', room_id);
				
			}
       	}
       	
       	
     	t.find('#room-name').value = "";
     	
     	
		},
      
       'click #prova' : function(e, t){
       
       		Meteor.call('prova');
       		
       		
       		//Meteor.call('insertLog');
       		/*
       		var player = Players.findOne({nome: 'AAA', room: 'GSA_id'});
       		console.log(player.nome+' , '+player.room)
       		
       		
       		var stanze = Rooms.find({});
			stanze.forEach(function (post) {
  				console.log("Nome stanza: "+ post._id );
			});
       		
       		var oggetti = Objects.find({});
			oggetti.forEach(function (post) {
  				console.log("ID oggetti: "+ post._id );
			});
       		
  			var room = t.find('#rooms').value;
  			
     		alert(room);
     		*/
		}
  });
  
  
  






Template.temporary_login.helpers({


  // list of colors for color picker
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

	roomSelected: function() {
		return $('#rooms').value;
	},
	
	rooms: function () {
    	return Rooms.find();
    },
    
    activeRoom: function () {
    	return Rooms.find({_id: Session.get("room_id")});
  	}

});



  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  