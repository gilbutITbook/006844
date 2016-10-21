describe('forEach(callbackFcn, thisObj)', function() {
  'use strict';
  it('호출한 객체에 숫자형 length 프로퍼티가 없을 경우 예외를 던진다', function() {
    var ix,
        obj,
        withNoGoodLength = [
          { a: 1 }, {length: "숫자 아니얌"},
          {length: Infinity}, {length: -1}, {length: 1.5 }
        ];

    function expectThrow(obj) {
      expect(function() {
        obj.forEach(function() {/* 냉무 */});
      }).toThrow();
    }

    for (ix=0; ix<withNoGoodLength.length; ++ix) {
      obj = withNoGoodLength[ix];

      // 폴리필을 빌린다.
      obj.forEach = Conference.polyfills.arrayForEach;

      // 실행되지 않으리라.
      expectThrow(obj);
    }
  });
});