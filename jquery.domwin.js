/*! jQuery.domwin (https://github.com/Takazudo/jQuery.domwin)
 * lastupdate: 2013-08-20
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

      function Hideoverlay() {}

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
