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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:bootstrap-3/js/bootstrap.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * Bootstrap v3.3.1 (http://getbootstrap.com)                                                                          // 2
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 3
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 4
 */                                                                                                                    // 5
                                                                                                                       // 6
if (typeof jQuery === 'undefined') {                                                                                   // 7
  throw new Error('Bootstrap\'s JavaScript requires jQuery')                                                           // 8
}                                                                                                                      // 9
                                                                                                                       // 10
+function ($) {                                                                                                        // 11
  var version = $.fn.jquery.split(' ')[0].split('.')                                                                   // 12
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {                  // 13
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')                                 // 14
  }                                                                                                                    // 15
}(jQuery);                                                                                                             // 16
                                                                                                                       // 17
/* ========================================================================                                            // 18
 * Bootstrap: transition.js v3.3.1                                                                                     // 19
 * http://getbootstrap.com/javascript/#transitions                                                                     // 20
 * ========================================================================                                            // 21
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 22
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 23
 * ======================================================================== */                                         // 24
                                                                                                                       // 25
                                                                                                                       // 26
+function ($) {                                                                                                        // 27
  'use strict';                                                                                                        // 28
                                                                                                                       // 29
  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)                                                      // 30
  // ============================================================                                                      // 31
                                                                                                                       // 32
  function transitionEnd() {                                                                                           // 33
    var el = document.createElement('bootstrap')                                                                       // 34
                                                                                                                       // 35
    var transEndEventNames = {                                                                                         // 36
      WebkitTransition : 'webkitTransitionEnd',                                                                        // 37
      MozTransition    : 'transitionend',                                                                              // 38
      OTransition      : 'oTransitionEnd otransitionend',                                                              // 39
      transition       : 'transitionend'                                                                               // 40
    }                                                                                                                  // 41
                                                                                                                       // 42
    for (var name in transEndEventNames) {                                                                             // 43
      if (el.style[name] !== undefined) {                                                                              // 44
        return { end: transEndEventNames[name] }                                                                       // 45
      }                                                                                                                // 46
    }                                                                                                                  // 47
                                                                                                                       // 48
    return false // explicit for ie8 (  ._.)                                                                           // 49
  }                                                                                                                    // 50
                                                                                                                       // 51
  // http://blog.alexmaccaw.com/css-transitions                                                                        // 52
  $.fn.emulateTransitionEnd = function (duration) {                                                                    // 53
    var called = false                                                                                                 // 54
    var $el = this                                                                                                     // 55
    $(this).one('bsTransitionEnd', function () { called = true })                                                      // 56
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }                               // 57
    setTimeout(callback, duration)                                                                                     // 58
    return this                                                                                                        // 59
  }                                                                                                                    // 60
                                                                                                                       // 61
  $(function () {                                                                                                      // 62
    $.support.transition = transitionEnd()                                                                             // 63
                                                                                                                       // 64
    if (!$.support.transition) return                                                                                  // 65
                                                                                                                       // 66
    $.event.special.bsTransitionEnd = {                                                                                // 67
      bindType: $.support.transition.end,                                                                              // 68
      delegateType: $.support.transition.end,                                                                          // 69
      handle: function (e) {                                                                                           // 70
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)                                    // 71
      }                                                                                                                // 72
    }                                                                                                                  // 73
  })                                                                                                                   // 74
                                                                                                                       // 75
}(jQuery);                                                                                                             // 76
                                                                                                                       // 77
/* ========================================================================                                            // 78
 * Bootstrap: alert.js v3.3.1                                                                                          // 79
 * http://getbootstrap.com/javascript/#alerts                                                                          // 80
 * ========================================================================                                            // 81
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 82
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 83
 * ======================================================================== */                                         // 84
                                                                                                                       // 85
                                                                                                                       // 86
+function ($) {                                                                                                        // 87
  'use strict';                                                                                                        // 88
                                                                                                                       // 89
  // ALERT CLASS DEFINITION                                                                                            // 90
  // ======================                                                                                            // 91
                                                                                                                       // 92
  var dismiss = '[data-dismiss="alert"]'                                                                               // 93
  var Alert   = function (el) {                                                                                        // 94
    $(el).on('click', dismiss, this.close)                                                                             // 95
  }                                                                                                                    // 96
                                                                                                                       // 97
  Alert.VERSION = '3.3.1'                                                                                              // 98
                                                                                                                       // 99
  Alert.TRANSITION_DURATION = 150                                                                                      // 100
                                                                                                                       // 101
  Alert.prototype.close = function (e) {                                                                               // 102
    var $this    = $(this)                                                                                             // 103
    var selector = $this.attr('data-target')                                                                           // 104
                                                                                                                       // 105
    if (!selector) {                                                                                                   // 106
      selector = $this.attr('href')                                                                                    // 107
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7                                   // 108
    }                                                                                                                  // 109
                                                                                                                       // 110
    var $parent = $(selector)                                                                                          // 111
                                                                                                                       // 112
    if (e) e.preventDefault()                                                                                          // 113
                                                                                                                       // 114
    if (!$parent.length) {                                                                                             // 115
      $parent = $this.closest('.alert')                                                                                // 116
    }                                                                                                                  // 117
                                                                                                                       // 118
    $parent.trigger(e = $.Event('close.bs.alert'))                                                                     // 119
                                                                                                                       // 120
    if (e.isDefaultPrevented()) return                                                                                 // 121
                                                                                                                       // 122
    $parent.removeClass('in')                                                                                          // 123
                                                                                                                       // 124
    function removeElement() {                                                                                         // 125
      // detach from parent, fire event then clean up data                                                             // 126
      $parent.detach().trigger('closed.bs.alert').remove()                                                             // 127
    }                                                                                                                  // 128
                                                                                                                       // 129
    $.support.transition && $parent.hasClass('fade') ?                                                                 // 130
      $parent                                                                                                          // 131
        .one('bsTransitionEnd', removeElement)                                                                         // 132
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :                                                             // 133
      removeElement()                                                                                                  // 134
  }                                                                                                                    // 135
                                                                                                                       // 136
                                                                                                                       // 137
  // ALERT PLUGIN DEFINITION                                                                                           // 138
  // =======================                                                                                           // 139
                                                                                                                       // 140
  function Plugin(option) {                                                                                            // 141
    return this.each(function () {                                                                                     // 142
      var $this = $(this)                                                                                              // 143
      var data  = $this.data('bs.alert')                                                                               // 144
                                                                                                                       // 145
      if (!data) $this.data('bs.alert', (data = new Alert(this)))                                                      // 146
      if (typeof option == 'string') data[option].call($this)                                                          // 147
    })                                                                                                                 // 148
  }                                                                                                                    // 149
                                                                                                                       // 150
  var old = $.fn.alert                                                                                                 // 151
                                                                                                                       // 152
  $.fn.alert             = Plugin                                                                                      // 153
  $.fn.alert.Constructor = Alert                                                                                       // 154
                                                                                                                       // 155
                                                                                                                       // 156
  // ALERT NO CONFLICT                                                                                                 // 157
  // =================                                                                                                 // 158
                                                                                                                       // 159
  $.fn.alert.noConflict = function () {                                                                                // 160
    $.fn.alert = old                                                                                                   // 161
    return this                                                                                                        // 162
  }                                                                                                                    // 163
                                                                                                                       // 164
                                                                                                                       // 165
  // ALERT DATA-API                                                                                                    // 166
  // ==============                                                                                                    // 167
                                                                                                                       // 168
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)                                            // 169
                                                                                                                       // 170
}(jQuery);                                                                                                             // 171
                                                                                                                       // 172
/* ========================================================================                                            // 173
 * Bootstrap: button.js v3.3.1                                                                                         // 174
 * http://getbootstrap.com/javascript/#buttons                                                                         // 175
 * ========================================================================                                            // 176
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 177
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 178
 * ======================================================================== */                                         // 179
                                                                                                                       // 180
                                                                                                                       // 181
+function ($) {                                                                                                        // 182
  'use strict';                                                                                                        // 183
                                                                                                                       // 184
  // BUTTON PUBLIC CLASS DEFINITION                                                                                    // 185
  // ==============================                                                                                    // 186
                                                                                                                       // 187
  var Button = function (element, options) {                                                                           // 188
    this.$element  = $(element)                                                                                        // 189
    this.options   = $.extend({}, Button.DEFAULTS, options)                                                            // 190
    this.isLoading = false                                                                                             // 191
  }                                                                                                                    // 192
                                                                                                                       // 193
  Button.VERSION  = '3.3.1'                                                                                            // 194
                                                                                                                       // 195
  Button.DEFAULTS = {                                                                                                  // 196
    loadingText: 'loading...'                                                                                          // 197
  }                                                                                                                    // 198
                                                                                                                       // 199
  Button.prototype.setState = function (state) {                                                                       // 200
    var d    = 'disabled'                                                                                              // 201
    var $el  = this.$element                                                                                           // 202
    var val  = $el.is('input') ? 'val' : 'html'                                                                        // 203
    var data = $el.data()                                                                                              // 204
                                                                                                                       // 205
    state = state + 'Text'                                                                                             // 206
                                                                                                                       // 207
    if (data.resetText == null) $el.data('resetText', $el[val]())                                                      // 208
                                                                                                                       // 209
    // push to event loop to allow forms to submit                                                                     // 210
    setTimeout($.proxy(function () {                                                                                   // 211
      $el[val](data[state] == null ? this.options[state] : data[state])                                                // 212
                                                                                                                       // 213
      if (state == 'loadingText') {                                                                                    // 214
        this.isLoading = true                                                                                          // 215
        $el.addClass(d).attr(d, d)                                                                                     // 216
      } else if (this.isLoading) {                                                                                     // 217
        this.isLoading = false                                                                                         // 218
        $el.removeClass(d).removeAttr(d)                                                                               // 219
      }                                                                                                                // 220
    }, this), 0)                                                                                                       // 221
  }                                                                                                                    // 222
                                                                                                                       // 223
  Button.prototype.toggle = function () {                                                                              // 224
    var changed = true                                                                                                 // 225
    var $parent = this.$element.closest('[data-toggle="buttons"]')                                                     // 226
                                                                                                                       // 227
    if ($parent.length) {                                                                                              // 228
      var $input = this.$element.find('input')                                                                         // 229
      if ($input.prop('type') == 'radio') {                                                                            // 230
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false                                // 231
        else $parent.find('.active').removeClass('active')                                                             // 232
      }                                                                                                                // 233
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')                         // 234
    } else {                                                                                                           // 235
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))                                            // 236
    }                                                                                                                  // 237
                                                                                                                       // 238
    if (changed) this.$element.toggleClass('active')                                                                   // 239
  }                                                                                                                    // 240
                                                                                                                       // 241
                                                                                                                       // 242
  // BUTTON PLUGIN DEFINITION                                                                                          // 243
  // ========================                                                                                          // 244
                                                                                                                       // 245
  function Plugin(option) {                                                                                            // 246
    return this.each(function () {                                                                                     // 247
      var $this   = $(this)                                                                                            // 248
      var data    = $this.data('bs.button')                                                                            // 249
      var options = typeof option == 'object' && option                                                                // 250
                                                                                                                       // 251
      if (!data) $this.data('bs.button', (data = new Button(this, options)))                                           // 252
                                                                                                                       // 253
      if (option == 'toggle') data.toggle()                                                                            // 254
      else if (option) data.setState(option)                                                                           // 255
    })                                                                                                                 // 256
  }                                                                                                                    // 257
                                                                                                                       // 258
  var old = $.fn.button                                                                                                // 259
                                                                                                                       // 260
  $.fn.button             = Plugin                                                                                     // 261
  $.fn.button.Constructor = Button                                                                                     // 262
                                                                                                                       // 263
                                                                                                                       // 264
  // BUTTON NO CONFLICT                                                                                                // 265
  // ==================                                                                                                // 266
                                                                                                                       // 267
  $.fn.button.noConflict = function () {                                                                               // 268
    $.fn.button = old                                                                                                  // 269
    return this                                                                                                        // 270
  }                                                                                                                    // 271
                                                                                                                       // 272
                                                                                                                       // 273
  // BUTTON DATA-API                                                                                                   // 274
  // ===============                                                                                                   // 275
                                                                                                                       // 276
  $(document)                                                                                                          // 277
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {                                          // 278
      var $btn = $(e.target)                                                                                           // 279
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')                                                           // 280
      Plugin.call($btn, 'toggle')                                                                                      // 281
      e.preventDefault()                                                                                               // 282
    })                                                                                                                 // 283
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {                  // 284
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))                                    // 285
    })                                                                                                                 // 286
                                                                                                                       // 287
}(jQuery);                                                                                                             // 288
                                                                                                                       // 289
/* ========================================================================                                            // 290
 * Bootstrap: carousel.js v3.3.1                                                                                       // 291
 * http://getbootstrap.com/javascript/#carousel                                                                        // 292
 * ========================================================================                                            // 293
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 294
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 295
 * ======================================================================== */                                         // 296
                                                                                                                       // 297
                                                                                                                       // 298
