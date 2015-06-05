
//****************************************************
//
//	http://docs.meteor.com/#/full/publishandsubscribe
//
//****************************************************
Meteor.publish("objects", function () {
  return Objects.find({});
});

Meteor.publish("uploads", function () {
  return Uploads.find({});
});

Meteor.publish("players", function () {
  return Players.find({});
});

Meteor.publish("alerts", function () {
  return Alerts.find({});
});

Meteor.publish("rooms", function () {
  return Rooms.find({});
});

Meteor.publish("scenes", function () {
  return Scenes.find({});
});






if (Meteor.isServer) {



	Meteor.methods({
	
	
		'prova': function(){
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
  		
  		
  		'insertLog': function(){
  			//var fs = require('fs');
			var LOG_PATH = '/logFile.txt';
  			//fs.writeFileSync(LOG_PATH, "Prova log!");
			console.log(LOG_PATH);
			
			var fso = new ActiveXObject("Scripting.FileSystemObject");
    		var fh = fso.OpenTextFile("/logFile.txt", 8, false, 0);
    		fh.WriteLine('Prova LOG');
    		fh.Close();
    	},



   		'show': function(){
  			
			console.log('nome: '+ Meteor.user().services.google.name);
			//console.log('email: '+ Meteor.user().services.google.emails[0]);
			//console.log('email: '+ Meteor.user().services['google'].email);
			console.log('email: '+ Meteor.user().services.google.email);
			console.log('GOOGLE');
			console.log(Meteor.user().services);
			console.log('SERVICES');
			//console.log(Meteor.user().services.resume);
			console.log('_id: '+Meteor.userId());
			console.log('MyRooms: '+Rooms.find({userId: Meteor.user().services.google.email}));
    	},

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
    	      		email: Meteor.user().services.google.email,  // gmail dell'account 
    	      		x: null,					                               // posizione dell'avatar sull'asse x
    	      		z: null,
                r: null,					                               // z
                cam: null,                                 // inquadratura 
    	      		color: null,			                           //	colore scelto per l'avatar dall'utente
    	      		activityName: null, 			                   //	attività collaborativa attualmente svolta dal player (es. quiz)
        		    activityType: null
            });
        		
		},

    'updatePlayer': function(room, scene, color){

        return Players.update(
                      {_id: Meteor.userId()},
                      { $set:
                          {
                              room: room,       //  sessionId  sessione attuale del player
                              scene: scene,     //  scena attuale del player                     
                              color: color,
                              x: 3,                                        // posizione dell'avatar sull'asse x
                              z: 0,
                              r: 0,                                        // z
                              cam: 'fp1',      //  colore scelto per l'avatar dall'utente
                          }
                      }
        );
            
    },

    'scenePlayer': function(scene){
        return Players.update(
                      {_id: Meteor.userId()},
                      { $set:
                          {  
                              scene: scene,     //  scena attuale del player                     
                          }
                      }
        );
    },

    'moveX': function(value){
                Players.update(
                        { _id: Meteor.userId() }, 
                        { $set: //consente di modificare sono il parametro selezionato 
                          { 
                            x: value, 
                           }
                        }
                );
    },

    'moveZ': function(value){
                
                Players.update(
                        { _id: Meteor.userId()}, 
                        { $set: //consente di modificare sono il parametro selezionato 
                          { 
                            z: value, 
                           }
                        }
                );
    }, 

    'cangeR': function(value){
                
                Players.update(
                        { _id: Meteor.userId() }, 
                        { $set: //consente di modificare sono il parametro selezionato 
                          { 
                            r: value, 
                           }
                        }
                );
    }, 

    'cangeCam': function(value){
               
                Players.update(
                        { _id: Meteor.userId() }, 
                        { $set: //consente di modificare sono il parametro selezionato 
                          { 
                            cam: value, 
                           }
                        }
                );
    }, 

		'gAccount': function() {
			var email = Meteor.user().services.google.email;

			console.log(email);
			return typeof String(email);
		},
			
		'removePlayer': function(id){
			
  			return Players.remove(id);
  		},
			
			
		'removeAllPlayers': function() {
			return Players.remove({});
		},
		
		//
		'setPlayerActivity': function(name, type) {
			console.log('setPlayerActivity: '+ name + ' = '+ type);
			return Players.update(
    					{ _id: Meteor.userId() }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							activityName: name, 
                  activityType: type
    						}
    					}
    				)	
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

		'setActivity': function(session, name, type, value){
			console.log('setActivity: '+ name + ' = '+ value);
				return Alerts.update(
    							{ room: session, name: name, type: type}, 
    							{ $set: //consente di modificare sono il parametro selezionato 
    								{
    									value: value, 
    								}
    							}
    			);
    		
		},
		
		

		'insertActivity': function(session, name, type){
			
			return Alerts.insert({
					room: session,			// 	sessionId
					name: name,			//	nome dell'attività collaborativa svolta (es. quiz)
					type: type, 
          value: false		//	enable: quando settato a true scatena l'evento associato su tutti client
				});
		},

		
		'removeAllAlerts': function() {
			return Alerts.remove({});
		},
	
	
	
	
