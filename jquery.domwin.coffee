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
    `function blackListed() {
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
      cache = not blackListed()
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
  # Winwatcher

  class ns.Winwatcher extends EveEve
    eventNames = 'resize scroll orientationchange'
    constructor: ->
      $win.bind eventNames, =>
        @trigger 'resize'

  # put instance under namespace
  ns.winwatcher = new ns.Winwatcher

  # ============================================================
  # Hideoverlay

  class ns.Hideoverlay extends EveEve

    defaults:
      src: """
        <div class="domwin-hideoverlay">
          <div class="domwin-hideoverlay-bg"></div>
          <div class="domwin-hideoverlay-spinner"></div>
        </div>
      """
      bg_spinner: true
      bg_spinner_url: null
      spinjs: false
      spinjs_options:
        color:'#fff'
        lines: 15
        length: 22
        radius: 40
      fade: true
      maxopacity: 0.8
      click_close: true
      position: if ns.support.fixed() then 'fixed' else 'absolute'
      bgiframe: false

    constructor: (options = {}) ->
      @options = $.extend {}, @defaults, options

      @_showDefer = null
      # stores show deferred object.
      # If there's a deferred here, it means
      # show is in progress or already shown.
      # This property will be null when `hide` was called.
      
      @_shouldHandleResizeNow = false

      @_createEl()
      @_appendToPage()
      @_handleSpinnerVis()
      @_handleAbsolute()
      @_eventify()
      @_preloadSpinner()

    destroy: ->
      @_offEventsOnDom()
      @off()
      @_removeSpin()
      @$el.remove()
      return this

    show: ->

      defer = $.Deferred()

      if @_showDefer
        # if there's a deferred, we don't need animations at all.

        @trigger 'beforeshow'

        @_showDefer.done =>
          # last animation is what we should watch
          @trigger 'aftershow'
          defer.resolve()

      else

        @_showDefer = defer # store current show deferred

        @$el.css 'display', 'block'
        cssTo = { opacity: 0 }
        animTo = { opacity: @options.maxopacity }
        @$spinner.css 'display', 'none'

        @trigger 'beforeshow'

        onDone = =>
          @_attachSpin()
          @trigger 'aftershow'
          defer.resolve()

        @_shouldHandleResizeNow = true
        @_resize()

        if @options.fade
          ($.when @$bg.stop().css(cssTo).animate(animTo, 200)).done onDone
        else
          @$bg.css(animTo)
          onDone()

      return defer.promise()

    hide: ->

      @_showDefer = null

      defer = $.Deferred()
      animTo = { opacity: 0 }

      onDone = =>
        @_removeSpin()
        @_shouldHandleResizeNow = false
        @$el.css 'display', 'none'
        @trigger 'afterhide'
        defer.resolve()

      @trigger 'beforehide'

      if @options.fade
        ($.when @$bg.stop().animate(animTo, 100)).done onDone
      else
        @$bg.css(animTo)
        onDone()

      return defer.promise()

    # private
    
    _attachSpin: ->
      shouldShow = @options.bg_spinner or @options.spinjs
      if shouldShow
        @_removeSpin()
        @$spinner.css 'display', 'block'
      if @options.spinjs
        (new Spinner @options.spinjs_options).spin(@$spinner[0])
      if shouldShow and @options.fade
        @$spinner.hide().fadeIn()
      return this

    _removeSpin: ->
      return this if @options.spinjs is false
      @$spinner.empty()
      return this
    
    _appendToPage: ->
      $('body').append @$el
      return this
    
    _createEl: ->
      @$el = $(@options.src)
      @$bg = $('.domwin-hideoverlay-bg', @$el)
      @$spinner = $('.domwin-hideoverlay-spinner', @$el)
      return this

    _handleSpinnerVis: ->
      val = null
      props = {}
      if (@options.bg_spinner is false) and (@options.spinjs is false)
        props.display = 'none'
      else
        props.display = 'block'
      if @options.spinjs is true
        props.backgroundImage = 'none'
      @$spinner.css props
      return this

    _eventify: ->

      if @options.click_close is true
        @_clickHandler = (e) =>
          e.preventDefault()
          @hide()
        @$el.bind 'click', @_clickHandler

      if @options.position is 'absolute'
        @_resizeHandler = =>
          return unless @_shouldHandleResizeNow
          @_resize()
        ns.winwatcher.on 'resize', @_resizeHandler

      return this

    _offEventsOnDom: ->
      if @_clickHandler
        @$el.unbind 'click', @_clickHandler
      if @_resizeHandler
        ns.winwatcher.off 'resize', @_resizeHandler
      return this

    _preloadSpinner: ->
      url = @options.bg_spinner_url
      return unless url
      (new Image).src = url
      return this

    _handleAbsolute: ->
      return this unless @options.position is 'absolute'
      @$el.css 'position', 'absolute'
      if @options.bgiframe and $.fn.bgiframe
        @$el.bgiframe()
      return this

    _resize: ->
      return this unless @options.position is 'absolute'
      w = viewportW()
      h = viewportH()
      @$el.css
        width: w
        height: h
        top: $win.scrollTop()
        left: $win.scrollLeft()
      @$bg.css
        width: w
        height: h
      @trigger 'resize'
      return this

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

