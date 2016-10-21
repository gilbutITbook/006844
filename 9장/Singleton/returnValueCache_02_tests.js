describe('returnValueSimpleCache', function() {
  "use strict";

  var testObject,
      testValue,
      args,
      spyReference;

  // 테스트 객체를 생성하는 도우미 함수. testFunction에 스파이를 심고
  // 반환 객체의 spyReference 프로퍼티에 스파이 참조값을 담아둔다
  function createATestObject() {
    var obj = {
      testFunction : function(arg) {
        return testValue;
      }
    };
    spyOn(obj, 'testFunction').and.callThrough();

    // 애스팩트가 적용된 이후에는
    // 스파이를 직접 참조할 수 없으므로 현재 참조값을 보관해둔다
    obj.spyReference = obj.testFunction;

    return obj;
  }

  beforeEach(function() {
    testObject = createATestObject();

    // testObject.testFunction를 returnValueSimpleCache 애스팩트로 장식한다
    Aop.around('testFunction',
      Aspects.returnValueCache().advice, testObject);

    args = [{key:"value"}, "someValue"];
  });

  describe('advice(targetInfo)', function() {
    it('첫 번째 실행 시 장식된 함수의 반환값을 반환한다', function() {
      var value = testObject.testFunction.apply(testObject, args);
      expect(value).toBe(testValue);
    });

    it('여러 번 실행 시 장식된 함수의 반환값을 반환한다', function() {
      var iterations = 3;

      for (var i = 0; i < iterations; i++) {
        var value = testObject.testFunction.apply(testObject, args);
        expect(value).toBe(testValue);
      }
    });

    it('같은 키 값으로 여러 번 실행해도 장식된 함수만 실행한다', function() {
      var iterations = 3;

      for (var i = 0; i < iterations; i++) {
        var value = testObject.testFunction.apply(testObject, args);
        expect(value).toBe(testValue);
      }
      expect(testObject.spyReference.calls.count()).toBe(1);
    });

    it('고유한 각 키 값마다 꼭 한번씩 장식된 함수를 실행한다', function() {
        var keyValues = ["value1", "value2", "value3"];

        keyValues.forEach(function iterator(arg) {
          var value = testObject.testFunction(arg);
        });

        // 요청을 각각 다시 실행한다. 결과는 캐시에서 가져오므로
        // 장식된 함수를 실행하지 않는다.
        keyValues.forEach(function iterator(arg) {
          var value = testObject.testFunction(arg);
        });

        // 장식된 함수는 고유값 하나 당 꼭 한번씩 실행되어야 한다
        expect(testObject.spyReference.calls.count()).toBe(keyValues.length);
    });

    it('주입된 캐시를 인스턴스 간에 공유할 수 있다', function() {
      // 공유 캐시 객체, simpleCache를 생성한다
      var sharedCache = Conference.simpleCache(),
          object1 = createATestObject(),
          object2 = createATestObject();

      Aop.around('testFunction',
        new Aspects.returnValueCache(sharedCache).advice,
        object1);

      Aop.around('testFunction',
        new Aspects.returnValueCache(sharedCache).advice,
        object2);

      object1.testFunction(args);

      // object2의 testFunction 호출 시
      //  캐시된 object1의 testFunction 호출 결과를 가져온다
      expect(object2.testFunction(args)).toBe(testValue);

      // 따라서, object2의 testFunction은 실행되지 않는다
      expect(object2.spyReference.calls.count()).toBe(0);
    });
  });
});