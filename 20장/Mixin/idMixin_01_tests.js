describe("Conference.mixins", function() {
  'use strict';

  var target,
      mixin;

  describe("idMixin()", function() {
    beforeEach(function() {
      target = {};
      mixin = Conference.mixins.idMixin();

      ReliableJavaScript.extend(target, mixin);
    });

    describe("믹스인 되면", function() {
      it("해당 프로퍼티들이 target에 추가된다", function() {
        expect(Object.keys(target).sort()).toEqual(["getId", "id", "setId"]);
      });
    });
  });
});