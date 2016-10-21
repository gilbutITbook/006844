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

  it("mixin이 빈 객체일 경우 target을 변경하지 않는다", function() {
    var target = {
      property1: "프로퍼티1",
      method1: function method1() {
        return "메소드1";
      }
    },
    method = target.method1;

    ReliableJavaScript.extend(target, {});

    // target에 어떤 키도 추가/삭제되지 않았다
    expect(Object.keys(target).sort()).toEqual(["method1", "property1"]);

    // target 기능은 전혀 바뀌지 않았다
    expect(target.property1).toEqual("프로퍼티1");
    expect(target.method1).toBe(method);
  });

  it("빈 target에 프로퍼티를 추가한다", function() {
    var target = {},
        mixin = {
          property1: "첫 번째 프로퍼티",
          property2: "두 번째 프로퍼티",
          method1: function method1() {
            return "첫 번째 메소드";
          },
          method2: function method2() {
            return "두 번째 메소드";
          }
        };

    ReliableJavaScript.extend(target, mixin);

    // target은 처음엔 빈 객체였기 때문에 지금은 mixin과 같다
    expect(target).toEqual(mixin);
  });
});