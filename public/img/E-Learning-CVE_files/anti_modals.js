//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Spacebars = Package.spacebars.Spacebars;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var AntiModals;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/anti:modals/client/index.js                                                       //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
AntiModals = AntiModals || {};                                                                // 1
                                                                                              // 2
                                                                                              // 3
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/anti:modals/client/overlay.js                                                     //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
                                                                                              // 1
                                                                                              // 2
/*                                                                                            // 3
  # options                                                                                   // 4
                                                                                              // 5
  data                                                                                        // 6
  callback                                                                                    // 7
  divClass                                                                                    // 8
  overlayClass                                                                                // 9
                                                                                              // 10
*/                                                                                            // 11
                                                                                              // 12
                                                                                              // 13
                                                                                              // 14
AntiModals.overlay = function(template, options, callback) {                                  // 15
  if(arguments.length === 2 && typeof options === 'function') {                               // 16
    callback = options;                                                                       // 17
    options = {};                                                                             // 18
  }                                                                                           // 19
  options = options || {};                                                                    // 20
  callback = callback || options.callback;                                                    // 21
                                                                                              // 22
                                                                                              // 23
  var overlay = document.createElement('div');                                                // 24
  var $overlay = $(overlay);                                                                  // 25
  $overlay.addClass('anti-modal-overlay');                                                    // 26
                                                                                              // 27
                                                                                              // 28
  if(options.overlayClass) {                                                                  // 29
    if(typeof options.overlayClass === 'string') {                                            // 30
      $overlay.addClass(options.overlayClass);                                                // 31
    }                                                                                         // 32
  }                                                                                           // 33
  if(options.overlayStyle) {                                                                  // 34
    $overlay.css(options.overlayStyle);                                                       // 35
  }                                                                                           // 36
                                                                                              // 37
  $overlay.hide();                                                                            // 38
                                                                                              // 39
  overlay.__antiModalsView = Blaze.renderWithData(Template[template], options.data, overlay); // 40
                                                                                              // 41
  if(!options.modal) {                                                                        // 42
    $overlay.click(function(e) {                                                              // 43
      if(e.target === overlay)                                                                // 44
        AntiModals.dismissOverlay(overlay);                                                   // 45
    });                                                                                       // 46
  }                                                                                           // 47
                                                                                              // 48
  $overlay.find('.anti-modal-closer').click(function(e) {                                     // 49
    AntiModals.dismissOverlay(overlay);                                                       // 50
  });                                                                                         // 51
                                                                                              // 52
  overlay.__antiModalsCallback = callback;                                                    // 53
  $('body').append(overlay);                                                                  // 54
                                                                                              // 55
  if(options.animateIn) {                                                                     // 56
    options.animateIn(overlay);                                                               // 57
  } else {                                                                                    // 58
    $overlay.fadeIn(300);                                                                     // 59
  }                                                                                           // 60
                                                                                              // 61
  if(options.animateOut) overlay.__antiModalsAnimateOut = options.animateOut;                 // 62
  return overlay;                                                                             // 63
};                                                                                            // 64
                                                                                              // 65
                                                                                              // 66
                                                                                              // 67
AntiModals.dismissOverlay = function(element, error, data) {                                  // 68
  /* Get overlay */                                                                           // 69
  var $overlay = $(element).closest('.anti-modal-overlay');                                   // 70
                                                                                              // 71
  if(!$overlay || !$overlay.get() || !$overlay.get()[0]) return;                              // 72
                                                                                              // 73
  var overlayDiv = $overlay.get()[0];                                                         // 74
                                                                                              // 75
                                                                                              // 76
  /* Callback */                                                                              // 77
  if(overlayDiv.__antiModalsCallback) {                                                       // 78
    overlayDiv.__antiModalsCallback(error, data);                                             // 79
  }                                                                                           // 80
                                                                                              // 81
  /* Dismiss */                                                                               // 82
  if(overlayDiv.__antiModalsAnimateOut) {                                                     // 83
    overlayDiv.__antiModalsAnimateOut(overlayDiv, function() {                                // 84
      Blaze.remove(overlayDiv.__antiModalsView);                                              // 85
      $overlay.remove();                                                                      // 86
    });                                                                                       // 87
  } else {                                                                                    // 88
    $overlay.fadeOut(300, function(){                                                         // 89
      Blaze.remove(overlayDiv.__antiModalsView);                                              // 90
      $overlay.remove();                                                                      // 91
    });                                                                                       // 92
  }                                                                                           // 93
                                                                                              // 94
};                                                                                            // 95
                                                                                              // 96
                                                                                              // 97
