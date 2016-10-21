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
  });
});