+function ($) {                                                                                                        // 299
  'use strict';                                                                                                        // 300
                                                                                                                       // 301
  // CAROUSEL CLASS DEFINITION                                                                                         // 302
  // =========================                                                                                         // 303
                                                                                                                       // 304
  var Carousel = function (element, options) {                                                                         // 305
    this.$element    = $(element)                                                                                      // 306
    this.$indicators = this.$element.find('.carousel-indicators')                                                      // 307
    this.options     = options                                                                                         // 308
    this.paused      =                                                                                                 // 309
    this.sliding     =                                                                                                 // 310
    this.interval    =                                                                                                 // 311
    this.$active     =                                                                                                 // 312
    this.$items      = null                                                                                            // 313
                                                                                                                       // 314
    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))                      // 315
                                                                                                                       // 316
    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element                    // 317
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))                                                         // 318
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))                                                         // 319
  }                                                                                                                    // 320
                                                                                                                       // 321
  Carousel.VERSION  = '3.3.1'                                                                                          // 322
                                                                                                                       // 323
  Carousel.TRANSITION_DURATION = 600                                                                                   // 324
                                                                                                                       // 325
  Carousel.DEFAULTS = {                                                                                                // 326
    interval: 5000,                                                                                                    // 327
    pause: 'hover',                                                                                                    // 328
    wrap: true,                                                                                                        // 329
    keyboard: true                                                                                                     // 330
  }                                                                                                                    // 331
                                                                                                                       // 332
  Carousel.prototype.keydown = function (e) {                                                                          // 333
    if (/input|textarea/i.test(e.target.tagName)) return                                                               // 334
    switch (e.which) {                                                                                                 // 335
      case 37: this.prev(); break                                                                                      // 336
      case 39: this.next(); break                                                                                      // 337
      default: return                                                                                                  // 338
    }                                                                                                                  // 339
                                                                                                                       // 340
    e.preventDefault()                                                                                                 // 341
  }                                                                                                                    // 342
                                                                                                                       // 343
  Carousel.prototype.cycle = function (e) {                                                                            // 344
    e || (this.paused = false)                                                                                         // 345
                                                                                                                       // 346
    this.interval && clearInterval(this.interval)                                                                      // 347
                                                                                                                       // 348
    this.options.interval                                                                                              // 349
      && !this.paused                                                                                                  // 350
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))                                // 351
                                                                                                                       // 352
    return this                                                                                                        // 353
  }                                                                                                                    // 354
                                                                                                                       // 355
  Carousel.prototype.getItemIndex = function (item) {                                                                  // 356
    this.$items = item.parent().children('.item')                                                                      // 357
    return this.$items.index(item || this.$active)                                                                     // 358
  }                                                                                                                    // 359
                                                                                                                       // 360
  Carousel.prototype.getItemForDirection = function (direction, active) {                                              // 361
    var activeIndex = this.getItemIndex(active)                                                                        // 362
    var willWrap = (direction == 'prev' && activeIndex === 0)                                                          // 363
                || (direction == 'next' && activeIndex == (this.$items.length - 1))                                    // 364
    if (willWrap && !this.options.wrap) return active                                                                  // 365
    var delta = direction == 'prev' ? -1 : 1                                                                           // 366
    var itemIndex = (activeIndex + delta) % this.$items.length                                                         // 367
    return this.$items.eq(itemIndex)                                                                                   // 368
  }                                                                                                                    // 369
                                                                                                                       // 370
  Carousel.prototype.to = function (pos) {                                                                             // 371
    var that        = this                                                                                             // 372
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))                             // 373
                                                                                                                       // 374
    if (pos > (this.$items.length - 1) || pos < 0) return                                                              // 375
                                                                                                                       // 376
    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"  // 377
    if (activeIndex == pos) return this.pause().cycle()                                                                // 378
                                                                                                                       // 379
    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))                                        // 380
  }                                                                                                                    // 381
                                                                                                                       // 382
  Carousel.prototype.pause = function (e) {                                                                            // 383
    e || (this.paused = true)                                                                                          // 384
                                                                                                                       // 385
    if (this.$element.find('.next, .prev').length && $.support.transition) {                                           // 386
      this.$element.trigger($.support.transition.end)                                                                  // 387
      this.cycle(true)                                                                                                 // 388
    }                                                                                                                  // 389
                                                                                                                       // 390
    this.interval = clearInterval(this.interval)                                                                       // 391
                                                                                                                       // 392
    return this                                                                                                        // 393
  }                                                                                                                    // 394
                                                                                                                       // 395
  Carousel.prototype.next = function () {                                                                              // 396
    if (this.sliding) return                                                                                           // 397
    return this.slide('next')                                                                                          // 398
  }                                                                                                                    // 399
                                                                                                                       // 400
  Carousel.prototype.prev = function () {                                                                              // 401
    if (this.sliding) return                                                                                           // 402
    return this.slide('prev')                                                                                          // 403
  }                                                                                                                    // 404
                                                                                                                       // 405
  Carousel.prototype.slide = function (type, next) {                                                                   // 406
    var $active   = this.$element.find('.item.active')                                                                 // 407
    var $next     = next || this.getItemForDirection(type, $active)                                                    // 408
    var isCycling = this.interval                                                                                      // 409
    var direction = type == 'next' ? 'left' : 'right'                                                                  // 410
    var that      = this                                                                                               // 411
                                                                                                                       // 412
    if ($next.hasClass('active')) return (this.sliding = false)                                                        // 413
                                                                                                                       // 414
    var relatedTarget = $next[0]                                                                                       // 415
    var slideEvent = $.Event('slide.bs.carousel', {                                                                    // 416
      relatedTarget: relatedTarget,                                                                                    // 417
      direction: direction                                                                                             // 418
    })                                                                                                                 // 419
    this.$element.trigger(slideEvent)                                                                                  // 420
    if (slideEvent.isDefaultPrevented()) return                                                                        // 421
                                                                                                                       // 422
    this.sliding = true                                                                                                // 423
                                                                                                                       // 424
    isCycling && this.pause()                                                                                          // 425
                                                                                                                       // 426
    if (this.$indicators.length) {                                                                                     // 427
      this.$indicators.find('.active').removeClass('active')                                                           // 428
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])                                    // 429
      $nextIndicator && $nextIndicator.addClass('active')                                                              // 430
    }                                                                                                                  // 431
                                                                                                                       // 432
    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid" // 433
    if ($.support.transition && this.$element.hasClass('slide')) {                                                     // 434
      $next.addClass(type)                                                                                             // 435
      $next[0].offsetWidth // force reflow                                                                             // 436
      $active.addClass(direction)                                                                                      // 437
      $next.addClass(direction)                                                                                        // 438
      $active                                                                                                          // 439
        .one('bsTransitionEnd', function () {                                                                          // 440
          $next.removeClass([type, direction].join(' ')).addClass('active')                                            // 441
          $active.removeClass(['active', direction].join(' '))                                                         // 442
          that.sliding = false                                                                                         // 443
          setTimeout(function () {                                                                                     // 444
            that.$element.trigger(slidEvent)                                                                           // 445
          }, 0)                                                                                                        // 446
        })                                                                                                             // 447
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)                                                            // 448
    } else {                                                                                                           // 449
      $active.removeClass('active')                                                                                    // 450
      $next.addClass('active')                                                                                         // 451
      this.sliding = false                                                                                             // 452
      this.$element.trigger(slidEvent)                                                                                 // 453
    }                                                                                                                  // 454
                                                                                                                       // 455
    isCycling && this.cycle()                                                                                          // 456
                                                                                                                       // 457
    return this                                                                                                        // 458
  }                                                                                                                    // 459
                                                                                                                       // 460
                                                                                                                       // 461
  // CAROUSEL PLUGIN DEFINITION                                                                                        // 462
  // ==========================                                                                                        // 463
                                                                                                                       // 464
  function Plugin(option) {                                                                                            // 465
    return this.each(function () {                                                                                     // 466
      var $this   = $(this)                                                                                            // 467
      var data    = $this.data('bs.carousel')                                                                          // 468
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)                 // 469
      var action  = typeof option == 'string' ? option : options.slide                                                 // 470
                                                                                                                       // 471
      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))                                       // 472
      if (typeof option == 'number') data.to(option)                                                                   // 473
      else if (action) data[action]()                                                                                  // 474
      else if (options.interval) data.pause().cycle()                                                                  // 475
    })                                                                                                                 // 476
  }                                                                                                                    // 477
                                                                                                                       // 478
  var old = $.fn.carousel                                                                                              // 479
                                                                                                                       // 480
  $.fn.carousel             = Plugin                                                                                   // 481
  $.fn.carousel.Constructor = Carousel                                                                                 // 482
                                                                                                                       // 483
                                                                                                                       // 484
  // CAROUSEL NO CONFLICT                                                                                              // 485
  // ====================                                                                                              // 486
                                                                                                                       // 487
  $.fn.carousel.noConflict = function () {                                                                             // 488
    $.fn.carousel = old                                                                                                // 489
    return this                                                                                                        // 490
  }                                                                                                                    // 491
                                                                                                                       // 492
                                                                                                                       // 493
  // CAROUSEL DATA-API                                                                                                 // 494
  // =================                                                                                                 // 495
                                                                                                                       // 496
  var clickHandler = function (e) {                                                                                    // 497
    var href                                                                                                           // 498
    var $this   = $(this)                                                                                              // 499
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return                                                                          // 501
    var options = $.extend({}, $target.data(), $this.data())                                                           // 502
    var slideIndex = $this.attr('data-slide-to')                                                                       // 503
    if (slideIndex) options.interval = false                                                                           // 504
                                                                                                                       // 505
    Plugin.call($target, options)                                                                                      // 506
                                                                                                                       // 507
    if (slideIndex) {                                                                                                  // 508
      $target.data('bs.carousel').to(slideIndex)                                                                       // 509
    }                                                                                                                  // 510
                                                                                                                       // 511
    e.preventDefault()                                                                                                 // 512
  }                                                                                                                    // 513
                                                                                                                       // 514
  $(document)                                                                                                          // 515
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)                                                    // 516
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)                                                 // 517
                                                                                                                       // 518
  $(window).on('load', function () {                                                                                   // 519
    $('[data-ride="carousel"]').each(function () {                                                                     // 520
      var $carousel = $(this)                                                                                          // 521
      Plugin.call($carousel, $carousel.data())                                                                         // 522
    })                                                                                                                 // 523
  })                                                                                                                   // 524
                                                                                                                       // 525
}(jQuery);                                                                                                             // 526
                                                                                                                       // 527
/* ========================================================================                                            // 528
 * Bootstrap: collapse.js v3.3.1                                                                                       // 529
 * http://getbootstrap.com/javascript/#collapse                                                                        // 530
 * ========================================================================                                            // 531
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 532
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 533
 * ======================================================================== */                                         // 534
                                                                                                                       // 535
                                                                                                                       // 536
