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

      describe("getId() & setId(idValue)", function() {
        it("setId(idValue)를 호출하지 않으면 getId()는 undefined를 반환한다", function() {
          expect(target.getId()).toBe(undefined);
        });

        it("getId()는 setId(idValue)가 세팅한 값을 반환한다", function() {
          var id = "theId";
          target.setId(id);
          expect(target.getId()).toEqual(id);
        });
      });
    });
  });
});