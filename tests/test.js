(function() {
  describe('ns.common', function() {
    return describe('global exports', function() {
      it('should export namespace to global', function() {
        return (expect($.DomwinNs)).to.be.a('object');
      });
      return it('should export main class to global', function() {
        return (expect($.Domwin)).to.be.a('function');
      });
    });
  });

  describe('ns.util', function() {
    var util;
    util = $.DomwinNs.util;
    describe('feature/browser detection', function() {
      describe('isIe6', function() {
        return it('should return Boolean', function() {
          var res1, res2;
          res1 = util.isIe6();
          res2 = util.isIe6();
          (expect(res1)).to.be.a('boolean');
          (expect(res2)).to.be.a('boolean');
          return (expect(res1)).to.be(res2);
        });
      });
      return describe('isBlackListedMobile', function() {
        return it('should return Boolean', function() {
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
      return it('should return number', function() {
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
      return it('should return boolean', function() {
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
    describe('basics', function() {
      var instance;
      instance = null;
      beforeEach(function() {
        var options;
        options = {
          fade: false
        };
        return instance = new $.DomwinNs.Hideoverlay(options);
      });
      afterEach(function() {
        instance.destroy();
        return instance = null;
      });
      it('should create instance object', function() {
        return (expect(instance)).to.be.a('object');
      });
      it('should create self el on instance creation', function() {
        return (expect(instance.$el)).to.be.a('object');
      });
      it('should append self el to the page', function() {
        var $overlay, overlayLength;
        $overlay = $('body').find('.domwin-hideoverlay');
        overlayLength = $overlay.length;
        return (expect(overlayLength)).to.be(1);
      });
      it('should remove self el from the page when destroyed', function() {
        var overlayLength;
        instance.destroy();
        overlayLength = $('body').find('.domwin-hideoverlay').length;
        return (expect(overlayLength)).to.be(0);
      });
      it('should be shown when `show` was called', function() {
        var $overlay;
        instance.show();
        $overlay = $('body').find('.domwin-hideoverlay');
        return (expect($overlay.is(':visible'))).to.be(true);
      });
      return it('should be hidden when `hide` was called', function() {
        var $overlay;
        instance.show();
        instance.hide();
        $overlay = $('body').find('.domwin-hideoverlay');
        return (expect($overlay.is(':visible'))).to.be(false);
      });
    });
    describe('options.bg_spinner', function() {
      var instance;
      instance = null;
      it("should shows spinner el when bg_spinner option is `true`", function() {
        var disp, options;
        options = {
          bg_spinner: true,
          fade: false
        };
        instance = new $.DomwinNs.Hideoverlay(options);
        disp = instance.$spinner.css('display');
        return (expect(disp)).to.be('block');
      });
      return it("shouldn't show spinner el when bg_spinner option is `false`", function() {
        var disp, options;
        options = {
          bg_spinner: false
        };
        instance = new $.DomwinNs.Hideoverlay(options);
        disp = instance.$spinner.css('display');
        return (expect(disp)).to.be('none');
      });
    });
    describe('options.spinjs', function() {
      var instance;
      instance = null;
      beforeEach(function() {
        var options;
        options = {
          bg_spinner: false,
          spinjs: true,
          fade: false
        };
        return instance = new $.DomwinNs.Hideoverlay(options);
      });
      afterEach(function() {
        instance.destroy();
        return instance = null;
      });
      it("should append spin.js el when spinjs option is `true` and `show` was called", function() {
        var $spinEls;
        instance.show();
        $spinEls = instance.$spinner.find('*');
        return (expect($spinEls.length)).not.to.be(0);
      });
      return it("should remove spin.js els after `hide`", function() {
        var $spinEls;
        instance.show();
        instance.hide();
        $spinEls = instance.$spinner.find('*');
        return (expect($spinEls.length)).to.be(0);
      });
    });
    describe('options.fade', function() {
      describe('when true', function() {
        var instance;
        instance = null;
        beforeEach(function() {
          var options;
          options = {
            fade: true
          };
          return instance = new $.DomwinNs.Hideoverlay(options);
        });
        afterEach(function() {
          instance.destroy();
          return instance = null;
        });
        it("should return deferred when `show` was called", function(done) {
          return instance.show().done(function() {
            return done();
          });
        });
        return it("should return deferred when `hide` was called", function(done) {
          return instance.hide().done(function() {
            return done();
          });
        });
      });
      return describe('when false', function() {
        var instance;
        instance = null;
        beforeEach(function() {
          var options;
          options = {
            fade: false
          };
          return instance = new $.DomwinNs.Hideoverlay(options);
        });
        afterEach(function() {
          instance.destroy();
          return instance = null;
        });
        it("should return deferred when `show` was called", function(done) {
          return instance.show().done(function() {
            return done();
          });
        });
        return it("should return deferred when `hide` was called", function(done) {
          return instance.hide().done(function() {
            return done();
          });
        });
      });
    });
    describe('events', function() {
      describe('with fade', function() {
        var instance;
        instance = null;
        beforeEach(function() {
          var options;
          options = {
            fade: true
          };
          return instance = new $.DomwinNs.Hideoverlay(options);
        });
        afterEach(function() {
          instance.destroy();
          return instance = null;
        });
        it('should fire events on `show`', function(done) {
          var spy1, spy2;
          spy1 = sinon.spy();
          spy2 = sinon.spy();
          instance.on('beforeshow', spy1);
          instance.on('aftershow', spy2);
          instance.show().done(function() {
            (expect(spy2.calledOnce)).to.be.ok();
            return done();
          });
          return (expect(spy1.calledOnce)).to.be.ok();
        });
        return it('should fire events on `hide`', function(done) {
          var spy1, spy2;
          spy1 = sinon.spy();
          spy2 = sinon.spy();
          instance.on('beforehide', spy1);
          instance.on('afterhide', spy2);
          instance.hide().done(function() {
            (expect(spy2.calledOnce)).to.be.ok();
            return done();
          });
          return (expect(spy1.calledOnce)).to.be.ok();
        });
      });
      describe('without fade', function() {
        var instance;
        instance = null;
        beforeEach(function() {
          var options;
          options = {
            fade: false
          };
          return instance = new $.DomwinNs.Hideoverlay(options);
        });
        afterEach(function() {
          instance.destroy();
          return instance = null;
        });
        it('should fire events on `show`', function() {
          var spy1, spy2;
          spy1 = sinon.spy();
          spy2 = sinon.spy();
          instance.on('beforeshow', spy1);
          instance.on('aftershow', spy2);
          instance.show();
          (expect(spy1.calledOnce)).to.be.ok();
          return (expect(spy2.calledOnce)).to.be.ok();
        });
        return it('should fire events on `hide`', function() {
          var spy1, spy2;
          spy1 = sinon.spy();
          spy2 = sinon.spy();
          instance.on('beforehide', spy1);
          instance.on('afterhide', spy2);
          instance.hide();
          (expect(spy1.calledOnce)).to.be.ok();
          return (expect(spy2.calledOnce)).to.be.ok();
        });
      });
      return describe('zombie events', function() {
        return it('should not fire events after destroyed', function() {
          var instance, options, spy;
          options = {
            fade: false
          };
          instance = new $.DomwinNs.Hideoverlay(options);
          spy = sinon.spy();
          instance.on('beforeshow', spy);
          instance.on('aftershow', spy);
          instance.destroy();
          instance.trigger('beforeshow');
          instance.trigger('aftershow');
          return (expect(spy.called)).not.to.be(true);
        });
      });
    });
    return describe("timing problems", function() {
      describe("sequential `show` call", function() {
        describe("when fade is false", function() {
          var instance;
          instance = null;
          beforeEach(function() {
            var options;
            options = {
              fade: false
            };
            return instance = new $.DomwinNs.Hideoverlay(options);
          });
          afterEach(function() {
            instance.destroy();
            return instance = null;
          });
          it("should handle 2 `show` calls (deferred)", function(done) {
            var spy1, spy2;
            spy1 = sinon.spy();
            spy2 = sinon.spy();
            instance.show().done(function() {
              (expect(spy2.calledOnce)).to.be(false);
              return spy1();
            });
            return instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              spy2();
              return done();
            });
          });
          it("should handle 4 `show` calls (deferred)", function(done) {
            var spy1, spy2, spy3, spy4;
            spy1 = sinon.spy();
            spy2 = sinon.spy();
            spy3 = sinon.spy();
            spy4 = sinon.spy();
            instance.show().done(function() {
              spy1();
              (expect(spy2.calledOnce)).to.be(false);
              (expect(spy3.calledOnce)).to.be(false);
              return (expect(spy4.calledOnce)).to.be(false);
            });
            instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              spy2();
              (expect(spy3.calledOnce)).to.be(false);
              return (expect(spy4.calledOnce)).to.be(false);
            });
            instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              (expect(spy2.calledOnce)).to.be(true);
              spy3();
              return (expect(spy4.calledOnce)).to.be(false);
            });
            return instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              (expect(spy2.calledOnce)).to.be(true);
              (expect(spy3.calledOnce)).to.be(true);
              spy4();
              return done();
            });
          });
          it("should handle 2 `show` calls (event)", function(done) {
            var spy_after, spy_before;
            spy_before = sinon.spy();
            spy_after = sinon.spy();
            instance.on('beforeshow', spy_before);
            instance.on('aftershow', spy_after);
            return $.when(instance.show(), instance.show()).done(function() {
              (expect(spy_before.callCount)).to.be(2);
              (expect(spy_after.callCount)).to.be(2);
              return done();
            });
          });
          return it("should handle 4 `show` calls (event)", function(done) {
            var spy_after, spy_before;
            spy_before = sinon.spy();
            spy_after = sinon.spy();
            instance.on('beforeshow', spy_before);
            instance.on('aftershow', spy_after);
            return $.when(instance.show(), instance.show(), instance.show(), instance.show()).done(function() {
              (expect(spy_before.callCount)).to.be(4);
              (expect(spy_after.callCount)).to.be(4);
              return done();
            });
          });
        });
        return describe("when fade is true", function() {
          var instance;
          instance = null;
          beforeEach(function() {
            var options;
            options = {
              fade: true
            };
            return instance = new $.DomwinNs.Hideoverlay(options);
          });
          afterEach(function() {
            instance.destroy();
            return instance = null;
          });
          it("should handle 2 `show` calls (deferred)", function(done) {
            var spy1, spy2;
            spy1 = sinon.spy();
            spy2 = sinon.spy();
            instance.show().done(function() {
              (expect(spy2.calledOnce)).to.be(false);
              return spy1();
            });
            return instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              spy2();
              return done();
            });
          });
          it("should handle 4 `show` calls (deferred)", function(done) {
            var spy1, spy2, spy3, spy4;
            spy1 = sinon.spy();
            spy2 = sinon.spy();
            spy3 = sinon.spy();
            spy4 = sinon.spy();
            instance.show().done(function() {
              spy1();
              (expect(spy2.calledOnce)).to.be(false);
              (expect(spy3.calledOnce)).to.be(false);
              return (expect(spy4.calledOnce)).to.be(false);
            });
            instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              spy2();
              (expect(spy3.calledOnce)).to.be(false);
              return (expect(spy4.calledOnce)).to.be(false);
            });
            instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              (expect(spy2.calledOnce)).to.be(true);
              spy3();
              return (expect(spy4.calledOnce)).to.be(false);
            });
            return instance.show().done(function() {
              (expect(spy1.calledOnce)).to.be(true);
              (expect(spy2.calledOnce)).to.be(true);
              (expect(spy3.calledOnce)).to.be(true);
              spy4();
              return done();
            });
          });
          it("should handle 2 `show` calls (event)", function(done) {
            var spy_after, spy_before;
            spy_before = sinon.spy();
            spy_after = sinon.spy();
            instance.on('beforeshow', spy_before);
            instance.on('aftershow', spy_after);
            return $.when(instance.show(), instance.show()).done(function() {
              (expect(spy_before.callCount)).to.be(2);
              (expect(spy_after.callCount)).to.be(2);
              return done();
            });
          });
          return it("should handle 4 `show` calls (event)", function(done) {
            var spy_after, spy_before;
            spy_before = sinon.spy();
            spy_after = sinon.spy();
            instance.on('beforeshow', spy_before);
            instance.on('aftershow', spy_after);
            return $.when(instance.show(), instance.show(), instance.show(), instance.show()).done(function() {
              (expect(spy_before.callCount)).to.be(4);
              (expect(spy_after.callCount)).to.be(4);
              return done();
            });
          });
        });
      });
      return describe("sequential `hide` call", function() {
        describe("when fade is false", function() {
          var instance;
          instance = null;
          beforeEach(function() {
            var options;
            options = {
              fade: false
            };
            return instance = new $.DomwinNs.Hideoverlay(options);
          });
          afterEach(function() {
            instance.destroy();
            return instance = null;
          });
          it("should handle 2 `hide` calls (deferred)", function(done) {
            return instance.show().done(function() {
              var spy1, spy2;
              spy1 = sinon.spy();
              spy2 = sinon.spy();
              instance.hide().done(function() {
                (expect(spy2.calledOnce)).to.be(false);
                return spy1();
              });
              return instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                spy2();
                return done();
              });
            });
          });
          it("should handle 4 `hide` calls (deferred)", function(done) {
            return instance.show().done(function() {
              var spy1, spy2, spy3, spy4;
              spy1 = sinon.spy();
              spy2 = sinon.spy();
              spy3 = sinon.spy();
              spy4 = sinon.spy();
              instance.hide().done(function() {
                spy1();
                (expect(spy2.calledOnce)).to.be(false);
                (expect(spy3.calledOnce)).to.be(false);
                return (expect(spy4.calledOnce)).to.be(false);
              });
              instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                spy2();
                (expect(spy3.calledOnce)).to.be(false);
                return (expect(spy4.calledOnce)).to.be(false);
              });
              instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                (expect(spy2.calledOnce)).to.be(true);
                spy3();
                return (expect(spy4.calledOnce)).to.be(false);
              });
              return instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                (expect(spy2.calledOnce)).to.be(true);
                (expect(spy3.calledOnce)).to.be(true);
                spy4();
                return done();
              });
            });
          });
          it("should handle 2 `hide` calls (event)", function(done) {
            return instance.show().done(function() {
              var spy_after, spy_before;
              spy_before = sinon.spy();
              spy_after = sinon.spy();
              instance.on('beforehide', spy_before);
              instance.on('afterhide', spy_after);
              return $.when(instance.hide(), instance.hide()).done(function() {
                (expect(spy_before.callCount)).to.be(2);
                (expect(spy_after.callCount)).to.be(2);
                return done();
              });
            });
          });
          return it("should handle 4 `hide` calls (event)", function(done) {
            return instance.show().done(function() {
              var spy_after, spy_before;
              spy_before = sinon.spy();
              spy_after = sinon.spy();
              instance.on('beforehide', spy_before);
              instance.on('afterhide', spy_after);
              return $.when(instance.hide(), instance.hide(), instance.hide(), instance.hide()).done(function() {
                (expect(spy_before.callCount)).to.be(4);
                (expect(spy_after.callCount)).to.be(4);
                return done();
              });
            });
          });
        });
        return describe("when fade is true", function() {
          var instance;
          instance = null;
          beforeEach(function() {
            var options;
            options = {
              fade: true
            };
            return instance = new $.DomwinNs.Hideoverlay(options);
          });
          afterEach(function() {
            instance.destroy();
            return instance = null;
          });
          it("should handle 2 `hide` calls (deferred)", function(done) {
            return instance.show().done(function() {
              var spy1, spy2;
              spy1 = sinon.spy();
              spy2 = sinon.spy();
              instance.hide().done(function() {
                (expect(spy2.calledOnce)).to.be(false);
                return spy1();
              });
              return instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                spy2();
                return done();
              });
            });
          });
          it("should handle 4 `hide` calls (deferred)", function(done) {
            return instance.show().done(function() {
              var spy1, spy2, spy3, spy4;
              spy1 = sinon.spy();
              spy2 = sinon.spy();
              spy3 = sinon.spy();
              spy4 = sinon.spy();
              instance.hide().done(function() {
                spy1();
                (expect(spy2.calledOnce)).to.be(false);
                (expect(spy3.calledOnce)).to.be(false);
                return (expect(spy4.calledOnce)).to.be(false);
              });
              instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                spy2();
                (expect(spy3.calledOnce)).to.be(false);
                return (expect(spy4.calledOnce)).to.be(false);
              });
              instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                (expect(spy2.calledOnce)).to.be(true);
                spy3();
                return (expect(spy4.calledOnce)).to.be(false);
              });
              return instance.hide().done(function() {
                (expect(spy1.calledOnce)).to.be(true);
                (expect(spy2.calledOnce)).to.be(true);
                (expect(spy3.calledOnce)).to.be(true);
                spy4();
                return done();
              });
            });
          });
          it("should handle 2 `hide` calls (event)", function(done) {
            return instance.show().done(function() {
              var spy_after, spy_before;
              spy_before = sinon.spy();
              spy_after = sinon.spy();
              instance.on('beforehide', spy_before);
              instance.on('afterhide', spy_after);
              return $.when(instance.hide(), instance.hide()).done(function() {
                (expect(spy_before.callCount)).to.be(2);
                (expect(spy_after.callCount)).to.be(2);
                return done();
              });
            });
          });
          return it("should handle 4 `hide` calls (event)", function(done) {
            return instance.show().done(function() {
              var spy_after, spy_before;
              spy_before = sinon.spy();
              spy_after = sinon.spy();
              instance.on('beforehide', spy_before);
              instance.on('afterhide', spy_after);
              return $.when(instance.hide(), instance.hide(), instance.hide(), instance.hide()).done(function() {
                (expect(spy_before.callCount)).to.be(4);
                (expect(spy_after.callCount)).to.be(4);
                return done();
              });
            });
          });
        });
      });
    });
  });

  describe('jQuery.Domwin', function() {
    return describe('initialization', function() {
      return it('creates instance object', function() {
        var instance;
        instance = new $.Domwin;
        return (expect(instance)).to.be.a('object');
      });
    });
  });

}).call(this);