+function ($) {                                                                                                        // 537
  'use strict';                                                                                                        // 538
                                                                                                                       // 539
  // COLLAPSE PUBLIC CLASS DEFINITION                                                                                  // 540
  // ================================                                                                                  // 541
                                                                                                                       // 542
  var Collapse = function (element, options) {                                                                         // 543
    this.$element      = $(element)                                                                                    // 544
    this.options       = $.extend({}, Collapse.DEFAULTS, options)                                                      // 545
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null                                                                                          // 547
                                                                                                                       // 548
    if (this.options.parent) {                                                                                         // 549
      this.$parent = this.getParent()                                                                                  // 550
    } else {                                                                                                           // 551
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)                                                      // 552
    }                                                                                                                  // 553
                                                                                                                       // 554
    if (this.options.toggle) this.toggle()                                                                             // 555
  }                                                                                                                    // 556
                                                                                                                       // 557
  Collapse.VERSION  = '3.3.1'                                                                                          // 558
                                                                                                                       // 559
  Collapse.TRANSITION_DURATION = 350                                                                                   // 560
                                                                                                                       // 561
  Collapse.DEFAULTS = {                                                                                                // 562
    toggle: true,                                                                                                      // 563
    trigger: '[data-toggle="collapse"]'                                                                                // 564
  }                                                                                                                    // 565
                                                                                                                       // 566
  Collapse.prototype.dimension = function () {                                                                         // 567
    var hasWidth = this.$element.hasClass('width')                                                                     // 568
    return hasWidth ? 'width' : 'height'                                                                               // 569
  }                                                                                                                    // 570
                                                                                                                       // 571
  Collapse.prototype.show = function () {                                                                              // 572
    if (this.transitioning || this.$element.hasClass('in')) return                                                     // 573
                                                                                                                       // 574
    var activesData                                                                                                    // 575
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')                         // 576
                                                                                                                       // 577
    if (actives && actives.length) {                                                                                   // 578
      activesData = actives.data('bs.collapse')                                                                        // 579
      if (activesData && activesData.transitioning) return                                                             // 580
    }                                                                                                                  // 581
                                                                                                                       // 582
    var startEvent = $.Event('show.bs.collapse')                                                                       // 583
    this.$element.trigger(startEvent)                                                                                  // 584
    if (startEvent.isDefaultPrevented()) return                                                                        // 585
                                                                                                                       // 586
    if (actives && actives.length) {                                                                                   // 587
      Plugin.call(actives, 'hide')                                                                                     // 588
      activesData || actives.data('bs.collapse', null)                                                                 // 589
    }                                                                                                                  // 590
                                                                                                                       // 591
    var dimension = this.dimension()                                                                                   // 592
                                                                                                                       // 593
    this.$element                                                                                                      // 594
      .removeClass('collapse')                                                                                         // 595
      .addClass('collapsing')[dimension](0)                                                                            // 596
      .attr('aria-expanded', true)                                                                                     // 597
                                                                                                                       // 598
    this.$trigger                                                                                                      // 599
      .removeClass('collapsed')                                                                                        // 600
      .attr('aria-expanded', true)                                                                                     // 601
                                                                                                                       // 602
    this.transitioning = 1                                                                                             // 603
                                                                                                                       // 604
    var complete = function () {                                                                                       // 605
      this.$element                                                                                                    // 606
        .removeClass('collapsing')                                                                                     // 607
        .addClass('collapse in')[dimension]('')                                                                        // 608
      this.transitioning = 0                                                                                           // 609
      this.$element                                                                                                    // 610
        .trigger('shown.bs.collapse')                                                                                  // 611
    }                                                                                                                  // 612
                                                                                                                       // 613
    if (!$.support.transition) return complete.call(this)                                                              // 614
                                                                                                                       // 615
    var scrollSize = $.camelCase(['scroll', dimension].join('-'))                                                      // 616
                                                                                                                       // 617
    this.$element                                                                                                      // 618
      .one('bsTransitionEnd', $.proxy(complete, this))                                                                 // 619
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])                     // 620
  }                                                                                                                    // 621
                                                                                                                       // 622
  Collapse.prototype.hide = function () {                                                                              // 623
    if (this.transitioning || !this.$element.hasClass('in')) return                                                    // 624
                                                                                                                       // 625
    var startEvent = $.Event('hide.bs.collapse')                                                                       // 626
    this.$element.trigger(startEvent)                                                                                  // 627
    if (startEvent.isDefaultPrevented()) return                                                                        // 628
                                                                                                                       // 629
    var dimension = this.dimension()                                                                                   // 630
                                                                                                                       // 631
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight                                               // 632
                                                                                                                       // 633
    this.$element                                                                                                      // 634
      .addClass('collapsing')                                                                                          // 635
      .removeClass('collapse in')                                                                                      // 636
      .attr('aria-expanded', false)                                                                                    // 637
                                                                                                                       // 638
    this.$trigger                                                                                                      // 639
      .addClass('collapsed')                                                                                           // 640
      .attr('aria-expanded', false)                                                                                    // 641
                                                                                                                       // 642
    this.transitioning = 1                                                                                             // 643
                                                                                                                       // 644
    var complete = function () {                                                                                       // 645
      this.transitioning = 0                                                                                           // 646
      this.$element                                                                                                    // 647
        .removeClass('collapsing')                                                                                     // 648
        .addClass('collapse')                                                                                          // 649
        .trigger('hidden.bs.collapse')                                                                                 // 650
    }                                                                                                                  // 651
                                                                                                                       // 652
    if (!$.support.transition) return complete.call(this)                                                              // 653
                                                                                                                       // 654
    this.$element                                                                                                      // 655
      [dimension](0)                                                                                                   // 656
      .one('bsTransitionEnd', $.proxy(complete, this))                                                                 // 657
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)                                                              // 658
  }                                                                                                                    // 659
                                                                                                                       // 660
  Collapse.prototype.toggle = function () {                                                                            // 661
    this[this.$element.hasClass('in') ? 'hide' : 'show']()                                                             // 662
  }                                                                                                                    // 663
                                                                                                                       // 664
  Collapse.prototype.getParent = function () {                                                                         // 665
    return $(this.options.parent)                                                                                      // 666
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')                                     // 667
      .each($.proxy(function (i, element) {                                                                            // 668
        var $element = $(element)                                                                                      // 669
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)                                        // 670
      }, this))                                                                                                        // 671
      .end()                                                                                                           // 672
  }                                                                                                                    // 673
                                                                                                                       // 674
  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {                                        // 675
    var isOpen = $element.hasClass('in')                                                                               // 676
                                                                                                                       // 677
    $element.attr('aria-expanded', isOpen)                                                                             // 678
    $trigger                                                                                                           // 679
      .toggleClass('collapsed', !isOpen)                                                                               // 680
      .attr('aria-expanded', isOpen)                                                                                   // 681
  }                                                                                                                    // 682
                                                                                                                       // 683
  function getTargetFromTrigger($trigger) {                                                                            // 684
    var href                                                                                                           // 685
    var target = $trigger.attr('data-target')                                                                          // 686
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7                         // 687
                                                                                                                       // 688
    return $(target)                                                                                                   // 689
  }                                                                                                                    // 690
                                                                                                                       // 691
                                                                                                                       // 692
  // COLLAPSE PLUGIN DEFINITION                                                                                        // 693
  // ==========================                                                                                        // 694
                                                                                                                       // 695
  function Plugin(option) {                                                                                            // 696
    return this.each(function () {                                                                                     // 697
      var $this   = $(this)                                                                                            // 698
      var data    = $this.data('bs.collapse')                                                                          // 699
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)                 // 700
                                                                                                                       // 701
      if (!data && options.toggle && option == 'show') options.toggle = false                                          // 702
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))                                       // 703
      if (typeof option == 'string') data[option]()                                                                    // 704
    })                                                                                                                 // 705
  }                                                                                                                    // 706
                                                                                                                       // 707
  var old = $.fn.collapse                                                                                              // 708
                                                                                                                       // 709
  $.fn.collapse             = Plugin                                                                                   // 710
  $.fn.collapse.Constructor = Collapse                                                                                 // 711
                                                                                                                       // 712
                                                                                                                       // 713
  // COLLAPSE NO CONFLICT                                                                                              // 714
  // ====================                                                                                              // 715
                                                                                                                       // 716
  $.fn.collapse.noConflict = function () {                                                                             // 717
    $.fn.collapse = old                                                                                                // 718
    return this                                                                                                        // 719
  }                                                                                                                    // 720
                                                                                                                       // 721
                                                                                                                       // 722
  // COLLAPSE DATA-API                                                                                                 // 723
  // =================                                                                                                 // 724
                                                                                                                       // 725
  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {                              // 726
    var $this   = $(this)                                                                                              // 727
                                                                                                                       // 728
    if (!$this.attr('data-target')) e.preventDefault()                                                                 // 729
                                                                                                                       // 730
    var $target = getTargetFromTrigger($this)                                                                          // 731
    var data    = $target.data('bs.collapse')                                                                          // 732
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })                                      // 733
                                                                                                                       // 734
    Plugin.call($target, option)                                                                                       // 735
  })                                                                                                                   // 736
                                                                                                                       // 737
}(jQuery);                                                                                                             // 738
                                                                                                                       // 739
/* ========================================================================                                            // 740
 * Bootstrap: dropdown.js v3.3.1                                                                                       // 741
 * http://getbootstrap.com/javascript/#dropdowns                                                                       // 742
 * ========================================================================                                            // 743
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 744
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 745
 * ======================================================================== */                                         // 746
                                                                                                                       // 747
                                                                                                                       // 748
+function ($) {                                                                                                        // 749
  'use strict';                                                                                                        // 750
                                                                                                                       // 751
  // DROPDOWN CLASS DEFINITION                                                                                         // 752
  // =========================                                                                                         // 753
                                                                                                                       // 754
  var backdrop = '.dropdown-backdrop'                                                                                  // 755
  var toggle   = '[data-toggle="dropdown"]'                                                                            // 756
  var Dropdown = function (element) {                                                                                  // 757
    $(element).on('click.bs.dropdown', this.toggle)                                                                    // 758
  }                                                                                                                    // 759
                                                                                                                       // 760
  Dropdown.VERSION = '3.3.1'                                                                                           // 761
                                                                                                                       // 762
  Dropdown.prototype.toggle = function (e) {                                                                           // 763
    var $this = $(this)                                                                                                // 764
                                                                                                                       // 765
    if ($this.is('.disabled, :disabled')) return                                                                       // 766
                                                                                                                       // 767
    var $parent  = getParent($this)                                                                                    // 768
    var isActive = $parent.hasClass('open')                                                                            // 769
                                                                                                                       // 770
    clearMenus()                                                                                                       // 771
                                                                                                                       // 772
    if (!isActive) {                                                                                                   // 773
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {                      // 774
        // if mobile we use a backdrop because click events don't delegate                                             // 775
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)                             // 776
      }                                                                                                                // 777
                                                                                                                       // 778
      var relatedTarget = { relatedTarget: this }                                                                      // 779
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))                                                  // 780
                                                                                                                       // 781
      if (e.isDefaultPrevented()) return                                                                               // 782
                                                                                                                       // 783
      $this                                                                                                            // 784
        .trigger('focus')                                                                                              // 785
        .attr('aria-expanded', 'true')                                                                                 // 786
                                                                                                                       // 787
      $parent                                                                                                          // 788
        .toggleClass('open')                                                                                           // 789
        .trigger('shown.bs.dropdown', relatedTarget)                                                                   // 790
    }                                                                                                                  // 791
                                                                                                                       // 792
    return false                                                                                                       // 793
  }                                                                                                                    // 794
                                                                                                                       // 795
  Dropdown.prototype.keydown = function (e) {                                                                          // 796
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return                             // 797
                                                                                                                       // 798
    var $this = $(this)                                                                                                // 799
                                                                                                                       // 800
    e.preventDefault()                                                                                                 // 801
    e.stopPropagation()                                                                                                // 802
                                                                                                                       // 803
    if ($this.is('.disabled, :disabled')) return                                                                       // 804
                                                                                                                       // 805
    var $parent  = getParent($this)                                                                                    // 806
    var isActive = $parent.hasClass('open')                                                                            // 807
                                                                                                                       // 808
    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {                                                 // 809
      if (e.which == 27) $parent.find(toggle).trigger('focus')                                                         // 810
      return $this.trigger('click')                                                                                    // 811
    }                                                                                                                  // 812
                                                                                                                       // 813
    var desc = ' li:not(.divider):visible a'                                                                           // 814
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)                                    // 815
                                                                                                                       // 816
    if (!$items.length) return                                                                                         // 817
                                                                                                                       // 818
    var index = $items.index(e.target)                                                                                 // 819
                                                                                                                       // 820
    if (e.which == 38 && index > 0)                 index--                        // up                               // 821
    if (e.which == 40 && index < $items.length - 1) index++                        // down                             // 822
    if (!~index)                                      index = 0                                                        // 823
                                                                                                                       // 824
    $items.eq(index).trigger('focus')                                                                                  // 825
  }                                                                                                                    // 826
                                                                                                                       // 827
  function clearMenus(e) {                                                                                             // 828
    if (e && e.which === 3) return                                                                                     // 829
    $(backdrop).remove()                                                                                               // 830
    $(toggle).each(function () {                                                                                       // 831
      var $this         = $(this)                                                                                      // 832
      var $parent       = getParent($this)                                                                             // 833
      var relatedTarget = { relatedTarget: this }                                                                      // 834
                                                                                                                       // 835
      if (!$parent.hasClass('open')) return                                                                            // 836
                                                                                                                       // 837
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))                                                  // 838
                                                                                                                       // 839
      if (e.isDefaultPrevented()) return                                                                               // 840
                                                                                                                       // 841
      $this.attr('aria-expanded', 'false')                                                                             // 842
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)                                         // 843
    })                                                                                                                 // 844
  }                                                                                                                    // 845
                                                                                                                       // 846
  function getParent($this) {                                                                                          // 847
    var selector = $this.attr('data-target')                                                                           // 848
                                                                                                                       // 849
    if (!selector) {                                                                                                   // 850
      selector = $this.attr('href')                                                                                    // 851
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7     // 852
    }                                                                                                                  // 853
                                                                                                                       // 854
    var $parent = selector && $(selector)                                                                              // 855
                                                                                                                       // 856
    return $parent && $parent.length ? $parent : $this.parent()                                                        // 857
  }                                                                                                                    // 858
                                                                                                                       // 859
                                                                                                                       // 860
  // DROPDOWN PLUGIN DEFINITION                                                                                        // 861
  // ==========================                                                                                        // 862
                                                                                                                       // 863
  function Plugin(option) {                                                                                            // 864
    return this.each(function () {                                                                                     // 865
      var $this = $(this)                                                                                              // 866
      var data  = $this.data('bs.dropdown')                                                                            // 867
                                                                                                                       // 868
      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))                                                // 869
      if (typeof option == 'string') data[option].call($this)                                                          // 870
    })                                                                                                                 // 871
  }                                                                                                                    // 872
                                                                                                                       // 873
  var old = $.fn.dropdown                                                                                              // 874
                                                                                                                       // 875
  $.fn.dropdown             = Plugin                                                                                   // 876
  $.fn.dropdown.Constructor = Dropdown                                                                                 // 877
                                                                                                                       // 878
                                                                                                                       // 879
  // DROPDOWN NO CONFLICT                                                                                              // 880
  // ====================                                                                                              // 881
                                                                                                                       // 882
  $.fn.dropdown.noConflict = function () {                                                                             // 883
    $.fn.dropdown = old                                                                                                // 884
    return this                                                                                                        // 885
  }                                                                                                                    // 886
                                                                                                                       // 887
                                                                                                                       // 888
  // APPLY TO STANDARD DROPDOWN ELEMENTS                                                                               // 889
  // ===================================                                                                               // 890
                                                                                                                       // 891
  $(document)                                                                                                          // 892
    .on('click.bs.dropdown.data-api', clearMenus)                                                                      // 893
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })                          // 894
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)                                               // 895
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)                                            // 896
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)                                   // 897
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)                                // 898
                                                                                                                       // 899
}(jQuery);                                                                                                             // 900
                                                                                                                       // 901
