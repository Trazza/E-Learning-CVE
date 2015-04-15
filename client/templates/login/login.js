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



Template.temporary_login.events({
 
 	"click .swatch": function() {
    	Session.set("color", this.name);
  	},

    'click button.login-mode' : function(e, t){  //login
    	
    	e.preventDefault(); //  ???
      
      	//estraggo il nome dal form di login
    	var username = t.find('#login-username').value;
    	 
    	if (username.replace(/ /g, '') == "") {  //verifico che il nome non sia una sequenza di spazi
    		alert("inserisci username");
    	} else {
    		// l'id temporaneo è costruito dall'username eliminando gli spazzi e aggiungendo '_id' in coda
    		var user_id = username.replace(/ /g, '')+ "_id";
    		if (typeof(Players.findOne(user_id)) != 'undefined'){
    			alert('utente ESISTENTE');
    		}else{;
				Session.set("mode", "scenaMode"); //si cambia il template 
				Session.set("utente", username); 
				Session.set("user_id", user_id); 
				
				 //posizione iniziale della videocamera first-person
				var y_view = "2.5";
				var fp_view = "0";
				//posizione iniziale player
 				var x = "3";
 				var y = "0";
 				var z = "0";
 				var color = Random.choice(colors[Session.get("color")]);
				
				
				Meteor.call('insertPlayer', user_id, username, x, y, z, color, y_view, fp_view);
				
				
				/*
				Players.insert({  	//inserisco nome utente e id nella collection
 	        		nome: username,
    	      		_id: user_id,
    	      		y_view: y_view,
    	      		fp_view: fp_view,
    	      		x: x,
    	      		y: y,
    	      		z: z,
    	      		color: color,
    	      		quiz: null
        		});
				*/
			}
       	}
       	
      }
  });
  
  
  Template.temporary_logout.events({

    'submit #temporary_logout_form' : function(e, t){
    e.preventDefault(); //  ???
      
      	//estraggo il nome dal form di login
    	
		Session.set("mode", "login");
		Session.set("utente", "Non sei loggato");
		$("#nome_utente_log").empty();
		
		Meteor.call('removePlayer',Session.get('user_id'));
		//Players.remove(Session.get('user_id'));
      
       
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


});