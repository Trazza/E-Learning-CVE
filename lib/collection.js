// Riferimenti: http://docs.meteor.com/#/full/dataandsecurity



//***************** Players *****************************************************
//  Dati e informazione Sugli avatar associatio ai Players
//
//  room:     sessionId  sessione attuale del player
//  scene:    scena attuale del player 
//  nome:     nome utente (ricavata da login di google)
//  _id:      ID utente 
//  y_view:   altezza della camera
//  fp_view:  first person view
//  x:        posizione dell'avatar sull'asse x
//  y:        y (probabilmente sarà di default)
//  z:        z
//  color:    colore scelto per l'avatar dall'utente
//  activity: attività collaborativa attualmente svolta dal player (es. quiz)
//***************************************************************************

Players = new Meteor.Collection("players", {
  transform: function (doc) { return new P(doc); }
});

// estenzioni metodi di players
P = function (doc) {
  _.extend(this, doc);
};
_.extend(P.prototype, {
  set: function (session, scene, color){
    console.log('SET: '+ scene);
    return Players.update(
                      {_id: this._id},
                      { $set:
                          {
                              room: session,       //  sessionId  sessione attuale del player
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

  setScene: function(scene){
    return Players.update(
                      {_id: this._id},
                      { $set:
                          {  
                              scene: scene,     //  scena attuale del player                     
                          }
                      }
        );
  },

  setZ: function(z){
    return Players.update(
                      {_id: this._id},
                      { $set:
                          {  
                              z: z,     //  scena attuale del player                     
                          }
                      }
        );
  }, 

  setX: function(x){
    return Players.update(
                      {_id: this._id},
                      { $set:
                          {  
                              x: x,     //  scena attuale del player                     
                          }
                      }
        );
  }, 

  setCam: function(cam){
    return Players.update(
                      {_id: this._id},
                      { $set:
                          {  
                              cam: cam,     //  scena attuale del player                     
                          }
                      }
        );
  }, 

  setR: function(r){
    return Players.update(
                      {_id: this._id},
                      { $set:
                          {  
                              r: r,     //  scena attuale del player                     
                          }
                      }
        );
  }, 

  moveUp: function(){
          var vel = 0.5;
          switch (this.cam) {
                      case 'fp1': 
                                this.setZ(this.z - vel);
                                break;   

                      case 'fp4': 
                                this.setZ(this.z + vel);
                                break;

                      case 'fp2': 
                                this.setX(this.x + vel);
                                break;

                      case 'fp3':
                                this.setX(this.x - vel);
                                break;
                  }
  },

  moveDown: function(){
          var vel = 0.5;
          switch (this.cam) {
                      case 'fp1': 
                                this.setZ(this.z + vel);
                                break;   

                      case 'fp4': 
                                this.setZ(this.z - vel);
                                break;

                      case 'fp2': 
                                this.setX(this.x - vel);
                                break;

                      case 'fp3':
                                this.setX(this.x + vel);
                                break;
                  }
  },

  turnLeft: function(){
          switch (this.cam) {
                      case 'fp1': 
                                this.setCam('fp3');
                                this.setR(1.57079633);
                                id = 'fp3'+this._id;                                    
                                break;   

                      case 'fp2': 
                                this.setCam('fp1');
                                this.setR(0);
                                id = 'fp1'+this._id;
                                break;

                      case 'fp3': 
                                this.setCam('fp4');
                                this.setR(3.14159265);
                                id = 'fp4'+this._id;
                                break;

                      case 'fp4':
                                this.setCam('fp2');
                                this.setR(-1.57079633);
                                id = 'fp2'+this._id;
                                break;
          }
          document.getElementById(id).setAttribute('set_bind','true');
  },

  turnRight: function(){
        switch (this.cam) {
                      case 'fp1': 
                                this.setCam('fp2');
                                this.setR(-1.57079633);
                                id = 'fp2'+this._id;
                                break;   

                      case 'fp2': 
                                this.setCam('fp4');
                                this.setR(3.14159265);
                                id = 'fp4'+this._id;
                                break;

                      case 'fp3': 
                                this.setCam('fp1');
                                this.setR(0);
                                id = 'fp1'+this._id;
                                break;

                      case 'fp4':
                                this.setCam('fp3');
                                this.setR(1.57079633);
                                id = 'fp3'+this._id;
                                break;
                  }
                  document.getElementById(id).setAttribute('set_bind','true');
  },

  remove: function(){

    return Players.remove(this._id);
  },

  setActivity: function(name, type) {
      return Players.update(
                        { _id: this._id }, 
                        { $set: 
                          {
                            activityName: name, 
                            activityType: type
                          }
                        }
                      ) 
    }
});



Players.allow({
  insert: function (userId, doc) {
    //return (this.userId && doc._id === userId);
    return true; 
  },
  update: function (userId, doc, fieldNames, modifier) {
    //return (userId && doc._id === userId);
    return true;
  },
  remove: function (userId, doc) {
    //return (userId);
    return true;
  }
});






//********************** Rooms ********************************************************
// contiene i dati delle Sessioni
//
// _id:     sessionID
// userId:  account di chi ha creato il progetto 
// pass:    password per accedere al progetto
// title:   titolo del progetto   
// descr:   descrizione
// path:    path del file xml
// enable:  indica se gli oggetti e la scena sono caricati nella collection (cioè il modno virtuale è attivo)
//***********************************************************************************************

Rooms = new Meteor.Collection("rooms", {
  transform: function (doc) { return new R(doc); }
});


R = function (doc) {
  _.extend(this, doc);
};
_.extend(R.prototype, {
  set: function (userId, pass, title, description, path, MD5){
      return Rooms.update(
                  { session: this.session},
                  { $set:
                    {
                        userId: userId,             //  account di chi ha creato il progetto 
                        pass: pass,                 //  password per accedere al progetto
                        title: title,               //  titolo del progetto   
                        description: description,   //  descrizione
                        path: path,                 //  nome del file xml
                        MD5: MD5,                   //  estratto dal json, serve per verificare se il file è stato modificato
                        enable: true                //  utilizzato al momento della verifica 
                                                    //        di coerenza dati tra file e i dati corrispondenti nella collection
                    }

                  }
              ); 
  },


  //**************************** activeRoom *********************************
  //  avvia la lettura del file xml corrispondente alla sessione 'session' 
  //  e il carimameto dei dati nelle collection Scenes e Objects
  //**********************************************************************
  active: function(){
          console.log('-- activeRoom --');
          Meteor.call('generator', this.path);
  },


  //****************************** start ********************************//
  //  Attiva e disattiva la sessione in base al campo value
  //
  // value = true
  //    - carica i dati degli oggetti in Objects (generator)
  //    - imposta a vero il campo loaded che indica se la sessione è attiva
  // value = false
  //    - elimina dalla collection Objects tutti gli oggetti della sessione
  //    - imposta a falso il campo loaded
  //***********************************************************************
  start: function(value) {
          if (value){
              this.active();  //leggo il file XML e inserisco gli oggetti e scene nella collection 
              console.log('attiva');
          } else {

              session = String(this.session);

              users = Players.find({room: session});
              users.forEach( function (p) {
                p.set(null, null, null);
                  //Players.findOne(p._id).set(null, null, null); //scollego i player loggati dalla sessione
                  //Meteor.call('updatePlayer', p._id, null, null, null); //scollego dalla sessione tutti gli utenti ancora al suo interno
              });

              
              Objects.find({room: session}).forEach( function(o){ // elimino gli oggetti della sessione dalla colletion
                  Objects.remove(o._id);
              });

              Scenes.find({room: session}).forEach( function(s){ // elimino le Scene della sessione dalla colletion
                  Scenes.remove(s._id);
              });
               
              Alerts.find({room: session}).forEach( function(a){ // elimino le attività della sessione dalla colletion
                  Alerts.remove(a._id);
              });
              
              console.log('disattiva');
          }

          return Rooms.update(
                    { _id: this._id},
                    { $set:
                      {
                          loaded: value              
                      }

                    }
          ); 

  }

});




Rooms.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
  
});


//********************** Scenes ********************************************************
// contiene i dati delle Sessioni
//
// _id:     Id della scena
// room_id: Id della sessione a cui appartiene la scena 
// title:   titolo della scena   
// descr:   descrizione
// path:    path del file xml
//************************************************************************************

Scenes = new Meteor.Collection("scenes");
Scenes.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
  
});