/* ========================================================================                                            // 902
 * Bootstrap: modal.js v3.3.1                                                                                          // 903
 * http://getbootstrap.com/javascript/#modals                                                                          // 904
 * ========================================================================                                            // 905
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 906
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 907
 * ======================================================================== */                                         // 908
                                                                                                                       // 909
                                                                                                                       // 910
+function ($) {                                                                                                        // 911
  'use strict';                                                                                                        // 912
                                                                                                                       // 913
  // MODAL CLASS DEFINITION                                                                                            // 914
  // ======================                                                                                            // 915
                                                                                                                       // 916
  var Modal = function (element, options) {                                                                            // 917
    this.options        = options                                                                                      // 918
    this.$body          = $(document.body)                                                                             // 919
    this.$element       = $(element)                                                                                   // 920
    this.$backdrop      =                                                                                              // 921
    this.isShown        = null                                                                                         // 922
    this.scrollbarWidth = 0                                                                                            // 923
                                                                                                                       // 924
    if (this.options.remote) {                                                                                         // 925
      this.$element                                                                                                    // 926
        .find('.modal-content')                                                                                        // 927
        .load(this.options.remote, $.proxy(function () {                                                               // 928
          this.$element.trigger('loaded.bs.modal')                                                                     // 929
        }, this))                                                                                                      // 930
    }                                                                                                                  // 931
  }                                                                                                                    // 932
                                                                                                                       // 933
  Modal.VERSION  = '3.3.1'                                                                                             // 934
                                                                                                                       // 935
  Modal.TRANSITION_DURATION = 300                                                                                      // 936
  Modal.BACKDROP_TRANSITION_DURATION = 150                                                                             // 937
                                                                                                                       // 938
  Modal.DEFAULTS = {                                                                                                   // 939
    backdrop: true,                                                                                                    // 940
    keyboard: true,                                                                                                    // 941
    show: true                                                                                                         // 942
  }                                                                                                                    // 943
                                                                                                                       // 944
  Modal.prototype.toggle = function (_relatedTarget) {                                                                 // 945
    return this.isShown ? this.hide() : this.show(_relatedTarget)                                                      // 946
  }                                                                                                                    // 947
                                                                                                                       // 948
  Modal.prototype.show = function (_relatedTarget) {                                                                   // 949
    var that = this                                                                                                    // 950
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })                                             // 951
                                                                                                                       // 952
    this.$element.trigger(e)                                                                                           // 953
                                                                                                                       // 954
    if (this.isShown || e.isDefaultPrevented()) return                                                                 // 955
                                                                                                                       // 956
    this.isShown = true                                                                                                // 957
                                                                                                                       // 958
    this.checkScrollbar()                                                                                              // 959
    this.setScrollbar()                                                                                                // 960
    this.$body.addClass('modal-open')                                                                                  // 961
                                                                                                                       // 962
    this.escape()                                                                                                      // 963
    this.resize()                                                                                                      // 964
                                                                                                                       // 965
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))                     // 966
                                                                                                                       // 967
    this.backdrop(function () {                                                                                        // 968
      var transition = $.support.transition && that.$element.hasClass('fade')                                          // 969
                                                                                                                       // 970
      if (!that.$element.parent().length) {                                                                            // 971
        that.$element.appendTo(that.$body) // don't move modals dom position                                           // 972
      }                                                                                                                // 973
                                                                                                                       // 974
      that.$element                                                                                                    // 975
        .show()                                                                                                        // 976
        .scrollTop(0)                                                                                                  // 977
                                                                                                                       // 978
      if (that.options.backdrop) that.adjustBackdrop()                                                                 // 979
      that.adjustDialog()                                                                                              // 980
                                                                                                                       // 981
      if (transition) {                                                                                                // 982
        that.$element[0].offsetWidth // force reflow                                                                   // 983
      }                                                                                                                // 984
                                                                                                                       // 985
      that.$element                                                                                                    // 986
        .addClass('in')                                                                                                // 987
        .attr('aria-hidden', false)                                                                                    // 988
                                                                                                                       // 989
      that.enforceFocus()                                                                                              // 990
                                                                                                                       // 991
      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })                                             // 992
                                                                                                                       // 993
      transition ?                                                                                                     // 994
        that.$element.find('.modal-dialog') // wait for modal to slide in                                              // 995
          .one('bsTransitionEnd', function () {                                                                        // 996
            that.$element.trigger('focus').trigger(e)                                                                  // 997
          })                                                                                                           // 998
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :                                                           // 999
        that.$element.trigger('focus').trigger(e)                                                                      // 1000
    })                                                                                                                 // 1001
  }                                                                                                                    // 1002
                                                                                                                       // 1003
  Modal.prototype.hide = function (e) {                                                                                // 1004
    if (e) e.preventDefault()                                                                                          // 1005
                                                                                                                       // 1006
    e = $.Event('hide.bs.modal')                                                                                       // 1007
                                                                                                                       // 1008
    this.$element.trigger(e)                                                                                           // 1009
                                                                                                                       // 1010
    if (!this.isShown || e.isDefaultPrevented()) return                                                                // 1011
                                                                                                                       // 1012
    this.isShown = false                                                                                               // 1013
                                                                                                                       // 1014
    this.escape()                                                                                                      // 1015
    this.resize()                                                                                                      // 1016
                                                                                                                       // 1017
    $(document).off('focusin.bs.modal')                                                                                // 1018
                                                                                                                       // 1019
    this.$element                                                                                                      // 1020
      .removeClass('in')                                                                                               // 1021
      .attr('aria-hidden', true)                                                                                       // 1022
      .off('click.dismiss.bs.modal')                                                                                   // 1023
                                                                                                                       // 1024
    $.support.transition && this.$element.hasClass('fade') ?                                                           // 1025
      this.$element                                                                                                    // 1026
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))                                                         // 1027
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :                                                             // 1028
      this.hideModal()                                                                                                 // 1029
  }                                                                                                                    // 1030
                                                                                                                       // 1031
  Modal.prototype.enforceFocus = function () {                                                                         // 1032
    $(document)                                                                                                        // 1033
      .off('focusin.bs.modal') // guard against infinite focus loop                                                    // 1034
      .on('focusin.bs.modal', $.proxy(function (e) {                                                                   // 1035
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {                                    // 1036
          this.$element.trigger('focus')                                                                               // 1037
        }                                                                                                              // 1038
      }, this))                                                                                                        // 1039
  }                                                                                                                    // 1040
                                                                                                                       // 1041
  Modal.prototype.escape = function () {                                                                               // 1042
    if (this.isShown && this.options.keyboard) {                                                                       // 1043
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {                                              // 1044
        e.which == 27 && this.hide()                                                                                   // 1045
      }, this))                                                                                                        // 1046
    } else if (!this.isShown) {                                                                                        // 1047
      this.$element.off('keydown.dismiss.bs.modal')                                                                    // 1048
    }                                                                                                                  // 1049
  }                                                                                                                    // 1050
                                                                                                                       // 1051
  Modal.prototype.resize = function () {                                                                               // 1052
    if (this.isShown) {                                                                                                // 1053
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))                                                // 1054
    } else {                                                                                                           // 1055
      $(window).off('resize.bs.modal')                                                                                 // 1056
    }                                                                                                                  // 1057
  }                                                                                                                    // 1058
                                                                                                                       // 1059
  Modal.prototype.hideModal = function () {                                                                            // 1060
    var that = this                                                                                                    // 1061
    this.$element.hide()                                                                                               // 1062
    this.backdrop(function () {                                                                                        // 1063
      that.$body.removeClass('modal-open')                                                                             // 1064
      that.resetAdjustments()                                                                                          // 1065
      that.resetScrollbar()                                                                                            // 1066
      that.$element.trigger('hidden.bs.modal')                                                                         // 1067
    })                                                                                                                 // 1068
  }                                                                                                                    // 1069
                                                                                                                       // 1070
  Modal.prototype.removeBackdrop = function () {                                                                       // 1071
    this.$backdrop && this.$backdrop.remove()                                                                          // 1072
    this.$backdrop = null                                                                                              // 1073
  }                                                                                                                    // 1074
                                                                                                                       // 1075
  Modal.prototype.backdrop = function (callback) {                                                                     // 1076
    var that = this                                                                                                    // 1077
    var animate = this.$element.hasClass('fade') ? 'fade' : ''                                                         // 1078
                                                                                                                       // 1079
    if (this.isShown && this.options.backdrop) {                                                                       // 1080
      var doAnimate = $.support.transition && animate                                                                  // 1081
                                                                                                                       // 1082
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')                                             // 1083
        .prependTo(this.$element)                                                                                      // 1084
        .on('click.dismiss.bs.modal', $.proxy(function (e) {                                                           // 1085
          if (e.target !== e.currentTarget) return                                                                     // 1086
          this.options.backdrop == 'static'                                                                            // 1087
            ? this.$element[0].focus.call(this.$element[0])                                                            // 1088
            : this.hide.call(this)                                                                                     // 1089
        }, this))                                                                                                      // 1090
                                                                                                                       // 1091
      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow                                                     // 1092
                                                                                                                       // 1093
      this.$backdrop.addClass('in')                                                                                    // 1094
                                                                                                                       // 1095
      if (!callback) return                                                                                            // 1096
                                                                                                                       // 1097
      doAnimate ?                                                                                                      // 1098
        this.$backdrop                                                                                                 // 1099
          .one('bsTransitionEnd', callback)                                                                            // 1100
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :                                                  // 1101
        callback()                                                                                                     // 1102
                                                                                                                       // 1103
    } else if (!this.isShown && this.$backdrop) {                                                                      // 1104
      this.$backdrop.removeClass('in')                                                                                 // 1105
                                                                                                                       // 1106
      var callbackRemove = function () {                                                                               // 1107
        that.removeBackdrop()                                                                                          // 1108
        callback && callback()                                                                                         // 1109
      }                                                                                                                // 1110
      $.support.transition && this.$element.hasClass('fade') ?                                                         // 1111
        this.$backdrop                                                                                                 // 1112
          .one('bsTransitionEnd', callbackRemove)                                                                      // 1113
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :                                                  // 1114
        callbackRemove()                                                                                               // 1115
                                                                                                                       // 1116
    } else if (callback) {                                                                                             // 1117
      callback()                                                                                                       // 1118
    }                                                                                                                  // 1119
  }                                                                                                                    // 1120
                                                                                                                       // 1121
  // these following methods are used to handle overflowing modals                                                     // 1122
                                                                                                                       // 1123
  Modal.prototype.handleUpdate = function () {                                                                         // 1124
    if (this.options.backdrop) this.adjustBackdrop()                                                                   // 1125
    this.adjustDialog()                                                                                                // 1126
  }                                                                                                                    // 1127
                                                                                                                       // 1128
  Modal.prototype.adjustBackdrop = function () {                                                                       // 1129
    this.$backdrop                                                                                                     // 1130
      .css('height', 0)                                                                                                // 1131
      .css('height', this.$element[0].scrollHeight)                                                                    // 1132
  }                                                                                                                    // 1133
                                                                                                                       // 1134
  Modal.prototype.adjustDialog = function () {                                                                         // 1135
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight                     // 1136
                                                                                                                       // 1137
    this.$element.css({                                                                                                // 1138
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',                          // 1139
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''                           // 1140
    })                                                                                                                 // 1141
  }                                                                                                                    // 1142
                                                                                                                       // 1143
  Modal.prototype.resetAdjustments = function () {                                                                     // 1144
    this.$element.css({                                                                                                // 1145
      paddingLeft: '',                                                                                                 // 1146
      paddingRight: ''                                                                                                 // 1147
    })                                                                                                                 // 1148
  }                                                                                                                    // 1149
                                                                                                                       // 1150
  Modal.prototype.checkScrollbar = function () {                                                                       // 1151
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight                        // 1152
    this.scrollbarWidth = this.measureScrollbar()                                                                      // 1153
  }                                                                                                                    // 1154
                                                                                                                       // 1155
  Modal.prototype.setScrollbar = function () {                                                                         // 1156
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)                                                 // 1157
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)                         // 1158
  }                                                                                                                    // 1159
                                                                                                                       // 1160
  Modal.prototype.resetScrollbar = function () {                                                                       // 1161
    this.$body.css('padding-right', '')                                                                                // 1162
  }                                                                                                                    // 1163
                                                                                                                       // 1164
  Modal.prototype.measureScrollbar = function () { // thx walsh                                                        // 1165
    var scrollDiv = document.createElement('div')                                                                      // 1166
    scrollDiv.className = 'modal-scrollbar-measure'                                                                    // 1167
    this.$body.append(scrollDiv)                                                                                       // 1168
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth                                                 // 1169
    this.$body[0].removeChild(scrollDiv)                                                                               // 1170
    return scrollbarWidth                                                                                              // 1171
  }                                                                                                                    // 1172
                                                                                                                       // 1173
                                                                                                                       // 1174
  // MODAL PLUGIN DEFINITION                                                                                           // 1175
  // =======================                                                                                           // 1176
                                                                                                                       // 1177
  function Plugin(option, _relatedTarget) {                                                                            // 1178
    return this.each(function () {                                                                                     // 1179
      var $this   = $(this)                                                                                            // 1180
      var data    = $this.data('bs.modal')                                                                             // 1181
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)                    // 1182
                                                                                                                       // 1183
      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))                                             // 1184
      if (typeof option == 'string') data[option](_relatedTarget)                                                      // 1185
      else if (options.show) data.show(_relatedTarget)                                                                 // 1186
    })                                                                                                                 // 1187
  }                                                                                                                    // 1188
                                                                                                                       // 1189
  var old = $.fn.modal                                                                                                 // 1190
                                                                                                                       // 1191
  $.fn.modal             = Plugin                                                                                      // 1192
  $.fn.modal.Constructor = Modal                                                                                       // 1193
                                                                                                                       // 1194
                                                                                                                       // 1195
  // MODAL NO CONFLICT                                                                                                 // 1196
  // =================                                                                                                 // 1197
                                                                                                                       // 1198
  $.fn.modal.noConflict = function () {                                                                                // 1199
    $.fn.modal = old                                                                                                   // 1200
    return this                                                                                                        // 1201
  }                                                                                                                    // 1202
                                                                                                                       // 1203
                                                                                                                       // 1204
  // MODAL DATA-API                                                                                                    // 1205
  // ==============                                                                                                    // 1206
                                                                                                                       // 1207
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {                                    // 1208
    var $this   = $(this)                                                                                              // 1209
    var href    = $this.attr('href')                                                                                   // 1210
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7        // 1211
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
                                                                                                                       // 1213
    if ($this.is('a')) e.preventDefault()                                                                              // 1214
                                                                                                                       // 1215
    $target.one('show.bs.modal', function (showEvent) {                                                                // 1216
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown      // 1217
      $target.one('hidden.bs.modal', function () {                                                                     // 1218
        $this.is(':visible') && $this.trigger('focus')                                                                 // 1219
      })                                                                                                               // 1220
    })                                                                                                                 // 1221
    Plugin.call($target, option, this)                                                                                 // 1222
  })                                                                                                                   // 1223
                                                                                                                       // 1224
}(jQuery);                                                                                                             // 1225
                                                                                                                       // 1226
