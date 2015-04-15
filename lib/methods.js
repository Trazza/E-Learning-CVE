
if (Meteor.isClient) {	
	Meteor.methods({

  		all_players_color: function (id, color) {
  			console.log(id+' '+color);
  			document.getElementById(id+'__Legs').setAttribute('diffuseColor', color);
  		},
	
	
		finestra: function () {
				AntiModals.overlay('finestra_template', {
    	  					modal: true,
    	  				});
				console.log("Click lavagna da "+ Session.get('user_id'));
			
    	},
    	
    	setImgLavagna: function () {
    		window.setTimeout( function () {
					var img_path = Objects.findOne('lavagna_id').img_path;
					console.log('img_path = '+ img_path);
					document.getElementById('lavagna__img_lavagna').setAttribute('url', '/uploads/'+img_path);
					}, 2000 );
			
    	},
    	
    	
    
    
    	
	})
}


	
if (Meteor.isServer) {
	Meteor.methods({
		// Uploads methods
		
		
		
		setImgLavagna: function () {
    		
			
    	},
		
		
		
		
	
		

		all_players_color: function (id, color) {
  			
  		},
  		
  		
  		
  		finestra: function () {
			//console.log("Server quiz da: " + user_id);
			
    	},
	})
}

