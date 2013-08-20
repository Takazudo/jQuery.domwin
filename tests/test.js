(function() {
  describe('ns.common', function() {
    return describe('global exports', function() {
      it('exports namespace to global', function() {
        return (expect($.DomwinNs)).to.be.a('object');
      });
      return it('exports main class to global', function() {
        return (expect($.Domwin)).to.be.a('function');
      });
    });
  });

  describe('ns.util', function() {
    var util;
    util = $.DomwinNs.util;
    describe('feature/browser detection', function() {
      describe('isIe6', function() {
        return it('returns Boolean', function() {
          var res1, res2;
          res1 = util.isIe6();
          res2 = util.isIe6();
          (expect(res1)).to.be.a('boolean');
          (expect(res2)).to.be.a('boolean');
          return (expect(res1)).to.be(res2);
        });
      });
      return describe('isBlackListedMobile', function() {
        return it('returns Boolean', function() {
          var res1, res2;
          res1 = util.isBlackListedMobile();
          res2 = util.isBlackListedMobile();
          (expect(res1)).to.be.a('boolean');
          (expect(res2)).to.be.a('boolean');
          return (expect(res1)).to.be(res2);
        });
      });
    });
    return describe('viewport things', function() {
      return it('returns number', function() {
        (expect(util.viewportH())).to.be.a('number');
        (expect(util.viewportW())).to.be.a('number');
        (expect(util.offsetY())).to.be.a('number');
        return (expect(util.offsetX())).to.be.a('number');
      });
    });
  });

  describe('ns.support', function() {
    var support;
    support = $.DomwinNs.support;
    return describe('fixed', function() {
      return it('returns boolean', function() {
        var res1, res2;
        res1 = support.fixed();
        res2 = support.fixed();
        (expect(res1)).to.be.a('boolean');
        (expect(res2)).to.be.a('boolean');
        return (expect(res1)).to.be(res2);
      });
    });
  });

  describe('ns.Hideoverlay', function() {
    return it('creates instance object', function() {
      var instance;
      instance = new $.DomwinNs.Hideoverlay;
      return (expect(instance)).to.be.a('object');
    });
  });

  describe('jQuery.Domwin', function() {
    return describe('initialization', function() {
      return it('creates UI instance', function() {
        var instance;
        instance = new $.Domwin;
        return (expect(instance)).to.be.a('object');
      });
    });
  });

}).call(this);
