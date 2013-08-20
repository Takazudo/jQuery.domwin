(function() {
  describe('jQuery.Domwin', function() {
    return describe('initializations', function() {
      it('exports namespace to global', function() {
        return (expect($.type($.DomwinNs))).to.be('object');
      });
      return it('exports main class to global', function() {
        return (expect($.type($.Domwin))).to.be('function');
      });
    });
  });

}).call(this);
