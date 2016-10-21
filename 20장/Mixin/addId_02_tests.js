describe("Conference.mixins", function() {
  'use strict';

  var target;

  describe("addId()", function() {
    beforeEach(function() {
      target = {};
    });

    it("target.getId가 이미 존재할 경우 예외를 던진다", function() {
      target.getId = function getId() { };
      expect(function shouldThrow() {
        Conference.mixins.addId.call(target);
      }).toThrowError(
        Conference.mixins.addId.messages.triedToReplace + "getId"
      );
    });

    it("target.setId가 이미 존재할 경우 예외를 던진다", function() {
      target.setId = function setId() { };
      expect(function shouldThrow() {
        Conference.mixins.addId.call(target);
      })
      .toThrowError(
        Conference.mixins.addId.messages.triedToReplace + "setId"
      );
    });

    describe("한 객체로 믹스인되면", function() {
      beforeEach(function() {
        // this를 target으로 바인딩하여 addId를 실행한다
        Conference.mixins.addId.call(target);
      });

      it("해당 프로퍼티들이 target에 추가된다", function() {
        expect(Object.keys(target).sort()).toEqual(["getId", "setId"]);
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