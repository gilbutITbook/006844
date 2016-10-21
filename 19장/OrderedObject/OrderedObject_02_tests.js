describe('OrderedObject', function() {
  'use strict';
  var orderedObject,
      result;

  function processKey(key, value) {
    if (typeof value !== 'function' ) {
      result = result * 100 + value;
    }
  }

  beforeEach(function() {
    orderedObject = new Conference.OrderedObject();
    result = 0;
  });

  describe('forEachKey(callbackFcn)', function() {

    it('객체 안에 있는 각 키에 대한 콜백을 순서대로 호출한다', function() {
      orderedObject.c = 11;
      orderedObject.a = 22;
      orderedObject.b = 33;
      orderedObject.forEachKey(processKey);
      expect(result).toBe(223311);
    });

    it('빌릴 수 있다', function() {
      var borrower = { c:11, a:22, b:33 };
      ReliableJavaScript.utilities.borrow(
        borrower, Conference.OrderedObject.prototype, 'forEachKey');
      borrower.forEachKey(processKey);
      expect(result).toBe(223311);
    });
  });

  describe('trackedForEachKey(callbackFcn)', function() {

    beforeEach(function() {
      orderedObject.c = 11;
      orderedObject.a = 22;
      orderedObject.b = 33;
    });

    describe('원래 객체에서', function() {

      it('객체 안에 있는 각 키에 대한 콜백을 순서대로 호출한다', function() {
        orderedObject.trackedForEachKey(processKey);
        expect(result).toBe(223311);
      });

      it('각 프로퍼티를 몇 번 방문했는지 추적한다', function() {
        var times = 2;
        for (var ix=0; ix<times; ++ix) {
          orderedObject.trackedForEachKey(processKey);
        }
        expect(orderedObject.getIterationCount('a')).toBe(times);
        expect(orderedObject.getIterationCount('b')).toBe(times);
        expect(orderedObject.getIterationCount('c')).toBe(times);
      });
    });
  });
});