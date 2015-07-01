
//****************************************************
//
//	http://docs.meteor.com/#/full/publishandsubscribe
//
//****************************************************


//pubblico anche l'insieme di informazioni ricavate dal google account
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish("objects", function () {
  //return Objects.find({room: Players.findOne(this.userId()).room, scene: Players.findOne(this.userId()).scene});
  return Objects.find({});
});

Meteor.publish("uploads", function () {
  return Uploads.find({});
});

Meteor.publish("alerts", function () {
  //return Alerts.find({room: Players.findOne(this.userId()).room});
  return Alerts.find({});
});

Meteor.publish("rooms", function () {
  return Rooms.find({});
});

Meteor.publish("scenes", function () {
  //return Scenes.find({id: Players.findOne(this.userId()).scene});
  return Scenes.find({});
});

Meteor.publish("players", function () {
  //if (Meteor.userId()){
  //  return Players.find({room: Players.findOne(Meteor.userId()).room, scene: Players.findOne(Meteor.userId()).scene});
  //} else {
      return Players.find({});
  //}
  
});










//*********************************************************************************************
// 
//  https://github.com/mizzao/meteor-user-status
//
//  la funzione serve a verificare se l'utente, anche se loggato, è connesso al gioco,
//  in quanto il login può rimanere anche se l'utente non è connesso al portale (tipo facebook)
//
//*********************************************************************************************

Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    console.log("-----------------------------------");
    console.log('ON');
    console.log(user._id);
  },
  removed: function(user) {
    if (typeof user._id != 'undefined'){
          console.log("-----------------------------------");
          console.log('OFF');
          console.log(user._id);
          //Meteor.call('updatePlayer', id._id, null, null, null);

          Players.findOne(user._id).set(null, null, null);  //questo metodo può generare errore al logout in quanto la collection Players potrebbe aggiornarsi dopo il controllo  ._id != undefined
    }
  }
});