AntiModals.dismissAll = function(error, data) {                                               // 98
  $('.anti-modal-overlay').each(function() {                                                  // 99
    AntiModals.dismissOverlay(this, error, data);                                             // 100
  });                                                                                         // 101
                                                                                              // 102
};                                                                                            // 103
                                                                                              // 104
                                                                                              // 105
                                                                                              // 106
                                                                                              // 107
                                                                                              // 108
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/anti:modals/client/template.alert.js                                              //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
                                                                                              // 1
Template.__checkName("__antiModals__alert");                                                  // 2
Template["__antiModals__alert"] = new Template("Template.__antiModals__alert", (function() {  // 3
  var view = this;                                                                            // 4
  return HTML.DIV({                                                                           // 5
    "class": "anti-modal-box"                                                                 // 6
  }, "\n\n    ", Blaze.If(function() {                                                        // 7
    return Spacebars.call(view.lookup("titleOrCloser"));                                      // 8
  }, function() {                                                                             // 9
    return [ "\n      ", HTML.DIV({                                                           // 10
      "class": "anti-modal-header"                                                            // 11
    }, "\n        ", Blaze.If(function() {                                                    // 12
      return Spacebars.call(view.lookup("title"));                                            // 13
    }, function() {                                                                           // 14
      return [ "\n          ", HTML.SPAN({                                                    // 15
        "class": "anti-modal-title"                                                           // 16
      }, Blaze.View(function() {                                                              // 17
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("title")));                   // 18
      })), "\n        " ];                                                                    // 19
    }), "\n        ", Blaze.If(function() {                                                   // 20
      return Spacebars.call(view.lookup("closer"));                                           // 21
    }, function() {                                                                           // 22
      return [ "\n          ", HTML.SPAN({                                                    // 23
        "class": "anti-modal-closer"                                                          // 24
      }, HTML.CharRef({                                                                       // 25
        html: "&times;",                                                                      // 26
        str: "×"                                                                              // 27
      })), "\n        " ];                                                                    // 28
    }), "\n      "), "\n    " ];                                                              // 29
  }), "\n      \n    ", HTML.DIV({                                                            // 30
    "class": "anti-modal-body"                                                                // 31
  }, "\n      ", Blaze.View(function() {                                                      // 32
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("message")));                     // 33
  }), "\n      ", Blaze.If(function() {                                                       // 34
    return Spacebars.call(view.lookup("prompt"));                                             // 35
  }, function() {                                                                             // 36
    return [ "\n        ", HTML.DIV(HTML.INPUT({                                              // 37
      "class": "anti-modal-prompt",                                                           // 38
      type: "text",                                                                           // 39
      value: function() {                                                                     // 40
        return Spacebars.mustache(view.lookup("value"));                                      // 41
      },                                                                                      // 42
      placeholder: function() {                                                               // 43
        return Spacebars.mustache(view.lookup("placeholder"));                                // 44
      }                                                                                       // 45
    })), "\n      " ];                                                                        // 46
  }), "\n    "), "\n\n    ", Blaze.If(function() {                                            // 47
    return Spacebars.call(view.lookup("okOrCancel"));                                         // 48
  }, function() {                                                                             // 49
    return [ "\n      ", HTML.DIV({                                                           // 50
      "class": "anti-modal-footer"                                                            // 51
    }, "\n        ", Blaze.If(function() {                                                    // 52
      return Spacebars.call(view.lookup("cancel"));                                           // 53
    }, function() {                                                                           // 54
      return [ "\n          ", HTML.BUTTON({                                                  // 55
        "class": "anti-modal-button anti-modal-button-cancel"                                 // 56
      }, Blaze.View(function() {                                                              // 57
        return Spacebars.mustache(view.lookup("cancel"));                                     // 58
      })), "\n        " ];                                                                    // 59
    }), "\n        ", Blaze.If(function() {                                                   // 60
      return Spacebars.call(view.lookup("ok"));                                               // 61
    }, function() {                                                                           // 62
      return [ "\n          ", HTML.BUTTON({                                                  // 63
        "class": "anti-modal-button anti-modal-button-action"                                 // 64
      }, Blaze.View(function() {                                                              // 65
        return Spacebars.mustache(view.lookup("ok"));                                         // 66
      })), "\n        " ];                                                                    // 67
    }), "\n      "), "\n    " ];                                                              // 68
  }), "\n\n  ");                                                                              // 69
}));                                                                                          // 70
                                                                                              // 71
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/anti:modals/client/alert.js                                                       //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Template.__antiModals__alert.helpers({                                                        // 1
                                                                                              // 2
  titleOrCloser: function() {                                                                 // 3
    return this.title || this.closer;                                                         // 4
  },                                                                                          // 5
                                                                                              // 6
  okOrCancel: function() {                                                                    // 7
    return this.ok || this.cancel;                                                            // 8
  },                                                                                          // 9
                                                                                              // 10
});                                                                                           // 11
                                                                                              // 12
