// each color has a list so that we have a little variation
var colors = {
  brown: ["#c2892b", "#af7c27", "#b57813"],
  red: ["#e91d45", "#e91d22", "#e60f3d"],
  green: ["#30d02c", "#26bf22", "#30c12d"],
  blue: ["#1d57e9", "#194dd1", "#1d68d9"],
  purple: ["#9414c9"],
  milk: ["#999999"],
  yellow: ["#fee619"]
};



Session.set("color", "brown"); // set initial color
//Session.set("mode", "login"); // set initial mode to view


//********************************************************
//
//  http://docs.meteor.com/#/full/publishandsubscribe
//
//**********************************************************
Tracker.autorun(function () {
    Meteor.subscribe('uploads');
    Meteor.subscribe("objects");
  	Meteor.subscribe("players");
  	Meteor.subscribe("alerts");
  	Meteor.subscribe("rooms");
    Meteor.subscribe("scenes");
  
});









// ******************* Activity *************************************************************

//Vengono osservate le modifiche sulla collection Alerts
//Se il valore value passa da false a true viene scatenato l'evento associato (VEDERE: cursor.observeChanges()) 


var activity_for_all = Alerts.find();

var handle_activity_for_all = activity_for_all.observeChanges({ 
	changed: function (id, activity) { 
		var activ = Alerts.findOne(id)
		console.log('change:'+ id + '  activ.name:' + activ.name + ' value:'+ activ.value + ' room:' + activ.room);
		console.log('Session.get(room_id) = '+ Session.get('room_id'));
		console.log('activity.room = '+ activ.room);
		//verifichiamo il tipo di evento scatenato
		switch (activ.name){
			case 'quiz':
				if(activ.value == true){
				
					if (typeof(Session.get('user_id')) != 'undefined' && Session.get('room_id') == activ.room) {
						
						//
						console.log('imposta quiz');
						Meteor.call('setPlayerActivity',  Session.get('user_id'), activ.name );
						/*
						AntiModals.overlay('quiz_template', {
      						modal: true,
      					});
      					*/
      				}
      			}
      			break;
      	}
	},
	
});

// Se il campo 'activity' è modificato, viene scatenato l'evento associato al nome dell'attività impostata
var players_activity = Players.find();
var handle_players_activity = players_activity.observeChanges({
	changed: function (id, user) {
		if (id == Session.get('user_id')){
			switch (user.activity){
				case 'quiz':
				
				
						//if (typeof(Session.get('user_id')) != 'undefined') {
					
							//Meteor.call('setPlayerQuiz', Session.get('user_id'), "quiz" );	
							AntiModals.overlay('quiz_template', {
      							modal: true,
      						});
      						console.log('finestramodale');
      					//}
      		
      				break;
      		}
      	}
	},
	
});



// --------------LAVAGNA --------------------------------------------------------------------------------------------------------------------------
var personalize = Objects.find();
var handle_personalize = personalize.observeChanges({
	changed: function (id, user) {
	
				console.log("OBJECT: '"+ user.name + "' --> è stato modificato");
				Meteor.call('setImgLavagna', Session.get('room_id'));
				
			},
	
		
});


//-------------------------------------------------------------------------------------------------------------------------------------------








// this uses the Shark branch of Meteor, hence the UI namespace
UI.body.helpers({
	'allPlayers': function () {
    	return Players.find({});
  	},
  	 /*
  	'objects': function () {
    	return Objects.find({room: Session.get('room_id')});
  	},
	
	'players': function () {
    	return Players.find({room: Session.get('room_id')});
  	},
  */
  
  // list of colors for color picker
  	'colors': function () {
    	return _.map(_.keys(colors), function (name) {
      		return {
        		name: name,
        		code: colors[name][0]
      		};
    	});
  	},
  // active color helper for color picker
  	'activeColor': function () {
    	return this.name === Session.get("color");
  	},
  /* // see if we are in login mode
  	'loginMode': function () {
    	return Session.equals("mode", "login");   
  	}
  */
  
  
});// end helper



// events on the dialog with lots of buttons
UI.body.events({

  "click .swatch": function () {
    Session.set("color", this.name);
  },
  "mousedown transform": function (event) {
    /*
    if (Session.get("mode") === "login") {
    	console.log("Ti devi loggare");
    } else {
      if (event.button === 1) {
        console.log(event.currentTarget.id);
      } else if (event.button === 4 || event.button === 2) {
        
        
      }
    }
    */
  },
   'keydown': function(event) {
   if (Meteor.userId() != null) {
    event.preventDefault();
    
    console.log(event.which);
    switch (event.which) {
				// TRASLAZIONE
				case 38: // freccia su
					z = String(parseFloat(Players.findOne(Session.get('user_id')).z) - 0.5);
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							z: z, 
    						}
    					}
    				)
					break;
				
				case 40: // freccia giù	
					z = String(parseFloat(Players.findOne(Session.get('user_id')).z) + 0.5);
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							z: z, 
    						}
    					}
    				)
					break;
				
				case 37: //freccia sinistra	
    				x = String(parseFloat(Players.findOne(Session.get('user_id')).x) - 0.5);
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							x: x, 
    						}
    					}
    				)	
					break;
					
				case 39: // freccia destra
					x = String(parseFloat(Players.findOne(Session.get('user_id')).x) + 0.5); 
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							x: x, 
    						}
    					}
    				)	
					break;
					
				// ROTAZIONE
				case 90: // Z
					
					break;
					
				case 67: // C
					
					break;
					
				// VIEWPOINT FIRST PERSON	
				case 81: // Q
					fp_view = String(parseFloat(Players.findOne(Session.get('user_id')).fp_view) + 0.1); 
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							fp_view: fp_view, 
    						}
    					}
    				)	
					break;
					
				case 65: // A
					fp_view = String(parseFloat(Players.findOne(Session.get('user_id')).fp_view) - 0.1); 
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							fp_view: fp_view, 
    						}
    					}
    				)	
					break;
				// VIEWPOINT		
				case 80: // P  (prima persona)
						
						document.getElementById('first-person'+Session.get('user_id')).setAttribute('set_bind','true');
						document.getElementById('viewpoint_1').setAttribute('set_bind','false');
						document.getElementById('nav_id').setAttribute('type','lookAround');
						document.getElementById('nav_id').setAttribute('explorationMode','zoom');
						
						
					break;
					
				case 79: // O  (dall'alto)
						
						document.getElementById('viewpoint_1').setAttribute('set_bind','true');
						document.getElementById('nav_id').setAttribute('type','none');
						
					break;
			
			}	
	}
  }
});