/* ========================================================================                                            // 1227
 * Bootstrap: tooltip.js v3.3.1                                                                                        // 1228
 * http://getbootstrap.com/javascript/#tooltip                                                                         // 1229
 * Inspired by the original jQuery.tipsy by Jason Frame                                                                // 1230
 * ========================================================================                                            // 1231
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 1232
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 1233
 * ======================================================================== */                                         // 1234
                                                                                                                       // 1235
                                                                                                                       // 1236
+function ($) {                                                                                                        // 1237
  'use strict';                                                                                                        // 1238
                                                                                                                       // 1239
  // TOOLTIP PUBLIC CLASS DEFINITION                                                                                   // 1240
  // ===============================                                                                                   // 1241
                                                                                                                       // 1242
  var Tooltip = function (element, options) {                                                                          // 1243
    this.type       =                                                                                                  // 1244
    this.options    =                                                                                                  // 1245
    this.enabled    =                                                                                                  // 1246
    this.timeout    =                                                                                                  // 1247
    this.hoverState =                                                                                                  // 1248
    this.$element   = null                                                                                             // 1249
                                                                                                                       // 1250
    this.init('tooltip', element, options)                                                                             // 1251
  }                                                                                                                    // 1252
                                                                                                                       // 1253
  Tooltip.VERSION  = '3.3.1'                                                                                           // 1254
                                                                                                                       // 1255
  Tooltip.TRANSITION_DURATION = 150                                                                                    // 1256
                                                                                                                       // 1257
  Tooltip.DEFAULTS = {                                                                                                 // 1258
    animation: true,                                                                                                   // 1259
    placement: 'top',                                                                                                  // 1260
    selector: false,                                                                                                   // 1261
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',                                                                                            // 1263
    title: '',                                                                                                         // 1264
    delay: 0,                                                                                                          // 1265
    html: false,                                                                                                       // 1266
    container: false,                                                                                                  // 1267
    viewport: {                                                                                                        // 1268
      selector: 'body',                                                                                                // 1269
      padding: 0                                                                                                       // 1270
    }                                                                                                                  // 1271
  }                                                                                                                    // 1272
                                                                                                                       // 1273
  Tooltip.prototype.init = function (type, element, options) {                                                         // 1274
    this.enabled   = true                                                                                              // 1275
    this.type      = type                                                                                              // 1276
    this.$element  = $(element)                                                                                        // 1277
    this.options   = this.getOptions(options)                                                                          // 1278
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)               // 1279
                                                                                                                       // 1280
    var triggers = this.options.trigger.split(' ')                                                                     // 1281
                                                                                                                       // 1282
    for (var i = triggers.length; i--;) {                                                                              // 1283
      var trigger = triggers[i]                                                                                        // 1284
                                                                                                                       // 1285
      if (trigger == 'click') {                                                                                        // 1286
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))                      // 1287
      } else if (trigger != 'manual') {                                                                                // 1288
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'                                                   // 1289
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'                                                  // 1290
                                                                                                                       // 1291
        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))                 // 1292
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))                 // 1293
      }                                                                                                                // 1294
    }                                                                                                                  // 1295
                                                                                                                       // 1296
    this.options.selector ?                                                                                            // 1297
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :                              // 1298
      this.fixTitle()                                                                                                  // 1299
  }                                                                                                                    // 1300
                                                                                                                       // 1301
  Tooltip.prototype.getDefaults = function () {                                                                        // 1302
    return Tooltip.DEFAULTS                                                                                            // 1303
  }                                                                                                                    // 1304
                                                                                                                       // 1305
  Tooltip.prototype.getOptions = function (options) {                                                                  // 1306
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)                                          // 1307
                                                                                                                       // 1308
    if (options.delay && typeof options.delay == 'number') {                                                           // 1309
      options.delay = {                                                                                                // 1310
        show: options.delay,                                                                                           // 1311
        hide: options.delay                                                                                            // 1312
      }                                                                                                                // 1313
    }                                                                                                                  // 1314
                                                                                                                       // 1315
    return options                                                                                                     // 1316
  }                                                                                                                    // 1317
                                                                                                                       // 1318
  Tooltip.prototype.getDelegateOptions = function () {                                                                 // 1319
    var options  = {}                                                                                                  // 1320
    var defaults = this.getDefaults()                                                                                  // 1321
                                                                                                                       // 1322
    this._options && $.each(this._options, function (key, value) {                                                     // 1323
      if (defaults[key] != value) options[key] = value                                                                 // 1324
    })                                                                                                                 // 1325
                                                                                                                       // 1326
    return options                                                                                                     // 1327
  }                                                                                                                    // 1328
                                                                                                                       // 1329
  Tooltip.prototype.enter = function (obj) {                                                                           // 1330
    var self = obj instanceof this.constructor ?                                                                       // 1331
      obj : $(obj.currentTarget).data('bs.' + this.type)                                                               // 1332
                                                                                                                       // 1333
    if (self && self.$tip && self.$tip.is(':visible')) {                                                               // 1334
      self.hoverState = 'in'                                                                                           // 1335
      return                                                                                                           // 1336
    }                                                                                                                  // 1337
                                                                                                                       // 1338
    if (!self) {                                                                                                       // 1339
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())                                        // 1340
      $(obj.currentTarget).data('bs.' + this.type, self)                                                               // 1341
    }                                                                                                                  // 1342
                                                                                                                       // 1343
    clearTimeout(self.timeout)                                                                                         // 1344
                                                                                                                       // 1345
    self.hoverState = 'in'                                                                                             // 1346
                                                                                                                       // 1347
    if (!self.options.delay || !self.options.delay.show) return self.show()                                            // 1348
                                                                                                                       // 1349
    self.timeout = setTimeout(function () {                                                                            // 1350
      if (self.hoverState == 'in') self.show()                                                                         // 1351
    }, self.options.delay.show)                                                                                        // 1352
  }                                                                                                                    // 1353
                                                                                                                       // 1354
  Tooltip.prototype.leave = function (obj) {                                                                           // 1355
    var self = obj instanceof this.constructor ?                                                                       // 1356
      obj : $(obj.currentTarget).data('bs.' + this.type)                                                               // 1357
                                                                                                                       // 1358
    if (!self) {                                                                                                       // 1359
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())                                        // 1360
      $(obj.currentTarget).data('bs.' + this.type, self)                                                               // 1361
    }                                                                                                                  // 1362
                                                                                                                       // 1363
    clearTimeout(self.timeout)                                                                                         // 1364
                                                                                                                       // 1365
    self.hoverState = 'out'                                                                                            // 1366
                                                                                                                       // 1367
    if (!self.options.delay || !self.options.delay.hide) return self.hide()                                            // 1368
                                                                                                                       // 1369
    self.timeout = setTimeout(function () {                                                                            // 1370
      if (self.hoverState == 'out') self.hide()                                                                        // 1371
    }, self.options.delay.hide)                                                                                        // 1372
  }                                                                                                                    // 1373
                                                                                                                       // 1374
  Tooltip.prototype.show = function () {                                                                               // 1375
    var e = $.Event('show.bs.' + this.type)                                                                            // 1376
                                                                                                                       // 1377
    if (this.hasContent() && this.enabled) {                                                                           // 1378
      this.$element.trigger(e)                                                                                         // 1379
                                                                                                                       // 1380
      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])                         // 1381
      if (e.isDefaultPrevented() || !inDom) return                                                                     // 1382
      var that = this                                                                                                  // 1383
                                                                                                                       // 1384
      var $tip = this.tip()                                                                                            // 1385
                                                                                                                       // 1386
      var tipId = this.getUID(this.type)                                                                               // 1387
                                                                                                                       // 1388
      this.setContent()                                                                                                // 1389
      $tip.attr('id', tipId)                                                                                           // 1390
      this.$element.attr('aria-describedby', tipId)                                                                    // 1391
                                                                                                                       // 1392
      if (this.options.animation) $tip.addClass('fade')                                                                // 1393
                                                                                                                       // 1394
      var placement = typeof this.options.placement == 'function' ?                                                    // 1395
        this.options.placement.call(this, $tip[0], this.$element[0]) :                                                 // 1396
        this.options.placement                                                                                         // 1397
                                                                                                                       // 1398
      var autoToken = /\s?auto?\s?/i                                                                                   // 1399
      var autoPlace = autoToken.test(placement)                                                                        // 1400
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'                                             // 1401
                                                                                                                       // 1402
      $tip                                                                                                             // 1403
        .detach()                                                                                                      // 1404
        .css({ top: 0, left: 0, display: 'block' })                                                                    // 1405
        .addClass(placement)                                                                                           // 1406
        .data('bs.' + this.type, this)                                                                                 // 1407
                                                                                                                       // 1408
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)                 // 1409
                                                                                                                       // 1410
      var pos          = this.getPosition()                                                                            // 1411
      var actualWidth  = $tip[0].offsetWidth                                                                           // 1412
      var actualHeight = $tip[0].offsetHeight                                                                          // 1413
                                                                                                                       // 1414
      if (autoPlace) {                                                                                                 // 1415
        var orgPlacement = placement                                                                                   // 1416
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()                 // 1417
        var containerDim = this.getPosition($container)                                                                // 1418
                                                                                                                       // 1419
        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :              // 1420
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :              // 1421
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :              // 1422
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :              // 1423
                    placement                                                                                          // 1424
                                                                                                                       // 1425
        $tip                                                                                                           // 1426
          .removeClass(orgPlacement)                                                                                   // 1427
          .addClass(placement)                                                                                         // 1428
      }                                                                                                                // 1429
                                                                                                                       // 1430
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)                       // 1431
                                                                                                                       // 1432
      this.applyPlacement(calculatedOffset, placement)                                                                 // 1433
                                                                                                                       // 1434
      var complete = function () {                                                                                     // 1435
        var prevHoverState = that.hoverState                                                                           // 1436
        that.$element.trigger('shown.bs.' + that.type)                                                                 // 1437
        that.hoverState = null                                                                                         // 1438
                                                                                                                       // 1439
        if (prevHoverState == 'out') that.leave(that)                                                                  // 1440
      }                                                                                                                // 1441
                                                                                                                       // 1442
      $.support.transition && this.$tip.hasClass('fade') ?                                                             // 1443
        $tip                                                                                                           // 1444
          .one('bsTransitionEnd', complete)                                                                            // 1445
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :                                                         // 1446
        complete()                                                                                                     // 1447
    }                                                                                                                  // 1448
  }                                                                                                                    // 1449
                                                                                                                       // 1450
  Tooltip.prototype.applyPlacement = function (offset, placement) {                                                    // 1451
    var $tip   = this.tip()                                                                                            // 1452
    var width  = $tip[0].offsetWidth                                                                                   // 1453
    var height = $tip[0].offsetHeight                                                                                  // 1454
                                                                                                                       // 1455
    // manually read margins because getBoundingClientRect includes difference                                         // 1456
    var marginTop = parseInt($tip.css('margin-top'), 10)                                                               // 1457
    var marginLeft = parseInt($tip.css('margin-left'), 10)                                                             // 1458
                                                                                                                       // 1459
    // we must check for NaN for ie 8/9                                                                                // 1460
    if (isNaN(marginTop))  marginTop  = 0                                                                              // 1461
    if (isNaN(marginLeft)) marginLeft = 0                                                                              // 1462
                                                                                                                       // 1463
    offset.top  = offset.top  + marginTop                                                                              // 1464
    offset.left = offset.left + marginLeft                                                                             // 1465
                                                                                                                       // 1466
    // $.fn.offset doesn't round pixel values                                                                          // 1467
    // so we use setOffset directly with our own function B-0                                                          // 1468
    $.offset.setOffset($tip[0], $.extend({                                                                             // 1469
      using: function (props) {                                                                                        // 1470
        $tip.css({                                                                                                     // 1471
          top: Math.round(props.top),                                                                                  // 1472
          left: Math.round(props.left)                                                                                 // 1473
        })                                                                                                             // 1474
      }                                                                                                                // 1475
    }, offset), 0)                                                                                                     // 1476
                                                                                                                       // 1477
    $tip.addClass('in')                                                                                                // 1478
                                                                                                                       // 1479
    // check to see if placing tip in new offset caused the tip to resize itself                                       // 1480
    var actualWidth  = $tip[0].offsetWidth                                                                             // 1481
    var actualHeight = $tip[0].offsetHeight                                                                            // 1482
                                                                                                                       // 1483
    if (placement == 'top' && actualHeight != height) {                                                                // 1484
      offset.top = offset.top + height - actualHeight                                                                  // 1485
    }                                                                                                                  // 1486
                                                                                                                       // 1487
    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)                            // 1488
                                                                                                                       // 1489
    if (delta.left) offset.left += delta.left                                                                          // 1490
    else offset.top += delta.top                                                                                       // 1491
                                                                                                                       // 1492
    var isVertical          = /top|bottom/.test(placement)                                                             // 1493
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'                                              // 1495
                                                                                                                       // 1496
    $tip.offset(offset)                                                                                                // 1497
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)                                            // 1498
  }                                                                                                                    // 1499
                                                                                                                       // 1500
  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {                                         // 1501
    this.arrow()                                                                                                       // 1502
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')                                          // 1503
      .css(isHorizontal ? 'top' : 'left', '')                                                                          // 1504
  }                                                                                                                    // 1505
                                                                                                                       // 1506
  Tooltip.prototype.setContent = function () {                                                                         // 1507
    var $tip  = this.tip()                                                                                             // 1508
    var title = this.getTitle()                                                                                        // 1509
                                                                                                                       // 1510
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)                                            // 1511
    $tip.removeClass('fade in top bottom left right')                                                                  // 1512
  }                                                                                                                    // 1513
                                                                                                                       // 1514
  Tooltip.prototype.hide = function (callback) {                                                                       // 1515
    var that = this                                                                                                    // 1516
    var $tip = this.tip()                                                                                              // 1517
    var e    = $.Event('hide.bs.' + this.type)                                                                         // 1518
                                                                                                                       // 1519
    function complete() {                                                                                              // 1520
      if (that.hoverState != 'in') $tip.detach()                                                                       // 1521
      that.$element                                                                                                    // 1522
        .removeAttr('aria-describedby')                                                                                // 1523
        .trigger('hidden.bs.' + that.type)                                                                             // 1524
      callback && callback()                                                                                           // 1525
    }                                                                                                                  // 1526
                                                                                                                       // 1527
    this.$element.trigger(e)                                                                                           // 1528
                                                                                                                       // 1529
    if (e.isDefaultPrevented()) return                                                                                 // 1530
                                                                                                                       // 1531
    $tip.removeClass('in')                                                                                             // 1532
                                                                                                                       // 1533
    $.support.transition && this.$tip.hasClass('fade') ?                                                               // 1534
      $tip                                                                                                             // 1535
        .one('bsTransitionEnd', complete)                                                                              // 1536
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :                                                           // 1537
      complete()                                                                                                       // 1538
                                                                                                                       // 1539
    this.hoverState = null                                                                                             // 1540
                                                                                                                       // 1541
    return this                                                                                                        // 1542
  }                                                                                                                    // 1543
                                                                                                                       // 1544
  Tooltip.prototype.fixTitle = function () {                                                                           // 1545
    var $e = this.$element                                                                                             // 1546
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {                                     // 1547
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')                                         // 1548
    }                                                                                                                  // 1549
  }                                                                                                                    // 1550
                                                                                                                       // 1551
  Tooltip.prototype.hasContent = function () {                                                                         // 1552
    return this.getTitle()                                                                                             // 1553
  }                                                                                                                    // 1554
                                                                                                                       // 1555
  Tooltip.prototype.getPosition = function ($element) {                                                                // 1556
    $element   = $element || this.$element                                                                             // 1557
                                                                                                                       // 1558
    var el     = $element[0]                                                                                           // 1559
    var isBody = el.tagName == 'BODY'                                                                                  // 1560
                                                                                                                       // 1561
    var elRect    = el.getBoundingClientRect()                                                                         // 1562
    if (elRect.width == null) {                                                                                        // 1563
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })         // 1565
    }                                                                                                                  // 1566
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()                                                   // 1567
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null                           // 1569
                                                                                                                       // 1570
    return $.extend({}, elRect, scroll, outerDims, elOffset)                                                           // 1571
  }                                                                                                                    // 1572
                                                                                                                       // 1573
  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {                       // 1574
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }  // 1578
                                                                                                                       // 1579
  }                                                                                                                    // 1580
                                                                                                                       // 1581
  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {                  // 1582
    var delta = { top: 0, left: 0 }                                                                                    // 1583
    if (!this.$viewport) return delta                                                                                  // 1584
                                                                                                                       // 1585
    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0                                  // 1586
    var viewportDimensions = this.getPosition(this.$viewport)                                                          // 1587
                                                                                                                       // 1588
    if (/right|left/.test(placement)) {                                                                                // 1589
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll                                     // 1590
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight                      // 1591
      if (topEdgeOffset < viewportDimensions.top) { // top overflow                                                    // 1592
        delta.top = viewportDimensions.top - topEdgeOffset                                                             // 1593
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow           // 1594
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset                              // 1595
      }                                                                                                                // 1596
    } else {                                                                                                           // 1597
      var leftEdgeOffset  = pos.left - viewportPadding                                                                 // 1598
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth                                                   // 1599
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow                                                 // 1600
        delta.left = viewportDimensions.left - leftEdgeOffset                                                          // 1601
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow                                       // 1602
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset                              // 1603
      }                                                                                                                // 1604
    }                                                                                                                  // 1605
                                                                                                                       // 1606
    return delta                                                                                                       // 1607
  }                                                                                                                    // 1608
                                                                                                                       // 1609
  Tooltip.prototype.getTitle = function () {                                                                           // 1610
    var title                                                                                                          // 1611
    var $e = this.$element                                                                                             // 1612
    var o  = this.options                                                                                              // 1613
                                                                                                                       // 1614
    title = $e.attr('data-original-title')                                                                             // 1615
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)                                               // 1616
                                                                                                                       // 1617
    return title                                                                                                       // 1618
  }                                                                                                                    // 1619
                                                                                                                       // 1620
  Tooltip.prototype.getUID = function (prefix) {                                                                       // 1621
    do prefix += ~~(Math.random() * 1000000)                                                                           // 1622
    while (document.getElementById(prefix))                                                                            // 1623
    return prefix                                                                                                      // 1624
  }                                                                                                                    // 1625
                                                                                                                       // 1626
  Tooltip.prototype.tip = function () {                                                                                // 1627
    return (this.$tip = this.$tip || $(this.options.template))                                                         // 1628
  }                                                                                                                    // 1629
                                                                                                                       // 1630
  Tooltip.prototype.arrow = function () {                                                                              // 1631
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))                                            // 1632
  }                                                                                                                    // 1633
                                                                                                                       // 1634
  Tooltip.prototype.enable = function () {                                                                             // 1635
    this.enabled = true                                                                                                // 1636
  }                                                                                                                    // 1637
                                                                                                                       // 1638
  Tooltip.prototype.disable = function () {                                                                            // 1639
    this.enabled = false                                                                                               // 1640
  }                                                                                                                    // 1641
                                                                                                                       // 1642
  Tooltip.prototype.toggleEnabled = function () {                                                                      // 1643
    this.enabled = !this.enabled                                                                                       // 1644
  }                                                                                                                    // 1645
                                                                                                                       // 1646
  Tooltip.prototype.toggle = function (e) {                                                                            // 1647
    var self = this                                                                                                    // 1648
    if (e) {                                                                                                           // 1649
      self = $(e.currentTarget).data('bs.' + this.type)                                                                // 1650
      if (!self) {                                                                                                     // 1651
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())                                        // 1652
        $(e.currentTarget).data('bs.' + this.type, self)                                                               // 1653
      }                                                                                                                // 1654
    }                                                                                                                  // 1655
                                                                                                                       // 1656
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)                                                    // 1657
  }                                                                                                                    // 1658
                                                                                                                       // 1659
  Tooltip.prototype.destroy = function () {                                                                            // 1660
    var that = this                                                                                                    // 1661
    clearTimeout(this.timeout)                                                                                         // 1662
    this.hide(function () {                                                                                            // 1663
      that.$element.off('.' + that.type).removeData('bs.' + that.type)                                                 // 1664
    })                                                                                                                 // 1665
  }                                                                                                                    // 1666
                                                                                                                       // 1667
                                                                                                                       // 1668
  // TOOLTIP PLUGIN DEFINITION                                                                                         // 1669
  // =========================                                                                                         // 1670
                                                                                                                       // 1671
  function Plugin(option) {                                                                                            // 1672
    return this.each(function () {                                                                                     // 1673
      var $this    = $(this)                                                                                           // 1674
      var data     = $this.data('bs.tooltip')                                                                          // 1675
      var options  = typeof option == 'object' && option                                                               // 1676
      var selector = options && options.selector                                                                       // 1677
                                                                                                                       // 1678
      if (!data && option == 'destroy') return                                                                         // 1679
      if (selector) {                                                                                                  // 1680
        if (!data) $this.data('bs.tooltip', (data = {}))                                                               // 1681
        if (!data[selector]) data[selector] = new Tooltip(this, options)                                               // 1682
      } else {                                                                                                         // 1683
        if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))                                       // 1684
      }                                                                                                                // 1685
      if (typeof option == 'string') data[option]()                                                                    // 1686
    })                                                                                                                 // 1687
  }                                                                                                                    // 1688
                                                                                                                       // 1689
  var old = $.fn.tooltip                                                                                               // 1690
                                                                                                                       // 1691
  $.fn.tooltip             = Plugin                                                                                    // 1692
  $.fn.tooltip.Constructor = Tooltip                                                                                   // 1693
                                                                                                                       // 1694
                                                                                                                       // 1695
  // TOOLTIP NO CONFLICT                                                                                               // 1696
  // ===================                                                                                               // 1697
                                                                                                                       // 1698
  $.fn.tooltip.noConflict = function () {                                                                              // 1699
    $.fn.tooltip = old                                                                                                 // 1700
    return this                                                                                                        // 1701
  }                                                                                                                    // 1702
                                                                                                                       // 1703
}(jQuery);                                                                                                             // 1704
                                                                                                                       // 1705