// -------------------- OBJECTS -----------------------------------
	
		
	
		'insertObject': function(room, scene, name, event, action, attr, succF, succA, failF, failA, x, z ){

				return Objects.insert({
					room: room, 	// sessionId: id della sessione in cui è caricato
					scene: scene, 	// indica la scena in cui è caricato 
					name: name, 	// nome dell'oggetto
          event: event,   // il trigger (es. click)
          action: action,   // funzione scatenata dall'evento
          attr: attr,       // attributo dell funzione action
          succF: succF,     // funzione eseguita al successo dell'evento
          succA: succA,     // attributo della funzione nel caso di successo
          failF: failF,     // funzione eseguita in caso di fallimento dell'evento
          failA: failA,     // attributo della funzione nel caso  di insuccesso
					x: x,       	// posizione sull'asse X
					z: z,			// posizione sull'asse Z
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
        				pass: pass,                	//  password per accedere al progetto
        				title: title,              	//  titolo del progetto   
        				description: description,  	//  descrizione
        				path: path,                	//  nome del file xml
       					MD5: MD5,                  	//  estratto dal xml, serve per verificare se il file è stato modificato
        				loaded: false,				//	indica se il mondo virtuale è attivo (gli oggetti caricati nella collection)
        				enable: true             	//  utilizzato al momento della verifica 
                                           			//        per la coerenza dati tra file e i dati corrispondenti nella collection
      				}); 
  		},


  		//TODO: quando avviene l'update bisogna eliminare gli oggetti se già caricati e sloggare gli utenti loggati all'interno
  		'updateRoom': function(session, userId, pass, title, description, path, MD5){
      		return Rooms.update(
          				{ session: session},
          				{ $set:
            				{
                				userId: userId,            	//  account di chi ha creato il progetto 
                				pass: pass,                	//  password per accedere al progetto
                				title: title,              	//  titolo del progetto   
                				description: description,  	//  descrizione
                				path: path,                	//  nome del file xml
                				MD5: MD5,                  	//  estratto dal json, serve per verificare se il file è stato modificato
                				enable: true              	//  utilizzato al momento della verifica 
                                           					//        di coerenza dati tra file e i dati corrispondenti nella collection
            				}

          				}
      				); 
  		},

      //****************************** enableRoom ********************************//
      //  Attiva e disattiva la sessione in base al campo value
      //
      // value = true
      //    - carica i dati degli oggetti in Objects (Meteor.activeRooms)
      //    - imposta a vero il campo loaded che indica se la sessione è attiva
      // value = false
      //    - elimina dalla collection Objects tutti gli oggetti della sessione
      //    - imposta a falso il campo loaded
      //***********************************************************************

    	'enableRoom': function(session, value) {
          if (value){
            Meteor.call('activeRoom', session);
            console.log('attiva');
          } else {
            Objects.remove({room: session});
            Scenes.remove({room: session});
            console.log('disattiva');
          }

          return Rooms.update(
          		    { session: session},
          				{ $set:
            				{
              	
                				loaded: value              
            				}

          				}
      		); 
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

      'removeAllSenes': function() {
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
      // TODO: caricare nella collection Scenes le scene 
      //
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
          
            
          
      },
      //**************************** activeRoom *********************************
      //  avvia la lettura del file xml corrispondente alla sessione 'session' 
      //  e il carimameto dei dati nelle collection Scenes e Objects
      //**********************************************************************
      'activeRoom': function (session) {
          console.log('-- activeRoom --');
          console.log('session: '+session);
          var nomeFile = Rooms.findOne({session: session}).path;
          console.log(nomeFile);

          var xmlFile = Meteor.call('xmlLoader', 'xml/'+nomeFile);  
          var jsonFile = Meteor.call('jsonParser', xmlFile);
          Meteor.call('jsonSceneLoad', jsonFile);
      
      }

	}); // fine methods
	
	
	




  //------------------------------------------------------------------------------------------------------------------
	Meteor.startup(function() {
	
	
		console.log('Restart....');
		
	
	
		//Per ogni stanza si verifica che siano presenti tutti gli oggetti associati
		/*
		var stanze = Rooms.find({});
		stanze.forEach(function (room) {
			console.log('verifico oggetti e attivita: stanza "'+room.name+'"');
		
			// Lavagna (object)
			if (typeof(Objects.findOne({name:'lavagna', room: room._id })) == 'undefined'){
				console.log("Lavagna NON definito: room = "+ room._id);
				Meteor.call('insertObject', 'lavagna', room.id);
			
			} else {
				console.log("Oggetto Lavagna DEFINITO:  room = "+ room._id);
			}
		
	
	
			// Quiz (activity)
			if (typeof(Alerts.findOne({name: 'quiz', room: room._id})) == 'undefined'){
				console.log("Quiz NON definito: room = "+ room._id);
				Meteor.call('insertActivity', 'quiz', room.id);

			}else{
				Meteor.call('setActivity', 'quiz', room._id, false );
				console.log("Quiz DEFINITO: room = "+ room._id);
			
			} 
	
		});
		*/


    }); //end 'Meteor.startup'  
  //------------------------------------------------------------------------------------------------------------------


} //end 'Meteor.isServer'













