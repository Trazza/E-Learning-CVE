Meteor.startup(function () {
// Upload Init 
  UploadServer.init({
  	
    tmpDir: process.env.PWD + '/public/uploads/tmp',
    
    uploadDir: process.env.PWD + '/public/uploads/',
    checkCreateDirectories: true //create the directories for you
  })
});


