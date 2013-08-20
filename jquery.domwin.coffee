do ($ = jQuery) ->

  # shorthands
  win = window
  doc = document
  $win = $(win)
  $doc = $(doc)

  EveEve = window.EveEve

  # define namespaces
  ns = {}
  ns.util = {}
  ns.support = {}

  # misc
  
  wait = (time) ->
    $.Deferred (defer) ->
      setTimeout ->
        defer.resolve()
      , time

  # ============================================================
  # util
  
  # is6 detection

  ns.util.isIe6 = ->
    cache = null
    detect = ->
      $el = $('<div><!--[if IE 6]><i></i><![endif]--></div>')
      return if $el.find('i').length then true else false
    unless cache?
      cache = detect()
    return cache

  # position:fixed support detection
  # from jQuery mobile https://github.com/jquery/jquery-mobile/blob/master/js/jquery.mobile.support.js

  ns.util.isBlackListedMobile = ->
    cache = null
    `function fixedPosition() {
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
    }`
    unless cache?
      cache = fixedPosition()
    return cache

  viewportH = ns.util.viewportH = -> win.innerHeight or doc.documentElement.clientHeight or doc.body.clientHeight
  viewportW = ns.util.viewportW = -> win.innerWidth or doc.documentElement.clientWidth or doc.body.clientWidth
  offsetY = ns.util.offsetY = -> win.pageYOffset or doc.documentElement.scrollTop or doc.body.scrollTop
  offsetX = ns.util.offsetX = -> win.pageXOffset or doc.documentElement.scrollLeft or doc.body.scrollLeft

  # ============================================================
  # support
  
  ns.support.fixed = ->
    cache = null
    detect = ->
      return false if ns.util.isIe6()
      return false if ns.util.isBlackListedMobile()
      return true
    unless cache?
      cache = detect()
    return cache

  # ============================================================
  # Hideoverlay

  class ns.Hideoverlay extends EveEve

    constructor: ->

  # ============================================================
  # class
  
  class ns.Main extends EveEve

    constructor: ->

  # ============================================================
  # jQuery bridges

  # ============================================================
  # globalify

  $.DomwinNs = ns
  $.Domwin = ns.Main
