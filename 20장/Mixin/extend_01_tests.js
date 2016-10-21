describe("ReliableJavaScript.extend(target, mixin)", function() {
  'use strict';

  var notObjects = ["", null, undefined, 1];

  it("target 인자가 객체가 아닐 경우 예외를 던진다", function() {
    notObjects.forEach(function(notObj) {
      expect(function shouldThrow() {
        ReliableJavaScript.extend(notObj, {});
      }).toThrowError(ReliableJavaScript.extend.messages.targetNotObject);
    });
  });

  it("mixin 인자가 객체가 아닐 경우 예외를 던진다", function() {
    notObjects.forEach(function(notObj) {
      expect(function shouldThrow() {
        ReliableJavaScript.extend({}, notObj);
      }).toThrowError(ReliableJavaScript.extend.messages.mixinNotObject);
    });
  });
});