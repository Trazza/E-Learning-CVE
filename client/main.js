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


// set initial color
Session.set("color", "brown");

// set initial mode to view
Session.set("mode", "login");


Tracker.autorun(function () {
  Meteor.subscribe("players");
  Meteor.subscribe("alerts");
  //console.log(Players.find({quiz: 'quiz' }).count() + " stanno eseguendo il quiz");
});

/*
var active_quiz = Alerts.findOne('quiz_id').value;
var handle_active_quiz = active_quiz.observeChanges({
	if (active_quiz == true) {
		
		Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: 'quiz', 
    						}
    					}
    	)
    	
    	//Meteor.call('quiz');
    	AntiModals.overlay('quiz_template', {
      			modal: true,
      		});
	}
});

*/

var quiz_for_all = Alerts.find({value: true});
var handle_quiz_for_all = quiz_for_all.observeChanges({
	added: function (id, user) {
	
				console.log("ALERT: '"+ user.name + "' --> è stato attivato");
				if (typeof(Session.get('user_id')) != 'undefined') {
					
					console.log("Update Player.quiz to 'quiz'...");
					console.log("1) Players.findOne(Session.get('user_id')).quiz = "+ Players.findOne(Session.get('user_id')).quiz);
					Players.update(
    						{ _id: Session.get('user_id') }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								quiz: "quiz", 
    							}
    						}
    				);
					console.log("2) Players.findOne(Session.get('user_id')).quiz = "+ Players.findOne(Session.get('user_id')).quiz);
					console.log("finestra modale...");
					AntiModals.overlay('quiz_template', {
      					modal: true,
      				});
      			}
			},
	removed: function () {
				console.log("ALERT: '"+ user.name + "' --> disattivato");
			}
		
});

var on_players_quiz = Players.find({quiz: 'quiz'});
var handle_quiz_server = on_players_quiz.observeChanges({
	removed: function () {
				console.log("REMOVED: "+Players.find({quiz: 'quiz' }).count() + " stanno eseguendo il quiz ");
			
				
			},
	added: function (id, user) {
			console.log("ADDED: "+ Players.find({quiz: 'quiz' }).count() + " stanno eseguendo il quiz");
			}
		
});

Meteor.methods({
  	all_players_color: function (id, color) {
  		console.log(id+' '+color);
  		document.getElementById(id+'__Legs').setAttribute('diffuseColor', color);
  	},
	

	quiz: function () {
	
			console.log("Click lavagna da "+ Session.get('user_id'));
			
    }
    
    
});




// this uses the Shark branch of Meteor, hence the UI namespace
UI.body.helpers({

	players: function () {
    	return Players.find();
  	},
  
  
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
  // see if we are in login mode
  loginMode: function () {
    return Session.equals("mode", "login");   
  }
});

// events on the dialog with lots of buttons
UI.body.events({
  "click #start_quiz": function(e, t) {
		if (Session.get("mode") != "login") {
			if (Alerts.findOne({name: 'quiz'}).value == false ) {	
    			console.log("1) Start_quiz: Alerts.findOne(quiz_id).value = "+ Alerts.findOne('quiz_id').value);
    			console.log("Update Alert.quiz.value to 'true'...");
    			Alerts.update(
    						{ _id: 'quiz_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								value: true, 
    							}
    						}
    			);

  				console.log("2) Start_quiz: Alerts.findOne(quiz_id).value = "+ Alerts.findOne('quiz_id').value);
  			}
  		}else{
  			alert("ti devi loggare");
  		};
       
  },	
  "click #prova": function(e, t) {
  		console.log('Prova');
  		Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: 'quiz', 
    						}
    					}
    		)
       
  },
	
  "click .clear-boxes": function () {
    Meteor.call("clearBoxes");
  },
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
   if (Session.get("mode") != "login") {
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
			
			}	
	}
  }
});



Template.quiz_template.events({
	"click #esci_quiz": function(e, t) {
		console.log("Update Player.quiz to 'null'...");
    	Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: null, 
    						}
    					}
    	)
    	
    	 AntiModals.dismissAll();
  		
  		if (Players.find({quiz: 'quiz' }).count() == 0) {
					console.log("Players.find({quiz: 'quiz' }).count() == "+ Players.find({quiz: 'quiz' }).count());
					console.log("1) Alerts.findOne('quiz_id').value = "+ Alerts.findOne('quiz_id').value);
					console.log("Update Alert.quiz.value to 'false'...");
					
					Alerts.update(
    					{ _id: 'quiz_id' }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							value: false, 
    						}
    					}
    				);
    				console.log("2) Alerts.findOne('quiz_id').value = "+ Alerts.findOne('quiz_id').value);
				}
				
       console.log('Esci_quiz');
  },
  
});