//******************** Objects ********************************************
// Contiene i dati e le informazioni di ogni oggetto caricato nel mondo vortuale 
// 
//  room:     sessionId: id della sessione in cui è caricato
//  scene:    indica la scena in cui è caricato 
//  name:     nome dell'oggetto
//  x:        posizione sull'asse X
//  z:        posizione sull'asse Z
//  event:    il trigger (es. click)
//  func:     funzione scatenata dall'evento 
//  img_path: indica la path delle immagini per la personalizzazione degli oggetti
//**************************************************************************

Objects = new Meteor.Collection("objects");
Objects.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});



//********************* Alerts (Activity) ****************************************************
//  Contiene l'insieme delle attivita collaborative che possono essere svolte
//  Passando a true il campo value viene scatenato l'evento
//
//  room:   sessionId
//  scene:  scena
//  name:   nome dell'attività collaborativa svolta (es. quiz)
//  value:  (boolean) quando settato a true scatena l'evento associato su tutti client
//************************************************************************************

Alerts = new Meteor.Collection("alerts", {
  transform: function (doc) { return new A(doc); }
});

// estenzioni metodi di alerts
A = function (doc) {
  _.extend(this, doc);
};
_.extend(A.prototype, {
  set: function (value) {
    return Alerts.update(
                  { _id: this._id}, 
                  { $set: //consente di modificare sono il parametro selezionato 
                    {
                      value: value, 
                    }
                  }
          );
  }
});




Alerts.allow({
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});







//************************* Uploads *********************************************
//  Contiene i riferimenti ai file caricati dall'utente 
//  
//
//  Riferimenti: https://github.com/tomitrescak/meteor-uploads

Uploads = new Meteor.Collection('uploads');
Uploads.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});

