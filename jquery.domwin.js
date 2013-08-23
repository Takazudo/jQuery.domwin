/*! jQuery.domwin (https://github.com/Takazudo/jQuery.domwin)
 * lastupdate: 2013-08-23
 * version: 0.0.0
 * author: 'Takazudo' Takeshi Takatsudo <takazudo@gmail.com>
 * License: MIT */
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($) {
    var $doc, $win, EveEve, doc, ns, offsetX, offsetY, viewportH, viewportW, wait, win;
    win = window;
    doc = document;
    $win = $(win);
    $doc = $(doc);
    EveEve = window.EveEve;
    ns = {};
    ns.util = {};
    ns.support = {};
    wait = function(time) {
      return $.Deferred(function(defer) {
        return setTimeout(function() {
          return defer.resolve();
        }, time);
      });
    };
    ns.util.isIe6 = function() {
      var cache, detect;
      cache = null;
      detect = function() {
        var $el;
        $el = $('<div><!--[if IE 6]><i></i><![endif]--></div>');
        if ($el.find('i').length) {
          return true;
        } else {
          return false;
        }
      };
      if (cache == null) {
        cache = detect();
      }
      return cache;
    };
    ns.util.isBlackListedMobile = function() {
      var cache;
      cache = null;
      function fixedPosition() {
      var w = window,
        ua = navigator.userAgent,
        platform = navigator.platform,
        // Rendering engine is Webkit, and capture major version
        wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
        wkversion = !!wkmatch && wkmatch[ 1 ],
        ffmatch = ua.match( /Fennec\/([0-9]+)/ ),
        ffversion = !!ffmatch && ffmatch[ 1 ],
        operammobilematch = ua.match( /Opera Mobi\/([0-9]+)/ ),
        omversion = !!operammobilematch && operammobilematch[ 1 ];

      if (
        // iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
        ( ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) && wkversion && wkversion < 534 ) ||
        // Opera Mini
        ( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
        ( operammobilematch && omversion < 7458 )	||
        //Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
        ( ua.indexOf( "Android" ) > -1 && wkversion && wkversion < 533 ) ||
        // Firefox Mobile before 6.0 -
        ( ffversion && ffversion < 6 ) ||
        // WebOS less than 3
        ( "palmGetResource" in window && wkversion && wkversion < 534 )	||
        // MeeGo
        ( ua.indexOf( "MeeGo" ) > -1 && ua.indexOf( "NokiaBrowser/8.5.0" ) > -1 ) ) {
        return false;
      }

      return true;
    };
      if (cache == null) {
        cache = fixedPosition();
      }
      return cache;
    };
    viewportH = ns.util.viewportH = function() {
      return win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
    };
    viewportW = ns.util.viewportW = function() {
      return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
    };
    offsetY = ns.util.offsetY = function() {
      return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
    };
    offsetX = ns.util.offsetX = function() {
      return win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
    };
    ns.support.fixed = function() {
      var cache, detect;
      cache = null;
      detect = function() {
        if (ns.util.isIe6()) {
          return false;
        }
        if (ns.util.isBlackListedMobile()) {
          return false;
        }
        return true;
      };
      if (cache == null) {
        cache = detect();
      }
      return cache;
    };
    ns.Hideoverlay = (function(_super) {
      __extends(Hideoverlay, _super);

      Hideoverlay.prototype.defaults = {
        src: "<div class=\"domwin-hideoverlay\">\n  <div class=\"domwin-hideoverlay-bg\"></div>\n  <div class=\"domwin-hideoverlay-spinner\"></div>\n</div>",
        bg_spinner: true,
        spinjs: false,
        spinjs_options: {
          color: '#fff',
          lines: 15,
          length: 22,
          radius: 40
        },
        fade: true,
        maxopacity: 0.8
      };

      function Hideoverlay(options) {
        if (options == null) {
          options = {};
        }
        this.options = $.extend({}, this.defaults, options);
        this._showDefer = null;
        this._createEl();
        this._appendToPage();
        this._handleSpinnerVis();
      }

      Hideoverlay.prototype.destroy = function() {
        this.off();
        this._removeSpin();
        this.$el.remove();
        return this;
      };

      Hideoverlay.prototype.show = function() {
        var animTo, cssTo, defer, onDone,
          _this = this;
        defer = $.Deferred();
        if (this._showDefer) {
          this.trigger('beforeshow');
          this._showDefer.done(function() {
            _this.trigger('aftershow');
            return defer.resolve();
          });
        } else {
          this._showDefer = defer;
          this.$el.css('display', 'block');
          cssTo = {
            opacity: 0
          };
          animTo = {
            opacity: this.options.maxopacity
          };
          this.$spinner.css('display', 'none');
          this.trigger('beforeshow');
          onDone = function() {
            _this._attachSpin();
            _this.trigger('aftershow');
            return defer.resolve();
          };
          if (this.options.fade) {
            ($.when(this.$bg.stop().css(cssTo).animate(animTo, 200))).done(onDone);
          } else {
            this.$bg.css(animTo);
            onDone();
          }
        }
        return defer.promise();
      };

      Hideoverlay.prototype.hide = function() {
        var animTo, defer, onDone,
          _this = this;
        this._showDefer = null;
        defer = $.Deferred();
        animTo = {
          opacity: 0
        };
        onDone = function() {
          _this._removeSpin();
          _this.$el.css('display', 'none');
          _this.trigger('afterhide');
          return defer.resolve();
        };
        this.trigger('beforehide');
        if (this.options.fade) {
          ($.when(this.$bg.stop().animate(animTo, 100))).done(onDone);
        } else {
          this.$bg.css(animTo);
          onDone();
        }
        return defer.promise();
      };

      Hideoverlay.prototype._attachSpin = function() {
        var shouldShow;
        shouldShow = this.options.bg_spinner || this.options.spinjs;
        if (shouldShow) {
          this._removeSpin();
          this.$spinner.css('display', 'block');
        }
        if (this.options.spinjs) {
          (new Spinner(this.options.spinjs_options)).spin(this.$spinner[0]);
        }
        if (shouldShow && this.options.fade) {
          this.$spinner.hide().fadeIn();
        }
        return this;
      };

      Hideoverlay.prototype._removeSpin = function() {
        if (this.options.spinjs === false) {
          return this;
        }
        this.$spinner.empty();
        return this;
      };

      Hideoverlay.prototype._appendToPage = function() {
        $('body').append(this.$el);
        return this;
      };

      Hideoverlay.prototype._createEl = function() {
        this.$el = $(this.options.src);
        this.$bg = $('.domwin-hideoverlay-bg', this.$el);
        this.$spinner = $('.domwin-hideoverlay-spinner', this.$el);
        return this;
      };

      Hideoverlay.prototype._handleSpinnerVis = function() {
        var props, val;
        val = null;
        props = {};
        if ((this.options.bg_spinner === false) && (this.options.spinjs === false)) {
          props.display = 'none';
        } else {
          props.display = 'block';
        }
        if (this.options.spinjs === true) {
          props.backgroundImage = 'none';
        }
        this.$spinner.css(props);
        return this;
      };

      return Hideoverlay;

    })(EveEve);
    ns.Main = (function(_super) {
      __extends(Main, _super);

      function Main() {}

      return Main;

    })(EveEve);
    $.DomwinNs = ns;
    return $.Domwin = ns.Main;
  })(jQuery);

}).call(this);