/* ========================================================================                                            // 1706
 * Bootstrap: popover.js v3.3.1                                                                                        // 1707
 * http://getbootstrap.com/javascript/#popovers                                                                        // 1708
 * ========================================================================                                            // 1709
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 1710
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 1711
 * ======================================================================== */                                         // 1712
                                                                                                                       // 1713
                                                                                                                       // 1714
+function ($) {                                                                                                        // 1715
  'use strict';                                                                                                        // 1716
                                                                                                                       // 1717
  // POPOVER PUBLIC CLASS DEFINITION                                                                                   // 1718
  // ===============================                                                                                   // 1719
                                                                                                                       // 1720
  var Popover = function (element, options) {                                                                          // 1721
    this.init('popover', element, options)                                                                             // 1722
  }                                                                                                                    // 1723
                                                                                                                       // 1724
  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')                                                    // 1725
                                                                                                                       // 1726
  Popover.VERSION  = '3.3.1'                                                                                           // 1727
                                                                                                                       // 1728
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {                                                 // 1729
    placement: 'right',                                                                                                // 1730
    trigger: 'click',                                                                                                  // 1731
    content: '',                                                                                                       // 1732
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })                                                                                                                   // 1734
                                                                                                                       // 1735
                                                                                                                       // 1736
  // NOTE: POPOVER EXTENDS tooltip.js                                                                                  // 1737
  // ================================                                                                                  // 1738
                                                                                                                       // 1739
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)                                                 // 1740
                                                                                                                       // 1741
  Popover.prototype.constructor = Popover                                                                              // 1742
                                                                                                                       // 1743
  Popover.prototype.getDefaults = function () {                                                                        // 1744
    return Popover.DEFAULTS                                                                                            // 1745
  }                                                                                                                    // 1746
                                                                                                                       // 1747
  Popover.prototype.setContent = function () {                                                                         // 1748
    var $tip    = this.tip()                                                                                           // 1749
    var title   = this.getTitle()                                                                                      // 1750
    var content = this.getContent()                                                                                    // 1751
                                                                                                                       // 1752
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)                                            // 1753
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events   // 1754
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'                                    // 1755
    ](content)                                                                                                         // 1756
                                                                                                                       // 1757
    $tip.removeClass('fade top bottom left right in')                                                                  // 1758
                                                                                                                       // 1759
    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do                                       // 1760
    // this manually by checking the contents.                                                                         // 1761
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()                                        // 1762
  }                                                                                                                    // 1763
                                                                                                                       // 1764
  Popover.prototype.hasContent = function () {                                                                         // 1765
    return this.getTitle() || this.getContent()                                                                        // 1766
  }                                                                                                                    // 1767
                                                                                                                       // 1768
  Popover.prototype.getContent = function () {                                                                         // 1769
    var $e = this.$element                                                                                             // 1770
    var o  = this.options                                                                                              // 1771
                                                                                                                       // 1772
    return $e.attr('data-content')                                                                                     // 1773
      || (typeof o.content == 'function' ?                                                                             // 1774
            o.content.call($e[0]) :                                                                                    // 1775
            o.content)                                                                                                 // 1776
  }                                                                                                                    // 1777
                                                                                                                       // 1778
  Popover.prototype.arrow = function () {                                                                              // 1779
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))                                                    // 1780
  }                                                                                                                    // 1781
                                                                                                                       // 1782
  Popover.prototype.tip = function () {                                                                                // 1783
    if (!this.$tip) this.$tip = $(this.options.template)                                                               // 1784
    return this.$tip                                                                                                   // 1785
  }                                                                                                                    // 1786
                                                                                                                       // 1787
                                                                                                                       // 1788
  // POPOVER PLUGIN DEFINITION                                                                                         // 1789
  // =========================                                                                                         // 1790
                                                                                                                       // 1791
  function Plugin(option) {                                                                                            // 1792
    return this.each(function () {                                                                                     // 1793
      var $this    = $(this)                                                                                           // 1794
      var data     = $this.data('bs.popover')                                                                          // 1795
      var options  = typeof option == 'object' && option                                                               // 1796
      var selector = options && options.selector                                                                       // 1797
                                                                                                                       // 1798
      if (!data && option == 'destroy') return                                                                         // 1799
      if (selector) {                                                                                                  // 1800
        if (!data) $this.data('bs.popover', (data = {}))                                                               // 1801
        if (!data[selector]) data[selector] = new Popover(this, options)                                               // 1802
      } else {                                                                                                         // 1803
        if (!data) $this.data('bs.popover', (data = new Popover(this, options)))                                       // 1804
      }                                                                                                                // 1805
      if (typeof option == 'string') data[option]()                                                                    // 1806
    })                                                                                                                 // 1807
  }                                                                                                                    // 1808
                                                                                                                       // 1809
  var old = $.fn.popover                                                                                               // 1810
                                                                                                                       // 1811
  $.fn.popover             = Plugin                                                                                    // 1812
  $.fn.popover.Constructor = Popover                                                                                   // 1813
                                                                                                                       // 1814
                                                                                                                       // 1815
  // POPOVER NO CONFLICT                                                                                               // 1816
  // ===================                                                                                               // 1817
                                                                                                                       // 1818
  $.fn.popover.noConflict = function () {                                                                              // 1819
    $.fn.popover = old                                                                                                 // 1820
    return this                                                                                                        // 1821
  }                                                                                                                    // 1822
                                                                                                                       // 1823
}(jQuery);                                                                                                             // 1824
                                                                                                                       // 1825
