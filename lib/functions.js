





//************** function.js ****************************
// tutte le azioni che possono essere associate agli oggetti
//****************************************************

if (Meteor.isClient) {	
	Meteor.methods({
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


		'GoToScene': function(scena, succF, succA, failF, failA){

			    console.log('GoToScene: '+scena);
			 //Players.findOne(Meteor.userId()).setScene(scena);
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

  		'GoToQuiz': function(quiz, succF, succA, failF, failA){
  	
  		},	

    	'MessageToUser': function(text, succF, succA, failF, failA){

       		alert('MessageToUser: '+text);
    	},  

		

	})
}

if (Meteor.isServer) {
	Meteor.methods({

		'GoToQuiz': function(nameQuiz, succF, succA, failF, failA){
			var session = Players.findOne(Meteor.userId()).room;

			if ( typeof Alerts.findOne({name: nameQuiz, room: session}) == 'undefined'){
				console.log('Quiz: '+nameQuiz+' ...Inserimento...');
				Meteor.call('insertActivity', session, nameQuiz, 'quiz');
			} else {
				console.log('Quiz: '+nameQuiz+' ...DEFINITO');
			}
   	 		//Meteor.call('setActivity', session, nameQuiz, 'quiz', true);
   	 		Alerts.findOne({room: session, name: nameQuiz, type: 'quiz'}).set(true);
   	 		
  		},	
		
  		//TODO: sarebbe opportuno che a ogni scena sia associato un punto di rigenerazione compatibile
		'GoToScene': function(scena, succF, succA, failF, failA){
				console.log('userId: '+Meteor.userId());
				Players.findOne(Meteor.userId()).setScene(scena);
        		//Meteor.call('scenePlayer', scena);
		}	
		
		
	})
}