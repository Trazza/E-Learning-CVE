
if (Meteor.isClient) {	
	Meteor.methods({

		'GoToScene': function(scena, succF, succA, failF, failA){

		    console.log('GoToScene: '+scena);
        //Meteor.call('scenePlayer', scena);

  	},	


  	'GoToWebPage': function(pagina, succF, succA, failF, failA){

		alert('GoToWebPage: '+pagina);

  	},	

  	'FileFromUser': function(text, succF, succA, failF, failA){

		alert('FileFromUser: '+text);

  	},	

  	'GoToTable': function(scena, succF, succA, failF, failA){

		alert('Funzione "GoToTable"...?????????? che cosa significa?');

  	},	

  	'GoToQuiz': function(text, succF, succA, failF, failA){
		    var r = confirm('GoToQuiz: '+text);
  	    if (r == true) {
         		alert('SuccesType: '+ succF+'\nSuccesAttribute: '+ succA);
		    } else {
        		alert('failureType: '+ failF+'\nfailureAttribute: '+ failA);
   	 		}
  	},	

    'MessageToUser': function(text, succF, succA, failF, failA){

        alert('MessageToUser: '+text);

    },  




		//**************** findEvent ********************************************************
		// richimato con "onload" al caricamento dell'oggetto nel mondo virtuale  (in x3d.html)
		// richiama con l'event corretto la funzione associata all'oggetto (tutte le finzioni associabili agli oggetti sono in 'function.js')
		'findEvent': function(id, event, action, attr, succF, succA, failF, failA){
			//document.getElementById("stage_id").addEventListener("click", alert('click'));
			switch (event){
				case 'click':
					document.getElementById(id).onclick = function() { Meteor.call(action, attr, succF, succA, failF, failA)};
					break; 
			}
			
		},
	
		'onLoadX3d': function(){

			console.log('ON LOAD');
			Session.set('room', Players.findOne(Meteor.userId()).room );
            Session.set('scene', Players.findOne(Meteor.userId()).scene);
            console.log('Sessione: '+Session.get('room'));
            console.log('Scene: '+Session.get('scene'));
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
		
		'GoToScene': function(scena, succF, succA, failF, failA){

		    
        Meteor.call('scenePlayer', scena);

  	},	
		
		setImgLavagna: function () {
    	},
		
		all_players_color: function (id, color) { 			
  		},
  			
  		finestra: function () {
    	},
	})
}

