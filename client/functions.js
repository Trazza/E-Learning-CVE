//************** function.js ****************************
// tutte le azioni che possono essere associate agli oggetti
//****************************************************

Meteor.methods({





	 'GoToScene': function(scena, succF, succA, failF, failA){

		    console.log('GoToScene: '+scena);
        Meteor.call('scenePlayer', scena);

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


});