(function(){
Template.__checkName("user_login");
Template["user_login"] = new Template("Template.user_login", (function() {
  var view = this;
  return HTML.Raw('<form id="temporary_login_form" action="action">\n		<div>\n			------------------------------------------\n      		<h2>Login</h2>\n			<div id="googleLogin">\n				<p> Google account </p>\n        		<button class="login-mode btn active" id="login-button">Sign in</button> \n     		</div>	\n     	</div>	\n  	</form>');
}));

Template.__checkName("user_logout");
Template["user_logout"] = new Template("Template.user_logout", (function() {
  var view = this;
  return HTML.FORM({
    id: "temporary_logout_form",
    action: "action"
  }, "\n			\n		", HTML.DIV("\n        	", HTML.B(Blaze.View("lookup:myName", function() {
    return Spacebars.mustache(view.lookup("myName"));
  }), " "), " ", HTML.Raw('<input type="submit" id="logout-button" value="Logout">'), " \n     	"), "\n  	");
}));

Template.__checkName("select_session");
Template["select_session"] = new Template("Template.select_session", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "room-list"
  }, "\n		\n		", HTML.DIV("\n        	", HTML.Raw("<h2>I tuoi Mondi virtuali</h2>"), "\n        	\n        	", HTML.DIV("\n        		", HTML.TABLE({
    style: "width:100%"
  }, "\n        			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("myRooms"));
  }, function() {
    return [ "\n        				", HTML.TR("\n  							", Blaze.If(function() {
      return Spacebars.call(view.lookup("loaded"));
    }, function() {
      return [ "\n  								", HTML.TD(HTML.B(Blaze.View("lookup:title", function() {
        return Spacebars.mustache(view.lookup("title"));
      }), ": ")), "\n  								", HTML.TD(HTML.BUTTON({
        id: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        "class": "disableRoom",
        type: "button",
        value: function() {
          return Spacebars.mustache(view.lookup("session"));
        }
      }, HTML.IMG({
        src: "/img/1.gif",
        width: "16",
        height: "16"
      }), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), " Disattiva")), "\n  							" ];
    }, function() {
      return [ "\n  								", HTML.TD(Blaze.View("lookup:title", function() {
        return Spacebars.mustache(view.lookup("title"));
      }), ": "), "\n  								", HTML.TD(HTML.BUTTON({
        id: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        "class": "enableRoom",
        type: "button",
        value: function() {
          return Spacebars.mustache(view.lookup("session"));
        }
      }, HTML.IMG({
        src: "/img/1.png",
        width: "16",
        height: "16"
      }), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), " Attiva")), "\n  							" ];
    }), "\n  						"), "\n  					" ];
  }), "\n  				"), "\n			"), "\n        "), "\n		\n		", HTML.DIV("\n			", HTML.Raw("<h2>Lista ROOM attive</h2>"), "\n			Seleziona una Room:\n			", HTML.SELECT({
    id: "rooms",
    name: "rooms"
  }, "\n				", HTML.Raw('<option value="default" selected="">No Room selected</option>'), "\n				", Blaze.Each(function() {
    return Spacebars.call(view.lookup("rooms"));
  }, function() {
    return [ "\n					", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("session"));
      }
    }, Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    })), "\n				" ];
  }), "\n			"), "\n		"), "\n			\n		", HTML.Raw("<br>"), HTML.Raw("<br>"), "\n		", HTML.Raw('<button id="prova" type="button">Prova </button>'), "\n    "), "\n\n	", HTML.DIV({
    "class": "color-picker"
  }, "\n		", HTML.Raw("<h2>SCEGLI IL TUO COLORE</h2>"), "\n		", Blaze.Each(function() {
    return Spacebars.call(view.lookup("colors"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": function() {
        return [ "swatch", Blaze.If(function() {
          return Spacebars.call(view.lookup("activeColor"));
        }, function() {
          return " active";
        }) ];
      },
      style: function() {
        return [ "background-color: ", Spacebars.mustache(view.lookup("code")) ];
      }
    }, "\n				", Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }), "\n			"), "\n		" ];
  }), "\n	"), HTML.Raw('\n\n    <input type="submit" id="enterSession" value="Entra">') ];
}));

Template.__checkName("exit_session");
Template["exit_session"] = new Template("Template.exit_session", (function() {
  var view = this;
  return [ HTML.Raw("<br>\n	"), HTML.P(HTML.Raw("<b>Sessione: </b>"), " 	", Blaze.View("lookup:session", function() {
    return Spacebars.mustache(view.lookup("session"));
  })), "\n	", HTML.P(HTML.Raw("<b>Scena: </b>"), "		", Blaze.View("lookup:scene", function() {
    return Spacebars.mustache(view.lookup("scene"));
  })), HTML.Raw('\n	<input type="submit" id="exitSession" value="Esci">') ];
}));

})();