/* ========================================================================                                            // 1826
 * Bootstrap: scrollspy.js v3.3.1                                                                                      // 1827
 * http://getbootstrap.com/javascript/#scrollspy                                                                       // 1828
 * ========================================================================                                            // 1829
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 1830
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 1831
 * ======================================================================== */                                         // 1832
                                                                                                                       // 1833
                                                                                                                       // 1834
+function ($) {                                                                                                        // 1835
  'use strict';                                                                                                        // 1836
                                                                                                                       // 1837
  // SCROLLSPY CLASS DEFINITION                                                                                        // 1838
  // ==========================                                                                                        // 1839
                                                                                                                       // 1840
  function ScrollSpy(element, options) {                                                                               // 1841
    var process  = $.proxy(this.process, this)                                                                         // 1842
                                                                                                                       // 1843
    this.$body          = $('body')                                                                                    // 1844
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)                                               // 1845
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)                                                    // 1846
    this.selector       = (this.options.target || '') + ' .nav li > a'                                                 // 1847
    this.offsets        = []                                                                                           // 1848
    this.targets        = []                                                                                           // 1849
    this.activeTarget   = null                                                                                         // 1850
    this.scrollHeight   = 0                                                                                            // 1851
                                                                                                                       // 1852
    this.$scrollElement.on('scroll.bs.scrollspy', process)                                                             // 1853
    this.refresh()                                                                                                     // 1854
    this.process()                                                                                                     // 1855
  }                                                                                                                    // 1856
                                                                                                                       // 1857
  ScrollSpy.VERSION  = '3.3.1'                                                                                         // 1858
                                                                                                                       // 1859
  ScrollSpy.DEFAULTS = {                                                                                               // 1860
    offset: 10                                                                                                         // 1861
  }                                                                                                                    // 1862
                                                                                                                       // 1863
  ScrollSpy.prototype.getScrollHeight = function () {                                                                  // 1864
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }                                                                                                                    // 1866
                                                                                                                       // 1867
  ScrollSpy.prototype.refresh = function () {                                                                          // 1868
    var offsetMethod = 'offset'                                                                                        // 1869
    var offsetBase   = 0                                                                                               // 1870
                                                                                                                       // 1871
    if (!$.isWindow(this.$scrollElement[0])) {                                                                         // 1872
      offsetMethod = 'position'                                                                                        // 1873
      offsetBase   = this.$scrollElement.scrollTop()                                                                   // 1874
    }                                                                                                                  // 1875
                                                                                                                       // 1876
    this.offsets = []                                                                                                  // 1877
    this.targets = []                                                                                                  // 1878
    this.scrollHeight = this.getScrollHeight()                                                                         // 1879
                                                                                                                       // 1880
    var self     = this                                                                                                // 1881
                                                                                                                       // 1882
    this.$body                                                                                                         // 1883
      .find(this.selector)                                                                                             // 1884
      .map(function () {                                                                                               // 1885
        var $el   = $(this)                                                                                            // 1886
        var href  = $el.data('target') || $el.attr('href')                                                             // 1887
        var $href = /^#./.test(href) && $(href)                                                                        // 1888
                                                                                                                       // 1889
        return ($href                                                                                                  // 1890
          && $href.length                                                                                              // 1891
          && $href.is(':visible')                                                                                      // 1892
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null                                                 // 1893
      })                                                                                                               // 1894
      .sort(function (a, b) { return a[0] - b[0] })                                                                    // 1895
      .each(function () {                                                                                              // 1896
        self.offsets.push(this[0])                                                                                     // 1897
        self.targets.push(this[1])                                                                                     // 1898
      })                                                                                                               // 1899
  }                                                                                                                    // 1900
                                                                                                                       // 1901
  ScrollSpy.prototype.process = function () {                                                                          // 1902
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset                                           // 1903
    var scrollHeight = this.getScrollHeight()                                                                          // 1904
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()                               // 1905
    var offsets      = this.offsets                                                                                    // 1906
    var targets      = this.targets                                                                                    // 1907
    var activeTarget = this.activeTarget                                                                               // 1908
    var i                                                                                                              // 1909
                                                                                                                       // 1910
    if (this.scrollHeight != scrollHeight) {                                                                           // 1911
      this.refresh()                                                                                                   // 1912
    }                                                                                                                  // 1913
                                                                                                                       // 1914
    if (scrollTop >= maxScroll) {                                                                                      // 1915
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)                                     // 1916
    }                                                                                                                  // 1917
                                                                                                                       // 1918
    if (activeTarget && scrollTop < offsets[0]) {                                                                      // 1919
      this.activeTarget = null                                                                                         // 1920
      return this.clear()                                                                                              // 1921
    }                                                                                                                  // 1922
                                                                                                                       // 1923
    for (i = offsets.length; i--;) {                                                                                   // 1924
      activeTarget != targets[i]                                                                                       // 1925
        && scrollTop >= offsets[i]                                                                                     // 1926
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])                                                            // 1927
        && this.activate(targets[i])                                                                                   // 1928
    }                                                                                                                  // 1929
  }                                                                                                                    // 1930
                                                                                                                       // 1931
  ScrollSpy.prototype.activate = function (target) {                                                                   // 1932
    this.activeTarget = target                                                                                         // 1933
                                                                                                                       // 1934
    this.clear()                                                                                                       // 1935
                                                                                                                       // 1936
    var selector = this.selector +                                                                                     // 1937
        '[data-target="' + target + '"],' +                                                                            // 1938
        this.selector + '[href="' + target + '"]'                                                                      // 1939
                                                                                                                       // 1940
    var active = $(selector)                                                                                           // 1941
      .parents('li')                                                                                                   // 1942
      .addClass('active')                                                                                              // 1943
                                                                                                                       // 1944
    if (active.parent('.dropdown-menu').length) {                                                                      // 1945
      active = active                                                                                                  // 1946
        .closest('li.dropdown')                                                                                        // 1947
        .addClass('active')                                                                                            // 1948
    }                                                                                                                  // 1949
                                                                                                                       // 1950
    active.trigger('activate.bs.scrollspy')                                                                            // 1951
  }                                                                                                                    // 1952
                                                                                                                       // 1953
  ScrollSpy.prototype.clear = function () {                                                                            // 1954
    $(this.selector)                                                                                                   // 1955
      .parentsUntil(this.options.target, '.active')                                                                    // 1956
      .removeClass('active')                                                                                           // 1957
  }                                                                                                                    // 1958
                                                                                                                       // 1959
                                                                                                                       // 1960
  // SCROLLSPY PLUGIN DEFINITION                                                                                       // 1961
  // ===========================                                                                                       // 1962
                                                                                                                       // 1963
  function Plugin(option) {                                                                                            // 1964
    return this.each(function () {                                                                                     // 1965
      var $this   = $(this)                                                                                            // 1966
      var data    = $this.data('bs.scrollspy')                                                                         // 1967
      var options = typeof option == 'object' && option                                                                // 1968
                                                                                                                       // 1969
      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))                                     // 1970
      if (typeof option == 'string') data[option]()                                                                    // 1971
    })                                                                                                                 // 1972
  }                                                                                                                    // 1973
                                                                                                                       // 1974
  var old = $.fn.scrollspy                                                                                             // 1975
                                                                                                                       // 1976
  $.fn.scrollspy             = Plugin                                                                                  // 1977
  $.fn.scrollspy.Constructor = ScrollSpy                                                                               // 1978
                                                                                                                       // 1979
                                                                                                                       // 1980
  // SCROLLSPY NO CONFLICT                                                                                             // 1981
  // =====================                                                                                             // 1982
                                                                                                                       // 1983
  $.fn.scrollspy.noConflict = function () {                                                                            // 1984
    $.fn.scrollspy = old                                                                                               // 1985
    return this                                                                                                        // 1986
  }                                                                                                                    // 1987
                                                                                                                       // 1988
                                                                                                                       // 1989
  // SCROLLSPY DATA-API                                                                                                // 1990
  // ==================                                                                                                // 1991
                                                                                                                       // 1992
  $(window).on('load.bs.scrollspy.data-api', function () {                                                             // 1993
    $('[data-spy="scroll"]').each(function () {                                                                        // 1994
      var $spy = $(this)                                                                                               // 1995
      Plugin.call($spy, $spy.data())                                                                                   // 1996
    })                                                                                                                 // 1997
  })                                                                                                                   // 1998
                                                                                                                       // 1999
}(jQuery);                                                                                                             // 2000
                                                                                                                       // 2001
/* ========================================================================                                            // 2002
 * Bootstrap: tab.js v3.3.1                                                                                            // 2003
 * http://getbootstrap.com/javascript/#tabs                                                                            // 2004
 * ========================================================================                                            // 2005
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 2006
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 2007
 * ======================================================================== */                                         // 2008
                                                                                                                       // 2009
                                                                                                                       // 2010
