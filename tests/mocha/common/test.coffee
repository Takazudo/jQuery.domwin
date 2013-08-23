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


