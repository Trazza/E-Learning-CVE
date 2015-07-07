Prova = {
  frase: "Ciao",

  getFrase: function (){
    console.log(this.frase);
  }
}




//var ConfigXML = ConfigXML || {};

ConfigXML = {

    getMD5: function(namefile){
        var xmlFile = this.xmlLoader(namefile);
        return CryptoJS.MD5(xmlFile).toString(); //calcolo l'MD5
    },
    //******************** xmlLoader ************************************
    // ritorna il testo dal file della path
    // 
    // Future() è necessario per sincronizzare la funzione
    //*******************************************************************
    xmlLoader: function(nomefile){
          console.log('-- xml_loader --');
        
          Future = Npm.require('fibers/future');
          var myFuture = new Future();
       
          // call the function and store its result
          Assets.getText('xml/'+nomefile, function (error,results){
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
    //    xml2js: http://www.ecofic.com/about/blog/node-load-xml-file-with-xml2js   
    //*******************************************************************
    jsonParser: function(namefile){

          console.log('-- json_parser --');
          var xmlFile = this.xmlLoader(namefile);
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
    //***************** jsonRoomLoad *****************************************
    // estrae le informazioni dal json e carica la collection Rooms con le informazioni del mondo virtuale
    //
    // 'verifyUndef' effettua il controllo su ogni dato per verificare se è undefined
    //  se 'verify' != 0 si è verificato un errore nella lettura e alcuni dati sono undefined 
    //
    //  id, userId, pass, title, descr, path, enable
    //********************************************************************
    createRoom: function(namefile){
          var MD5 = this.getMD5(namefile);
          var jsonText = this.jsonParser(namefile);
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

          console.log('path: '+namefile);
          var path = namefile;

          console.log('MD5: '+MD5);
            
          if (verify == 0) { 
              console.log('Verificare se esiste già la sessione caricata: '+Rooms.findOne({session: session}));
              //Meteor.call('upsertRoom', session, userId, pass, title, description, path, MD5);
              
              if ( typeof Rooms.findOne({session: session}) != 'undefined'){
                console.log('il file session: "'+ session+'" esiste già');
                console.log('update...');
                Meteor.call('updateRoom', session, userId, pass, title, description, path, MD5);

              } else {
                Meteor.call('insertRoom', session, userId, pass, title, description, path, MD5);
                console.log('Inserimento....');
              }  
              
              return 0; 
          } else {
              console.log('ERRORE: alcuni dati non sono stati trovati');
              return 1; 
          }

    }

    

}

ConfigListXML = {
    //************** list *******************************************************
    // Restituisce la lista di file nella path
    //**************************************************************************
    list: function (path){
          console.log('-- listFile -- ');

          var fs = Meteor.npmRequire('fs');
          var listF = fs.readdirSync(path);

          console.log('Numero file xml: '+ (listF.length - 1)); // -1 in quanto di default esiste un file nascosto del framework
          return listF;
    },
    //*************** consistence **********************************************************************
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
    consistence: function(path){

        var listF = this.list(path);
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
                  //var xmlFile = Meteor.call('xmlLoader', 'xml/'+nameFile);             
                  //var xmlFile = ConfigXML.xmlLoader(nameFile);
                  
                  //var md5 = CryptoJS.MD5(xmlFile).toString(); //calcolo l'MD5
                  var md5 = ConfigXML.getMD5(nameFile);
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
                      //var jsonFile = Meteor.call('jsonParser', xmlFile);
                      //var jsonFile = ConfigXML.jsonParser(nameFile);
                      //Meteor.call('jsonRoomLoad', jsonFile, nameFile, md5);
                      ConfigXML.createRoom(nameFile);
                  };
            } 
        });
  
          Rooms.remove({enable: false});
    }
}