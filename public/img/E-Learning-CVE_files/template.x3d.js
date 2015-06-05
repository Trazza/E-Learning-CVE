(function(){
Template.__checkName("x3d_template");
Template["x3d_template"] = new Template("Template.x3d_template", (function() {
  var view = this;
  return HTML.getTag("x3d")("\n	  ", HTML.getTag("scene")("\n	  	", HTML.Comment('<navigationinfo id="nav_id" type="none" headlight="false"></navigationinfo> '), "\n	  	\n	  	", HTML.Comment(" ground "), "\n	  	", HTML.getTag("transform")({
    scale: "0.00000001 0.00000001 0.00000001",
    rotation: "-1.5707963267948966 0 0 1.5707963267948966"
  }, "\n		  	", HTML.getTag("shape")("\n		  		", HTML.getTag("appearance")("	\n			  		", HTML.getTag("material")({
    diffusecolor: "#4A9"
  }), "\n			  	"), "\n			  	", HTML.getTag("plane")({
    size: "20 20"
  }), "\n			  "), "\n		"), "\n\n    \n    ", HTML.Comment(" <Background DEF='Background' groundColor='0.7 0.4 0.3' skyColor='0 0.6 1' ></Background> "), "\n\n    ", HTML.getTag("pointlight")({
    location: "0 40 0",
    intensity: "0.3"
  }), "\n    ", HTML.getTag("pointlight")({
    location: "-30 10 -20",
    intensity: "0.0"
  }), "\n    ", HTML.getTag("directionallight")({
    direction: "-1 -1 -0.7",
    color: "#ffe",
    intensity: "0.5",
    shadowintensity: "0.4"
  }), "\n		 \n\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("on"));
  }, function() {
    return [ "\n			", HTML.getTag("group")({
      id: "all_stage"
    }, "\n	  			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("stages"));
    }, function() {
      return [ "\n					", HTML.getTag("transform")({
        def: "stage",
        id: "stage_id",
        translation: "0 0 0",
        scale: "0.1 0.1 0.1"
      }, "\n       	 					", HTML.getTag("inline")({
        namespacename: "stage",
        mapdeftoid: "true",
        onload: "Meteor.call('findEvent');",
        url: function() {
          return [ "/x3d/", Spacebars.mustache(view.lookup("stage")), ".x3d" ];
        }
      }, "\n                  		 			\n           					"), "\n     				"), "\n     			" ];
    }), "\n     		"), "\n     	", HTML.Comment(' onclick=\'Meteor.call("{{action}}", "{{attr}}","{{succF}}","{{succA}}","{{failF}}","{{failA}}");\' '), "\n			", HTML.getTag("group")({
      id: "all_objects"
    }, " \n				", Blaze.Each(function() {
      return Spacebars.call(view.lookup("objects"));
    }, function() {
      return [ "\n					", HTML.getTag("transform")({
        def: function() {
          return Spacebars.mustache(view.lookup("name"));
        },
        id: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        translation: function() {
          return [ Spacebars.mustache(view.lookup("x")), " 2 ", Spacebars.mustache(view.lookup("z")) ];
        },
        scale: "0.1 0.1 0.1",
        rotation: "0 1 0 -1.5708"
      }, "\n       	 				", HTML.getTag("inline")({
        namespacename: function() {
          return Spacebars.mustache(view.lookup("name"));
        },
        mapdeftoid: "true",
        onload: function() {
          return [ 'Meteor.call("findEvent", "', Spacebars.mustache(view.lookup("_id")), '","', Spacebars.mustache(view.lookup("event")), '","', Spacebars.mustache(view.lookup("action")), '", "', Spacebars.mustache(view.lookup("attr")), '","', Spacebars.mustache(view.lookup("succF")), '","', Spacebars.mustache(view.lookup("succA")), '","', Spacebars.mustache(view.lookup("failF")), '","', Spacebars.mustache(view.lookup("failA")), '");' ];
        },
        url: function() {
          return [ "/x3d/", Spacebars.mustache(view.lookup("name")), ".x3d" ];
        }
      }, "\n                  	 \n           				"), "\n     				"), "\n     			" ];
    }), "\n     		"), "     	\n			\n	  		", HTML.getTag("group")({
      id: "all_players"
    }, "\n	    		", Blaze.Each(function() {
      return Spacebars.call(view.lookup("players"));
    }, function() {
      return [ "\n            ", HTML.Comment(" prima persona attiva con la freccia su "), "\n	    			", HTML.getTag("viewpoint")({
        id: function() {
          return [ "fp1", Spacebars.mustache(view.lookup("_id")) ];
        },
        position: function() {
          return [ Spacebars.mustache(view.lookup("x")), " 5 ", Spacebars.mustache(view.lookup("zView_su")) ];
        },
        orientation: "1.000000 0.000000 0.000000 -0.2",
        description: "camera",
        isactive: function() {
          return Spacebars.mustache(view.lookup("fp1Active"));
        }
      }, "\n	    			"), " \n\n            ", HTML.getTag("viewpoint")({
        id: function() {
          return [ "fp4", Spacebars.mustache(view.lookup("_id")) ];
        },
        position: function() {
          return [ Spacebars.mustache(view.lookup("x")), " 5 ", Spacebars.mustache(view.lookup("zView_giu")) ];
        },
        orientation: "1.3877787807814457e-16 2.3000000000000007 0.2 -3.2000000000000015",
        description: "camera",
        isactive: function() {
          return Spacebars.mustache(view.lookup("fp4Active"));
        }
      }, "\n\n            "), " \n\n            ", HTML.getTag("viewpoint")({
        id: function() {
          return [ "fp2", Spacebars.mustache(view.lookup("_id")) ];
        },
        position: function() {
          return [ Spacebars.mustache(view.lookup("xView_des")), " 5 ", Spacebars.mustache(view.lookup("z")) ];
        },
        orientation: "0.20000000000000015 2.0000000000000004 0.2 -1.6000000000000003",
        description: "camera",
        isactive: function() {
          return Spacebars.mustache(view.lookup("fp2Active"));
        }
      }, "\n            "), "\n\n            ", HTML.getTag("viewpoint")({
        id: function() {
          return [ "fp3", Spacebars.mustache(view.lookup("_id")) ];
        },
        position: function() {
          return [ Spacebars.mustache(view.lookup("xView_sin")), " 5 ", Spacebars.mustache(view.lookup("z")) ];
        },
        orientation: "-0.2999999999999999 2.500000000000001 0.30000000000000004 -4.699999999999999",
        description: "camera",
        isactive: function() {
          return Spacebars.mustache(view.lookup("fp3Active"));
        }
      }, "\n            "), " \n	    	\n	    			", HTML.getTag("transform")({
        id: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        translation: function() {
          return [ Spacebars.mustache(view.lookup("x")), " 0 ", Spacebars.mustache(view.lookup("z")) ];
        },
        scale: "0.5 0.5 0.5",
        rotation: function() {
          return [ "0 1 0 ", Spacebars.mustache(view.lookup("r")) ];
        }
      }, "\n       	 				", HTML.getTag("inline")({
        namespacename: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        mapdeftoid: "true",
        onload: function() {
          return [ 'Meteor.call("all_players_color", "', Spacebars.mustache(view.lookup("_id")), '", "', Spacebars.mustache(view.lookup("color")), '"), Meteor.call("onLoadPlayer");' ];
        },
        url: "/x3d/LEGO_MAN.x3d"
      }, "   	 \n           				"), "\n     				"), "		\n	    		" ];
    }), "\n	  		"), "\n		  ", HTML.Comment('\n      {{else}}\n          <transform DEF="intro" id="intro" translation=\'0 0 200\' >\n              <inline nameSpaceName="intro" \n                      mapDEFToID="true" \n                      url="/x3d/intro.x3d">\n                     \n              </inline>\n          </transform>    \n      '), "\n\n	  	" ];
  }), " \n	  ", HTML.Comment(' Tanle \n\n		{{event}}=\'Meteor.call({{action}},{{attr}},{{succF}},{{succA}},{{failF}},{{failA}});\'\n\n     	<ProximitySensor id="table_sensor_id" enabled="true" center="3 0 -10" size="3 3 3"></ProximitySensor> \n     	<transform DEF="wood_table" id="wood_table_id" translation="3 0 -10" scale="1 1 1" rotation="0 1 0 -1.5708">\n       	 		<inline nameSpaceName="wood_table" \n            			mapDEFToID="true" \n                  	 	url="/x3d/wood_table.x3d">\n                  	 \n           		</inline>\n     	</transform>		\n     	'), "\n	  "), "\n	");
}));

})();
