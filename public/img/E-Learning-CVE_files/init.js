(function(){



//Configure client (only necessary if deploying as a Cordova app)
Meteor.startup(function() {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
  
   Uploader.finished = function(index, fileInfo, templateContext) {
	//Uploads.insert(fileInfo);
	Meteor.call('uploadInsert', fileInfo);
  }
  
});

})();