if (Meteor.isServer) {



	Meteor.methods({
	

		'prova': function(){
      console.log("-----------------------------------");
      console.log("Numero user loggati: "+Meteor.users.find().count());
      console.log(Meteor.users.findOne());
			//console.log(Meteor.user().services.google.name);
			//Meteor.log.info('prova logfile');
  			return;
  		},	
		
		'reset': function(){
			Meteor.call('removeAllPlayers');
			Meteor.call('removeAllObjects');
			Meteor.call('removeAllAlerts');
			Meteor.call('removeAllRooms');
      Meteor.call('removeAllScenes');
  			return;
  		},	
  		
      /*
   		'show': function(){
        		console.log(Meteor.user().services);
        		console.log('nome: '+ Meteor.user().services.google.name);
        		console.log('email: '+ Meteor.user().services.google.email);
    	},
      */

// ------------ PLAYERS -------------------------
		
		//********************* insertPlayer *****************************
		//
		//	inserisce un nuovo utente nella collezione Players
		//
		//****************************************************************
		'insertPlayer': function(){

  			return Players.insert({  
                _id: Meteor.userId(),	                       // ID utente 	
                room: null,			                             //	sessionId  sessione attuale del player
                scene: null,			                           //	scena attuale del player 
 	        		  nome: Meteor.user().services.google.name, 	 // nome (ricavata da login di google)
    	      		x: null,					                           // posizione dell'avatar sull'asse x
    	      		z: null,                                     // posizione dell'avatar sull'asse z
                r: null,					                           // grado di rotazione dell'avatar    
                cam: null,                                   // inquadratura 
    	      		color: null,			                           //	colore dell'avatar
    	      		activityName: null, 			                   //	attività collaborativa attualmente svolta dal player (es. quiz)
        		    activityType: null                           // Tipo di attivita collaborativa svolta dall'avatar
            });
        		
		},

		'removeAllPlayers': function() {
			return Players.remove({});
		},
		
		
//------------- UPLOADS ---------------
	
		'uploadInsert': function(fileInfo){
			console.log(fileInfo);
  			return Uploads.insert(fileInfo);
  		},
	
	
		'deleteFile': function(_id) {
    		check(_id, String);

    		var upload = Uploads.findOne(_id);
    		if (upload == null) {
     	 		throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
    		}

    		UploadServer.delete(upload.path);
    		Uploads.remove(_id);
  		},
  
		
  
  		'clearUpload': function(id){
  			return Uploads.remove(id);
  		},
  
  		'UploadsNumber': function(){
  			return Uploads.find().count();
  		},
  
  		
	
	
	
// ---------------- ALERTS ---------------
    
		'insertActivity': function(session, name, type){
			
			return Alerts.insert({
					room: session,			// 	sessionId
					name: name,			    //	nome dell'attività collaborativa svolta (es. quiz sulle capitali)
					type: type,         //  tipo di attività (es. quiz)
          value: false		    //  quando settato a true scatena l'evento associato su tutti client
				});
		},

		
		'removeAllAlerts': function() {
			return Alerts.remove({});
		},
	
	
	
	
// -------------------- OBJECTS -----------------------------------
	
		
	
		'insertObject': function(room, scene, name, event, action, attr, succF, succA, failF, failA, x, z ){

				return Objects.insert({
					room: room, 	    // sessionId: id della sessione in cui è caricato
					scene: scene, 	  // id della scena in cui è caricato 
					name: name, 	    // nome del file.x3d che rappresenta l'oggetto
          event: event,     // il trigger (es. click)
          action: action,   // funzione scatenata dall'evento
          attr: attr,       // attributo dell funzione action
          succF: succF,     // funzione eseguita al successo dell'evento
          succA: succA,     // attributo della funzione nel caso di successo
          failF: failF,     // funzione eseguita in caso di fallimento dell'evento
          failA: failA,     // attributo della funzione nel caso  di insuccesso
					x: x,       	    // posizione sull'asse X
					z: z,			        // posizione sull'asse Z
					img_path: '/default_img/quiz.jpg' // indica immagini per la personalizzazione degli oggetti

				});
				
		},
		
  		
  		'changeImgLavagna': function(room, path){
    			
    			console.log('set Lavagna img');
    			
    			return Objects.update(
    						{ name: 'lavagna', room: room}, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								img_path: path, 
    							}
    						}
    			);
    
    	},
    	
    	'removeAllObjects': function() {
			return Objects.remove({});
		},
    	
// ---------------------- ROOMS ---------------------------------
		//*************** insertRoom ************************
		// crea una nuova sessione nella collection 
		//****************************************  
		'insertRoom': function(session, userId, pass, title, description, path, MD5){
     		return Rooms.insert({
        
        				session: session,          	//  sessionID
        				userId: userId,            	//  google account (gmail) di chi ha creato il progetto 
        				pass: pass,                	//  password per accedere al mondo virtuale
        				title: title,              	//  titolo del progetto   
        				description: description,  	//  descrizione
        				path: path,                	//  nome del file xml
       					MD5: MD5,                  	//  estratto dal xml, serve per verificare se il file è stato modificato
        				loaded: false,				      //	indica se il mondo virtuale è attivo (gli oggetti caricati nella collection)
        				enable: true             	  //  utilizzato al momento della verifica 
                                           	//        per la coerenza dati tra file e i dati corrispondenti nella collection
      				}); 
  		},

    	
    	'removeAllRooms': function() {
			 return Rooms.remove({});
		  },

  //------------------- Scenes --------------------------------------

      'insertScene': function(id, session, title, descr, stage){
        return Scenes.insert({
                id: id, 
                room: session,     // Id della sessione a cui appartiene la scena 
                title: title,      // titolo della scena   
                descr: descr,      // Descrizione della scena 
                stage: stage       // nome del file.x3d che rappresenta lo stage della scena
        
        }); 
      },

      'removeAllScenes': function() {
        return Scenes.remove({});
        
      },

//----------------------------------------------------------------------------------------------------------
		//****************************************************************
		// Riferimrnti: 
		//		Use Npm Modules with Your Meteor App
		//			https://github.com/meteorhacks/npm
		//
		//		Async & Meteor:
		//			http://phucnguyen.info/blog/everything-you-need-to-know-about-async-meteor/
		//			
		//*********************************************************************

      //************** generator ************************************************
      // popola le collezioni Objects, Scenes con gli dati del configuratore passato (nameFile)
      //***************************************************************************

      'generator': function (nameFile) {
          console.log('-- generator --');
          
          console.log(nameFile);

          var xmlFile = Meteor.call('xmlLoader', 'xml/'+nameFile);  
          var jsonFile = Meteor.call('jsonParser', xmlFile);
          Meteor.call('jsonSceneLoad', jsonFile);
      
      },

		//******************** xmlLoader ************************************
  		// ritorna il testo dal file della path
  		// 
  		// Future() è necessario per sincronizzare la funzione
  		//*******************************************************************
  		'xmlLoader': function(path) {
      		// load Future

		    console.log('-- xml_loader --');
      
    		Future = Npm.require('fibers/future');
    		var myFuture = new Future();
       
      		// call the function and store its result
      		Assets.getText(path, function (error,results){
       			if(error){
          			console.log('ERROR: xml_loader');
          			myFuture.throw(error);
        		}else{
          			myFuture.return(results);
        		}
      		});
      		return myFuture.wait()

  		},


  		//******************** jsonParse ************************************
  		// ritorna il testo in formato JSON
  		// xml2js è un modulo di Node.js (quindi asincrono): 
  		//    - per essere utilizzato deve essere integratyo in meteor (vedi packages)
  		//    - Future() è necessario per sincronizzare la funzione con Meteor
  		//
  		// Riferimenti: 
  		//		xml2js: http://www.ecofic.com/about/blog/node-load-xml-file-with-xml2js		
  		//*******************************************************************
  		'jsonParser': function(xmlFile) {

      		console.log('-- json_parser --');

      		var xml2js = Meteor.npmRequire('xml2js');
      		var parser = new xml2js.Parser();

      		Future = Npm.require('fibers/future');
      		var myFuture = new Future();
      
      		parser.parseString(xmlFile, function (error,results){
        		if(error){
         	 		console.log('ERROR: json_parser');
          			myFuture.throw(error);
        		}else{
          			myFuture.return(results);
        		}
      		});

      		try { // errore se la struttura dell'xml non è corretta
        		return myFuture.wait()
      		} catch (err) {
         		console.log(err);
      		}    
  		},


  		//***************** listFile ********************************************
  		// Restituisce la lista di file nella path
  		//**************************************************************************
  		'listFiles': function(path) {
      		console.log('-- listFile -- ');

      		var fs = Meteor.npmRequire('fs');
      		var listF = fs.readdirSync(path);

      		console.log('Numero file xml: '+ (listF.length - 1)); // -1 in quanto di default esiste un file nascosto del framework
      		return listF;
    	},


    	//***************** jsonRoomLoad *****************************************
  		// estrae le informazioni dal json e carica la collection Rooms con le informazioni
  		//
  		// 'verifyUndef' effettua il controllo su ogni dato per verificare se è undefined
  		//  se 'verify' != 0 si è verificato un errore nella lettura e alcuni dati sono undefined 
  		//
  		//  id, userId, pass, title, descr, path, enable
  		//********************************************************************

  		'jsonRoomLoad': function(jsonText, nameFile, MD5) {
        	console.log('-- jsonRoomLoad --');

        	//ritorna 1 se il dato estratto è 'undefined' 
        	function verifyUndef(tag, data){
            	console.log(tag+': '+data);
            	if ( typeof data == 'undefined' ){
            	    return 1;               
            	} else {
            	    return 0;
            	}
        	};


        	var verify = 0; 

        	var session = jsonText.project.about[0].session[0].sessionId;
        	verify += verifyUndef('sessionId',session);

        	var pass = jsonText.project.about[0].session[0].password;
        	verify += verifyUndef('password',pass);
        

        	var userId = jsonText.project.about[0].creator[0].userId;
        	verify += verifyUndef('userId', userId);

        	var title = jsonText.project.about[0].title;
        	verify += verifyUndef('title', title);

        	var description = jsonText.project.about[0].description;
        	verify += verifyUndef('description', description);

        	console.log('path: '+nameFile);
        	var path = nameFile;

        	console.log('MD5: '+MD5);
            
        	if (verify == 0) { 
            	console.log('Verificare se esiste già la sessione caricata: '+Rooms.findOne({session: session}));
            	if ( typeof Rooms.findOne({session: session}) != 'undefined'){
             		console.log('il file session: "'+ session+'" esiste già');
            		console.log('update...');
            		Meteor.call('updateRoom', session, userId, pass, title, description, path, MD5);

            	} else {
            		Meteor.call('insertRoom', session, userId, pass, title, description, path, MD5);
            		console.log('Inserimento...');
            	}  
            	return 0; 
        	} else {
            	console.log('ERRORE: alcuni dati non sono stati trovati');
            	return 1; 
        	}
  		},


  		//*************** consistenceFile **********************************************************************
  		// verifica la consistenza dei file xml presenti nella path con i dati corrispondenti caricati nella collection Rooms
  		//
  		// - viene settato a false il campo enable di ogni elemento della collezione Rooms
  		// - viene passata la lista completa dei nomi dei file nella path degli xml
  		// - per ogni file:
  		//      - si verifica che sia un file .xml
  		//      - si estrae il testo xml dal file 
  		//      - si calcola l'MD5 dal testo xml e si cerca l'elemento con il medesimo MD5 nella Collection
  		//          - Se vi è una corrispondenza viene settato il campo enable dell'elemento a 'true'
  		//          - Se NON vi è corrispondenza viene richiamata la funzione per l'inserimento o la modifica dell'elemento
  		//            (Sia nell'inserimento che nelle modifica il campo enable viene settato a 'true')
  		// - vengono eliminati tutti gli elementi della collection Rooms che hanno il campo enable = false 
  		//    (ovvero quelli che non hanno corrispondenze con un file)  
  		//
  		// Riferimenti: https://atmospherejs.com/jparker/crypto-md5  (pacchetto per il calcolo dell'MD5)
  		//********************************************************************************************************     
  		'consistenceFiles': function(listF) {

    		//setto enable = false per tutti gli elementi della collezione 
    		Rooms.update({},  
        	  	{$set: 
        	    	{enable: false}
        	  	}
    		);

    		listF.forEach(function(nameFile){
        		console.log('-- loadFile: '+nameFile+' --');
        	  	// verifico che sia un file formato .xml
        	  	if ( nameFile.indexOf('.xml') > -1 ){  //la stringa String(name) contiene la stringa '.xml'
        	      	//estraggo il testo xml
        	      	var xmlFile = Meteor.call('xmlLoader', 'xml/'+nameFile);             

              		//calcolo l'MD5
              		var md5 = CryptoJS.MD5(xmlFile).toString();
              		console.log('Room MD5: '+Rooms.findOne({ MD5: md5}));
              		//verifico che esista l'elemento che si riferisce al file con lo stesso MD5
              		if ( typeof Rooms.findOne({ MD5: md5}) != 'undefined'){
                	  	console.log('MD5 file: "'+nameFile+'" OK');  
                	 	Rooms.update(
                       		{ MD5: md5},
                       		{$set: 
                        	    {enable: true}
                    	    }
                		);
              		} else { 
                  		console.log('file "'+ nameFile+'" INSERT/Upload');
                  		var jsonFile = Meteor.call('jsonParser', xmlFile);
                  		Meteor.call('jsonRoomLoad', jsonFile, nameFile, md5);
            	  	};
        		} 
    	 	});
	
      		Rooms.remove({enable: false});
		  },



      //********************** jsonSceneLoad ***********************************
      // Carica le Collection Scenes e Objects con i vari dati estratti dall'xml
      //*************************************************************************  


      'jsonSceneLoad': function (jsonText) {
          console.log('-- jsonSceneLoad --');

          //ritorna 1 se il dato estratto è 'undefined' 
          function verifyUndef(tag, data){
              console.log(tag+': '+data);
              if ( typeof data == 'undefined' ){
                  return 1;               
              } else {
                  return 0;
              }
          };


          var session = jsonText.project.about[0].session[0].sessionId;
          if ( (verifyUndef('sessionId',session))) {
              console.log('sessionId non trovato');
              return;
          };
          

           
          var numScenes = jsonText.project.acts[0].act[0].scenes[0].scene.length
          console.log('numero scene: '+numScenes);

          for (i=0; i < numScenes; i++){
              var verify = 0; 

              var title =   jsonText.project.acts[0].act[0].scenes[0].scene[i].title;
              console.log('------------ '+title+' -----------------');
              verify += verifyUndef('title',title);

              var id_scene =   jsonText.project.acts[0].act[0].scenes[0].scene[i].id_scena;
              verify += verifyUndef('id_scena',id_scene);

              var description =   jsonText.project.acts[0].act[0].scenes[0].scene[i].description;
              verify += verifyUndef('description',description);

              var stage =   jsonText.project.acts[0].act[0].scenes[0].scene[i].stage;
              verify += verifyUndef('stage',stage);

              if (verify == 0) { 
                  console.log('Dati Scena ok: inserimento');
                  //'insertScene': function(id,        session, title, descr,      stage)
                  Meteor.call('insertScene', id_scene, session, title, description, stage);
              } else {
                  console.log('ERRORE: alcuni dati non sono stati trovati. Errore nella struttura XML');                
              }

              numElements = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor.length
              console.log('numero ELEMENTI: '+numElements);

              for (j=0; j < numElements; j++){
                  console.log('-----------------------------');

                  var name = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].name;
                  verify += verifyUndef('Object name',name);

                  var position_x = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].position_x;
                  verify += verifyUndef('Object position_x',position_x);

                  var position_z = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].position_z;
                  verify += verifyUndef('Object position_z',position_z);

                  var event = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].event;
                  verify += verifyUndef('Object event',event);

                  var action = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].action[0].type;
                  verify += verifyUndef('   action',action);

                  var attribute = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].action[0].attribute;
                  verify += verifyUndef('   attribute',attribute);

                  var successType = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].action[0].success[0].successType;
                  verify += verifyUndef('       successType',successType);

                  var successAttribute = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].action[0].success[0].successAttribute;
                  verify += verifyUndef('           successAttribute',successAttribute);

                  var failureType = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].action[0].failure[0].failureType;
                  verify += verifyUndef('       failureType',failureType);

                  var failureAttribute = jsonText.project.acts[0].act[0].scenes[0].scene[i].metaphors[0].metaphor[j].element[0].action[0].failure[0].failureAttribute;
                  verify += verifyUndef('           failureAttribute',failureAttribute);

                  if (verify == 0) { 
                      console.log('Dati oggetto ok: inserimento');
                        //insertObject': function(room,    scene,    name, event, action, attr,      succF,        succA,            failF,        failA,          x,            z )
                      Meteor.call('insertObject', session, id_scene, name, event, action, attribute, successType, successAttribute, failureType, failureAttribute, position_x, position_z ); 
                    
                  } else {
                      console.log('ERRORE: alcuni dati non sono stati trovati. Errore nella struttura XML');
                      
                  }

              }
              console.log('-----------------------------');
          }
          
            
          
      }
      

	}); // fine methods
	
	
	




  //------------------------------------------------------------------------------------------------------------------
	Meteor.startup(function() {
	
			console.log('Restart...');
		
  }); //end 'Meteor.startup'  
  //------------------------------------------------------------------------------------------------------------------


} //end 'Meteor.isServer'













