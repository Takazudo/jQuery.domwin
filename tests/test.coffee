describe 'jQuery.Domwin', ->

  describe 'initializations', ->

    it 'exports namespace to global', ->
      (expect $.type $.DomwinNs).to.be 'object'

    it 'exports main class to global', ->
      (expect $.type $.Domwin).to.be 'function'
      