Template.__antiModals__alert.events({                                                         // 13
                                                                                              // 14
  'click .anti-modal-button-cancel, click .anti-modal-closer': function(e, t) {               // 15
    AntiModals.dismissOverlay(e.target, null, null);                                          // 16
  },                                                                                          // 17
                                                                                              // 18
  'click .anti-modal-button-action': function(e, t) {                                         // 19
    if(t.data.prompt) {                                                                       // 20
      AntiModals.dismissOverlay(e.target, null, {                                             // 21
        value: t.$('.anti-modal-prompt').val(),                                               // 22
      });                                                                                     // 23
    } else {                                                                                  // 24
      AntiModals.dismissOverlay(e.target, null, true);                                        // 25
    }                                                                                         // 26
  },                                                                                          // 27
                                                                                              // 28
  'keydown .anti-modal-prompt': function(e, t) {                                              // 29
    if(e.keyCode !== 13) return;                                                              // 30
                                                                                              // 31
    AntiModals.dismissOverlay(e.target, null, {                                               // 32
      value: t.$('.anti-modal-prompt').val(),                                                 // 33
    });                                                                                       // 34
  },                                                                                          // 35
                                                                                              // 36
                                                                                              // 37
});                                                                                           // 38
                                                                                              // 39
                                                                                              // 40
                                                                                              // 41
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/anti:modals/client/displayAlert.js                                                //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
                                                                                              // 1
var displayAlert = function(data, options, callback) {                                        // 2
  var param = {};                                                                             // 3
  if(typeof options === 'string') {                                                           // 4
    data.message = options;                                                                   // 5
    param.data = data;                                                                        // 6
  } else {                                                                                    // 7
    _.extend(data, options);                                                                  // 8
    param.data = data;                                                                        // 9
    _.extend(param, options);                                                                 // 10
  }                                                                                           // 11
                                                                                              // 12
  return AntiModals.overlay('__antiModals__alert', param, callback);                          // 13
};                                                                                            // 14
                                                                                              // 15
AntiModals.alert = function(options, callback) {                                              // 16
  return displayAlert({                                                                       // 17
    title: false,                                                                             // 18
    closer: false,                                                                            // 19
                                                                                              // 20
    message: '',                                                                              // 21
    prompt: false,                                                                            // 22
    value: '',                                                                                // 23
    placeholder: '',                                                                          // 24
                                                                                              // 25
    cancel: false,                                                                            // 26
    ok: 'OK',                                                                                 // 27
  }, options, callback);                                                                      // 28
};                                                                                            // 29
                                                                                              // 30
AntiModals.confirm = function(options, callback) {                                            // 31
  return displayAlert({                                                                       // 32
    title: false,                                                                             // 33
    closer: false,                                                                            // 34
                                                                                              // 35
    message: '',                                                                              // 36
    prompt: false,                                                                            // 37
    value: '',                                                                                // 38
    placeholder: '',                                                                          // 39
                                                                                              // 40
    cancel: 'CANCEL',                                                                         // 41
    ok: 'OK',                                                                                 // 42
  }, options, callback);                                                                      // 43
};                                                                                            // 44
                                                                                              // 45
AntiModals.prompt = function(options, callback) {                                             // 46
  return displayAlert({                                                                       // 47
    title: false,                                                                             // 48
    closer: false,                                                                            // 49
                                                                                              // 50
    message: '',                                                                              // 51
    prompt: true,                                                                             // 52
    value: '',                                                                                // 53
    placeholder: '',                                                                          // 54
                                                                                              // 55
    cancel: 'CANCEL',                                                                         // 56
    ok: 'OK',                                                                                 // 57
  }, options, callback);                                                                      // 58
};                                                                                            // 59
                                                                                              // 60
                                                                                              // 61
                                                                                              // 62
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['anti:modals'] = {
  AntiModals: AntiModals
};

})();
