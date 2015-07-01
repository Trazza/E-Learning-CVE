Meteor.startup(function () {


//******************** UploadServer.init ******************************
//	Inizializza le cartelle per l'upload
//
// 	Riferimenti: https://github.com/tomitrescak/meteor-uploads
//
//***************************************************************
	UploadServer.init({
  	
    	tmpDir: process.env.PWD + '/public/uploads/tmp',
    	
    	uploadDir: process.env.PWD + '/public/uploads/',
    	checkCreateDirectories: true //create the directories for you
  	})


	console.log('START...');
	console.log('XML_PATH: '+XML_PATH);
  console.log('path attuale: '+process.env.PWD);
  var listF = Meteor.call('listFiles', process.env.PWD+XML_PATH); //process.env.PWD  restituisce la root del progetto
    
  Meteor.call('consistenceFiles', listF);





}); // END Startup


