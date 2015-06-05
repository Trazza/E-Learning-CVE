(function(){
if (Meteor.isClient) {	
	Meteor.methods({
		

    


	
		'onLoadX3d': function(){

			console.log('ON LOAD');
			Session.set('room', Players.findOne(Meteor.userId()).room );
            Session.set('scene', Players.findOne(Meteor.userId()).scene);
            console.log('Sessione: '+Session.get('room'));
            console.log('Scene: '+Session.get('scene'));
  		},	

  		'onLoadPlayer': function(){
  			console.log('onLoadPlayer');
			document.getElementById(Players.findOne(Meteor.userId()).cam+Meteor.userId()).setAttribute('set_bind','true');
  		},	
	
		'prova': function(){
			alert('prova');
  		},	
	
	

  		'all_players_color': function (id, color) {
  			console.log(id+' --> '+color);
  			document.getElementById(id+'__Legs').setAttribute('diffuseColor', color);
  		},
	
	
		'finestra': function () {
				AntiModals.overlay('finestra_template', {
    	  					modal: true,
    	  				});
				console.log("Click lavagna da "+ Session.get('user_id'));
			
    	},
    	
    	'setImgLavagna': function () {
    	
    		window.setTimeout( function () {
    				
    				var lavagna = Objects.findOne({name: 'lavagna', room: Session.get('room_id')});
					var img_path = lavagna.img_path;
					console.log('img_path = '+ img_path);
					document.getElementById('lavagna__img_lavagna').setAttribute('url', '/uploads/'+img_path);
					
					}, 2000 );
			
    	},
    	
    	
    
    
    	
	});
	
	
	
	
	/*
	Accounts.onLogin(function() {
  		console.log("I just logged in.");
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
  		
	});
	*/
	/*  //NON riconosce la funzione
	Accounts.onLogout(function() {
  		console.log("I just logged out.");
	})
	
	Accounts.validateLoginAttempt(function() {
	
	
	});
	*/ 
}


	
if (Meteor.isServer) {
	Meteor.methods({
		// Uploads methods
 
		
		setImgLavagna: function () {
    	},
		
		all_players_color: function (id, color) { 			
  		},
  			
  		finestra: function () {
    	},
	})
}


})();
