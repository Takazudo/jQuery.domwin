# ============================================================
# common

describe 'ns.common', ->

  describe 'global exports', ->

    it 'should export namespace to global', ->
      (expect $.DomwinNs).to.be.a 'object'

    it 'should export main class to global', ->
      (expect $.Domwin).to.be.a 'function'

# ============================================================
# util

describe 'ns.util', ->

  util = $.DomwinNs.util
  
  describe 'feature/browser detection', ->

    describe 'isIe6', ->
      it 'should return Boolean', ->
        res1 = util.isIe6()
        res2 = util.isIe6() # try again because it caches the result
        (expect res1).to.be.a 'boolean'
        (expect res2).to.be.a 'boolean'
        (expect res1).to.be res2

    describe 'isBlackListedMobile', ->
      it 'should return Boolean', ->
        res1 = util.isBlackListedMobile()
        res2 = util.isBlackListedMobile() # try again because it caches the result
        (expect res1).to.be.a 'boolean'
        (expect res2).to.be.a 'boolean'
        (expect res1).to.be res2

  describe 'viewport things', ->
    it 'should return number', ->
      (expect util.viewportH()).to.be.a 'number'
      (expect util.viewportW()).to.be.a 'number'
      (expect util.offsetY()).to.be.a 'number'
      (expect util.offsetX()).to.be.a 'number'


# ============================================================
# support

describe 'ns.support', ->

  support = $.DomwinNs.support
  
  describe 'fixed', ->
    it 'should return boolean', ->
      res1 = support.fixed()
      res2 = support.fixed() # try again because it caches the result
      (expect res1).to.be.a 'boolean'
      (expect res2).to.be.a 'boolean'
      (expect res1).to.be res2


# ============================================================
# ns.Hideoverlay

describe 'ns.Hideoverlay', ->

  instance = null

  describe 'basics', ->
  
    beforeEach ->
      options =
        fade: false
      instance = new $.DomwinNs.Hideoverlay options
    afterEach ->
      instance.destroy()
      instance = null
    
    it 'should create instance object', ->
      (expect instance).to.be.a 'object'

    it 'should create self el on instance creation', ->
      (expect instance.$el).to.be.a 'object'

    it 'should append self el to the page', ->
      $overlay = $('body').find('.domwin-hideoverlay')
      overlayLength = $overlay.length
      (expect overlayLength).to.be 1

    it 'should remove self el from the page when destroyed', ->
      instance.destroy()
      overlayLength = $('body').find('.domwin-hideoverlay').length
      (expect overlayLength).to.be 0

    it 'should be shown when `show` was called', ->
      instance.show()
      $overlay = $('body').find('.domwin-hideoverlay')
      (expect $overlay.is(':visible')).to.be true

    it 'should be hidden when `hide` was called', ->
      instance.show()
      instance.hide()
      $overlay = $('body').find('.domwin-hideoverlay')
      (expect $overlay.is(':visible')).to.be false
    
  describe 'options.bg_spinner', ->
    
    it "should shows spinner el when bg_spinner option is `true`", ->
      options =
        bg_spinner: true
        fade: false
      instance = new $.DomwinNs.Hideoverlay options
      disp = instance.$spinner.css 'display'
      (expect disp).to.be 'block'

    it "shouldn't show spinner el when bg_spinner option is `false`", ->
      options =
        bg_spinner: false
      instance = new $.DomwinNs.Hideoverlay options
      disp = instance.$spinner.css 'display'
      (expect disp).to.be 'none'

  describe 'options.spinjs', ->

    beforeEach ->
      options =
        bg_spinner: false
        spinjs: true
        fade: false
      instance = new $.DomwinNs.Hideoverlay options
    afterEach ->
      instance.destroy()
      instance = null

    it "should append spin.js el when spinjs option is `true` and `show` was called", ->
      instance.show()
      $spinEls = instance.$spinner.find '*'
      (expect $spinEls.length).not.to.be 0

    it "should remove spin.js els after `hide`", ->
      instance.show()
      instance.hide()
      $spinEls = instance.$spinner.find '*'
      (expect $spinEls.length).to.be 0

  describe 'options.fade', ->
    
    describe 'when true', ->

      instance = null
      beforeEach ->
        options =
          fade: true
        instance = new $.DomwinNs.Hideoverlay options
      afterEach ->
        instance.destroy()
        instance = null

      it "should return deferred when `show` was called", (done) ->
        instance.show().done ->
          done()

      it "should return deferred when `hide` was called", (done) ->
        instance.hide().done ->
          done()

    describe 'when false', ->

      instance = null
      beforeEach ->
        options =
          fade: false
        instance = new $.DomwinNs.Hideoverlay options
      afterEach ->
        instance.destroy()
        instance = null

      it "should return deferred when `show` was called", (done) ->
        instance.show().done ->
          done()

      it "should return deferred when `hide` was called", (done) ->
        instance.hide().done ->
          done()


  describe 'events', ->
    
    describe 'with fade', ->

      instance = null
      beforeEach ->
        options =
          fade: true
        instance = new $.DomwinNs.Hideoverlay options
      afterEach ->
        instance.destroy()
        instance = null

      it 'should fire events on `show`', (done) ->
        spy1 = sinon.spy()
        spy2 = sinon.spy()
        instance.on 'beforeshow', spy1
        instance.on 'aftershow', spy2
        instance.show().done ->
          (expect spy2.calledOnce).to.be.ok()
          done()
        (expect spy1.calledOnce).to.be.ok() # fired immediately

      it 'should fire events on `hide`', (done) ->
        spy1 = sinon.spy()
        spy2 = sinon.spy()
        instance.on 'beforehide', spy1
        instance.on 'afterhide', spy2
        instance.hide().done ->
          (expect spy2.calledOnce).to.be.ok()
          done()
        (expect spy1.calledOnce).to.be.ok() # fired immediately

    describe 'without fade', ->

      instance = null
      beforeEach ->
        options =
          fade: false
        instance = new $.DomwinNs.Hideoverlay options
      afterEach ->
        instance.destroy()
        instance = null

      it 'should fire events on `show`', ->
        spy1 = sinon.spy()
        spy2 = sinon.spy()
        instance.on 'beforeshow', spy1
        instance.on 'aftershow', spy2
        instance.show()
        (expect spy1.calledOnce).to.be.ok()
        (expect spy2.calledOnce).to.be.ok()

      it 'should fire events on `hide`', ->
        spy1 = sinon.spy()
        spy2 = sinon.spy()
        instance.on 'beforehide', spy1
        instance.on 'afterhide', spy2
        instance.hide()
        (expect spy1.calledOnce).to.be.ok()
        (expect spy2.calledOnce).to.be.ok()

    describe 'zombie events', ->
      
      it 'should not fire events after destroyed', ->
        
        options =
          fade: false
        instance = new $.DomwinNs.Hideoverlay options
        spy = sinon.spy()
        instance.on 'beforeshow', spy
        instance.on 'aftershow', spy
        instance.destroy()
        instance.trigger 'beforeshow'
        instance.trigger 'aftershow'
        (expect spy.called).not.to.be true

# ============================================================
# jQuery.Domwin

describe 'jQuery.Domwin', ->

  describe 'initialization', ->
    
    it 'creates instance object', ->
      instance = new $.Domwin
      (expect instance).to.be.a 'object'

    #it 'receives options', ->
    #  options =
    #    width: 1000
    #    height: 1000
    #  instance = new $.Domwin

