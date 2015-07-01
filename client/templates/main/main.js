window.onbeforeunload = function(event) {
    console.log(event);
    event.returnValue = "Uscendo dalla pagina i tuoi dati di sessione verrano persi";
};


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

//TODO: filtraggi alle sottoscrizioni del server: estrarre solo i dati necessari per l'utente


Tracker.autorun(function () {
    Meteor.subscribe("userData");
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
    var user = Players.findOne(Meteor.userId());
		var activ = Alerts.findOne(id);
		console.log('change: '+ id + ' -  activ.name: ' + activ.name + ' - value: '+ activ.value + ' - room: ' + activ.room);
		console.log('Session: '+ user.room);
		console.log('activity.room:  = '+ activ.room);
		//verifichiamo il tipo di evento scatenato
		switch (activ.type){
			case 'quiz':
				if(activ.value == true){
					  if (typeof user._id != 'undefined' && user.room == activ.room) {

						    console.log('imposta quiz');
						    //Meteor.call('setPlayerActivity', activ.name, activ.type );
                user.setActivity(activ.name, activ.type);	
                AntiModals.overlay('quiz_template', {
                    modal: true,
                  });
                  console.log('finestramodale');
      		  }
      	}
      	break;
      }
	},
	
});

// Se il campo 'activity' è modificato, viene scatenato l'evento associato al nome dell'attività impostata
/*
var players_activity = Players.find();
var handle_players_activity = players_activity.observeChanges({
	changed: function (id, user) {
		if (id == Meteor.userId()){
			switch (user.activityType){
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
*/


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
        


    //************************ move ******************************
    //        cam4
    //   cam2  +  cam3
    //        cam1
        if (Meteor.userId() != null) {
            event.preventDefault();
            //console.log(event.which);
            //Meteor.call('move', event.which);
            
            var avatar = Players.findOne(Meteor.userId());
            //var cam = avatar.cam;
            //var r = avatar.r;
            //var vel = 0.5;
            //var id = 'fp_sin'+Meteor.userId();
            //var id;
            //document.getElementById(Players.findOne(Meteor.userId()).cam+Meteor.userId()).setAttribute('set_bind','true');
            switch (event.which) {
            // TRASLAZIONE
            case 38: // freccia su
                      avatar.moveUp();
                      break;
        
            case 40: // freccia giù
                      avatar.moveDown();
                      break;
          
            case 37: //freccia sinistra      
                      avatar.turnLeft();
                      break;

          
            case 39: // freccia destra
                      avatar.turnRight();
                      break;



                    
                  /* comandi per impostare l'inclintura della cam
                  case 81:// Q
                      
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      x = eval(x + ' + 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;
                  case 65: // A
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      x = eval(x + ' - 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;
                  case 87: // W y+
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      y = eval(y + ' + 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;

                  case 83: // S
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      y = eval(y + ' - 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;

                  case 69: // E
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      z = eval(z + ' + 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;
                  case 68: // D
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      z= eval(z + ' - 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;

                  case 82: // R
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      r = eval(r + ' + 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                      break;

                  case 70: // F
                      var x = String((document.getElementById(id).getAttribute('orientation')).split(' ')[0]);
                      var y = String((document.getElementById(id).getAttribute('orientation')).split(' ')[1]);
                      var z = String((document.getElementById(id).getAttribute('orientation')).split(' ')[2]);
                      var r = String((document.getElementById(id).getAttribute('orientation')).split(' ')[3])
                      r = eval(r + ' - 0.1');
                      var orient =  x+' '+y+' '+z+' '+r;
                      console.log('orientation = '+orient);
                      document.getElementById(id).setAttribute('orientation', orient);
                  */

            }
            	
        }
  }
});



