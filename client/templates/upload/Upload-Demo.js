if (Meteor.isClient) {

  

  Template.upload_template_view.helpers({
   uploads: function () {
    	return Uploads.find();
    }
  });

  Template.upload_template_view.events({
  
  	'click .set_img_id':function() {
    	console.log('Img ID: '+ this._id + '; nome: '+ this.name +'; path: '+ this.path );
    	//document.getElementById('lavagna__img_lavagna').setAttribute('url', '/uploads/'+this.path);
    	Meteor.call('changeImgLavagna', this.path);
    	AntiModals.dismissAll();
    	//console.log(document.getElementById('lavagna__img_lavagna').getAttribute('url'));
    	
    	
  	},
  
    'click .deleteUpload':function() {
    	if (confirm('Are you sure?')) {
      		Meteor.call('deleteFile', this._id);
    	}
  	},
  
  'click .clearUpload':function() {
    if (confirm('Are you sure?')) {
      Meteor.call('clearUpload', this._id);
    }
  }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