+function ($) {                                                                                                        // 2011
  'use strict';                                                                                                        // 2012
                                                                                                                       // 2013
  // TAB CLASS DEFINITION                                                                                              // 2014
  // ====================                                                                                              // 2015
                                                                                                                       // 2016
  var Tab = function (element) {                                                                                       // 2017
    this.element = $(element)                                                                                          // 2018
  }                                                                                                                    // 2019
                                                                                                                       // 2020
  Tab.VERSION = '3.3.1'                                                                                                // 2021
                                                                                                                       // 2022
  Tab.TRANSITION_DURATION = 150                                                                                        // 2023
                                                                                                                       // 2024
  Tab.prototype.show = function () {                                                                                   // 2025
    var $this    = this.element                                                                                        // 2026
    var $ul      = $this.closest('ul:not(.dropdown-menu)')                                                             // 2027
    var selector = $this.data('target')                                                                                // 2028
                                                                                                                       // 2029
    if (!selector) {                                                                                                   // 2030
      selector = $this.attr('href')                                                                                    // 2031
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7                                   // 2032
    }                                                                                                                  // 2033
                                                                                                                       // 2034
    if ($this.parent('li').hasClass('active')) return                                                                  // 2035
                                                                                                                       // 2036
    var $previous = $ul.find('.active:last a')                                                                         // 2037
    var hideEvent = $.Event('hide.bs.tab', {                                                                           // 2038
      relatedTarget: $this[0]                                                                                          // 2039
    })                                                                                                                 // 2040
    var showEvent = $.Event('show.bs.tab', {                                                                           // 2041
      relatedTarget: $previous[0]                                                                                      // 2042
    })                                                                                                                 // 2043
                                                                                                                       // 2044
    $previous.trigger(hideEvent)                                                                                       // 2045
    $this.trigger(showEvent)                                                                                           // 2046
                                                                                                                       // 2047
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return                                       // 2048
                                                                                                                       // 2049
    var $target = $(selector)                                                                                          // 2050
                                                                                                                       // 2051
    this.activate($this.closest('li'), $ul)                                                                            // 2052
    this.activate($target, $target.parent(), function () {                                                             // 2053
      $previous.trigger({                                                                                              // 2054
        type: 'hidden.bs.tab',                                                                                         // 2055
        relatedTarget: $this[0]                                                                                        // 2056
      })                                                                                                               // 2057
      $this.trigger({                                                                                                  // 2058
        type: 'shown.bs.tab',                                                                                          // 2059
        relatedTarget: $previous[0]                                                                                    // 2060
      })                                                                                                               // 2061
    })                                                                                                                 // 2062
  }                                                                                                                    // 2063
                                                                                                                       // 2064
  Tab.prototype.activate = function (element, container, callback) {                                                   // 2065
    var $active    = container.find('> .active')                                                                       // 2066
    var transition = callback                                                                                          // 2067
      && $.support.transition                                                                                          // 2068
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)                          // 2069
                                                                                                                       // 2070
    function next() {                                                                                                  // 2071
      $active                                                                                                          // 2072
        .removeClass('active')                                                                                         // 2073
        .find('> .dropdown-menu > .active')                                                                            // 2074
          .removeClass('active')                                                                                       // 2075
        .end()                                                                                                         // 2076
        .find('[data-toggle="tab"]')                                                                                   // 2077
          .attr('aria-expanded', false)                                                                                // 2078
                                                                                                                       // 2079
      element                                                                                                          // 2080
        .addClass('active')                                                                                            // 2081
        .find('[data-toggle="tab"]')                                                                                   // 2082
          .attr('aria-expanded', true)                                                                                 // 2083
                                                                                                                       // 2084
      if (transition) {                                                                                                // 2085
        element[0].offsetWidth // reflow for transition                                                                // 2086
        element.addClass('in')                                                                                         // 2087
      } else {                                                                                                         // 2088
        element.removeClass('fade')                                                                                    // 2089
      }                                                                                                                // 2090
                                                                                                                       // 2091
      if (element.parent('.dropdown-menu')) {                                                                          // 2092
        element                                                                                                        // 2093
          .closest('li.dropdown')                                                                                      // 2094
            .addClass('active')                                                                                        // 2095
          .end()                                                                                                       // 2096
          .find('[data-toggle="tab"]')                                                                                 // 2097
            .attr('aria-expanded', true)                                                                               // 2098
      }                                                                                                                // 2099
                                                                                                                       // 2100
      callback && callback()                                                                                           // 2101
    }                                                                                                                  // 2102
                                                                                                                       // 2103
    $active.length && transition ?                                                                                     // 2104
      $active                                                                                                          // 2105
        .one('bsTransitionEnd', next)                                                                                  // 2106
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :                                                               // 2107
      next()                                                                                                           // 2108
                                                                                                                       // 2109
    $active.removeClass('in')                                                                                          // 2110
  }                                                                                                                    // 2111
                                                                                                                       // 2112
                                                                                                                       // 2113
  // TAB PLUGIN DEFINITION                                                                                             // 2114
  // =====================                                                                                             // 2115
                                                                                                                       // 2116
  function Plugin(option) {                                                                                            // 2117
    return this.each(function () {                                                                                     // 2118
      var $this = $(this)                                                                                              // 2119
      var data  = $this.data('bs.tab')                                                                                 // 2120
                                                                                                                       // 2121
      if (!data) $this.data('bs.tab', (data = new Tab(this)))                                                          // 2122
      if (typeof option == 'string') data[option]()                                                                    // 2123
    })                                                                                                                 // 2124
  }                                                                                                                    // 2125
                                                                                                                       // 2126
  var old = $.fn.tab                                                                                                   // 2127
                                                                                                                       // 2128
  $.fn.tab             = Plugin                                                                                        // 2129
  $.fn.tab.Constructor = Tab                                                                                           // 2130
                                                                                                                       // 2131
                                                                                                                       // 2132
  // TAB NO CONFLICT                                                                                                   // 2133
  // ===============                                                                                                   // 2134
                                                                                                                       // 2135
  $.fn.tab.noConflict = function () {                                                                                  // 2136
    $.fn.tab = old                                                                                                     // 2137
    return this                                                                                                        // 2138
  }                                                                                                                    // 2139
                                                                                                                       // 2140
                                                                                                                       // 2141
  // TAB DATA-API                                                                                                      // 2142
  // ============                                                                                                      // 2143
                                                                                                                       // 2144
  var clickHandler = function (e) {                                                                                    // 2145
    e.preventDefault()                                                                                                 // 2146
    Plugin.call($(this), 'show')                                                                                       // 2147
  }                                                                                                                    // 2148
                                                                                                                       // 2149
  $(document)                                                                                                          // 2150
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)                                                  // 2151
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)                                                 // 2152
                                                                                                                       // 2153
}(jQuery);                                                                                                             // 2154
                                                                                                                       // 2155
/* ========================================================================                                            // 2156
 * Bootstrap: affix.js v3.3.1                                                                                          // 2157
 * http://getbootstrap.com/javascript/#affix                                                                           // 2158
 * ========================================================================                                            // 2159
 * Copyright 2011-2014 Twitter, Inc.                                                                                   // 2160
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)                                          // 2161
 * ======================================================================== */                                         // 2162
                                                                                                                       // 2163
                                                                                                                       // 2164
+function ($) {                                                                                                        // 2165
  'use strict';                                                                                                        // 2166
                                                                                                                       // 2167
  // AFFIX CLASS DEFINITION                                                                                            // 2168
  // ======================                                                                                            // 2169
                                                                                                                       // 2170
  var Affix = function (element, options) {                                                                            // 2171
    this.options = $.extend({}, Affix.DEFAULTS, options)                                                               // 2172
                                                                                                                       // 2173
    this.$target = $(this.options.target)                                                                              // 2174
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))                                               // 2175
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))                                  // 2176
                                                                                                                       // 2177
    this.$element     = $(element)                                                                                     // 2178
    this.affixed      =                                                                                                // 2179
    this.unpin        =                                                                                                // 2180
    this.pinnedOffset = null                                                                                           // 2181
                                                                                                                       // 2182
    this.checkPosition()                                                                                               // 2183
  }                                                                                                                    // 2184
                                                                                                                       // 2185
  Affix.VERSION  = '3.3.1'                                                                                             // 2186
                                                                                                                       // 2187
  Affix.RESET    = 'affix affix-top affix-bottom'                                                                      // 2188
                                                                                                                       // 2189
  Affix.DEFAULTS = {                                                                                                   // 2190
    offset: 0,                                                                                                         // 2191
    target: window                                                                                                     // 2192
  }                                                                                                                    // 2193
                                                                                                                       // 2194
  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {                                // 2195
    var scrollTop    = this.$target.scrollTop()                                                                        // 2196
    var position     = this.$element.offset()                                                                          // 2197
    var targetHeight = this.$target.height()                                                                           // 2198
                                                                                                                       // 2199
    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false                       // 2200
                                                                                                                       // 2201
    if (this.affixed == 'bottom') {                                                                                    // 2202
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'                        // 2203
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'                              // 2204
    }                                                                                                                  // 2205
                                                                                                                       // 2206
    var initializing   = this.affixed == null                                                                          // 2207
    var colliderTop    = initializing ? scrollTop : position.top                                                       // 2208
    var colliderHeight = initializing ? targetHeight : height                                                          // 2209
                                                                                                                       // 2210
    if (offsetTop != null && scrollTop <= offsetTop) return 'top'                                                      // 2211
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'         // 2212
                                                                                                                       // 2213
    return false                                                                                                       // 2214
  }                                                                                                                    // 2215
                                                                                                                       // 2216
  Affix.prototype.getPinnedOffset = function () {                                                                      // 2217
    if (this.pinnedOffset) return this.pinnedOffset                                                                    // 2218
    this.$element.removeClass(Affix.RESET).addClass('affix')                                                           // 2219
    var scrollTop = this.$target.scrollTop()                                                                           // 2220
    var position  = this.$element.offset()                                                                             // 2221
    return (this.pinnedOffset = position.top - scrollTop)                                                              // 2222
  }                                                                                                                    // 2223
                                                                                                                       // 2224
  Affix.prototype.checkPositionWithEventLoop = function () {                                                           // 2225
    setTimeout($.proxy(this.checkPosition, this), 1)                                                                   // 2226
  }                                                                                                                    // 2227
                                                                                                                       // 2228
  Affix.prototype.checkPosition = function () {                                                                        // 2229
    if (!this.$element.is(':visible')) return                                                                          // 2230
                                                                                                                       // 2231
    var height       = this.$element.height()                                                                          // 2232
    var offset       = this.options.offset                                                                             // 2233
    var offsetTop    = offset.top                                                                                      // 2234
    var offsetBottom = offset.bottom                                                                                   // 2235
    var scrollHeight = $('body').height()                                                                              // 2236
                                                                                                                       // 2237
    if (typeof offset != 'object')         offsetBottom = offsetTop = offset                                           // 2238
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)                                    // 2239
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)                                 // 2240
                                                                                                                       // 2241
    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)                                           // 2242
                                                                                                                       // 2243
    if (this.affixed != affix) {                                                                                       // 2244
      if (this.unpin != null) this.$element.css('top', '')                                                             // 2245
                                                                                                                       // 2246
      var affixType = 'affix' + (affix ? '-' + affix : '')                                                             // 2247
      var e         = $.Event(affixType + '.bs.affix')                                                                 // 2248
                                                                                                                       // 2249
      this.$element.trigger(e)                                                                                         // 2250
                                                                                                                       // 2251
      if (e.isDefaultPrevented()) return                                                                               // 2252
                                                                                                                       // 2253
      this.affixed = affix                                                                                             // 2254
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null                                                   // 2255
                                                                                                                       // 2256
      this.$element                                                                                                    // 2257
        .removeClass(Affix.RESET)                                                                                      // 2258
        .addClass(affixType)                                                                                           // 2259
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')                                                  // 2260
    }                                                                                                                  // 2261
                                                                                                                       // 2262
    if (affix == 'bottom') {                                                                                           // 2263
      this.$element.offset({                                                                                           // 2264
        top: scrollHeight - height - offsetBottom                                                                      // 2265
      })                                                                                                               // 2266
    }                                                                                                                  // 2267
  }                                                                                                                    // 2268
                                                                                                                       // 2269
                                                                                                                       // 2270
  // AFFIX PLUGIN DEFINITION                                                                                           // 2271
  // =======================                                                                                           // 2272
                                                                                                                       // 2273
  function Plugin(option) {                                                                                            // 2274
    return this.each(function () {                                                                                     // 2275
      var $this   = $(this)                                                                                            // 2276
      var data    = $this.data('bs.affix')                                                                             // 2277
      var options = typeof option == 'object' && option                                                                // 2278
                                                                                                                       // 2279
      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))                                             // 2280
      if (typeof option == 'string') data[option]()                                                                    // 2281
    })                                                                                                                 // 2282
  }                                                                                                                    // 2283
                                                                                                                       // 2284
  var old = $.fn.affix                                                                                                 // 2285
                                                                                                                       // 2286
  $.fn.affix             = Plugin                                                                                      // 2287
  $.fn.affix.Constructor = Affix                                                                                       // 2288
                                                                                                                       // 2289
                                                                                                                       // 2290
  // AFFIX NO CONFLICT                                                                                                 // 2291
  // =================                                                                                                 // 2292
                                                                                                                       // 2293
  $.fn.affix.noConflict = function () {                                                                                // 2294
    $.fn.affix = old                                                                                                   // 2295
    return this                                                                                                        // 2296
  }                                                                                                                    // 2297
                                                                                                                       // 2298
                                                                                                                       // 2299
  // AFFIX DATA-API                                                                                                    // 2300
  // ==============                                                                                                    // 2301
                                                                                                                       // 2302
  $(window).on('load', function () {                                                                                   // 2303
    $('[data-spy="affix"]').each(function () {                                                                         // 2304
      var $spy = $(this)                                                                                               // 2305
      var data = $spy.data()                                                                                           // 2306
                                                                                                                       // 2307
      data.offset = data.offset || {}                                                                                  // 2308
                                                                                                                       // 2309
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom                                            // 2310
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop                                               // 2311
                                                                                                                       // 2312
      Plugin.call($spy, data)                                                                                          // 2313
    })                                                                                                                 // 2314
  })                                                                                                                   // 2315
                                                                                                                       // 2316
}(jQuery);                                                                                                             // 2317
                                                                                                                       // 2318
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ian:bootstrap-3'] = {};

})();
