(function(){// Riferimenti: http://docs.meteor.com/#/full/dataandsecurity

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

Rooms = new Meteor.Collection("rooms");
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

Alerts = new Meteor.Collection("alerts");
Alerts.allow({
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  }
});



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

Players = new Meteor.Collection("players");
Players.allow({
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


})();
