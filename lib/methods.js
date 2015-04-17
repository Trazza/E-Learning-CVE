
if (Meteor.isClient) {	
	Meteor.methods({

  		'all_players_color': function (id, color) {
  			console.log(id+' '+color);
  			document.getElementById(id+'__Legs').setAttribute('diffuseColor', color);
  		},
	
	
		'finestra': function () {
				AntiModals.overlay('finestra_template', {
    	  					modal: true,
    	  				});
				console.log("Click lavagna da "+ Session.get('user_id'));
			
    	},
    	
    	'setImgLavagna': function () {
    	
    		window.setTimeout( function () {
    				
    				var lavagna = Objects.findOne({name: 'lavagna', room: Session.get('room_id')});
					var img_path = lavagna.img_path;
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

