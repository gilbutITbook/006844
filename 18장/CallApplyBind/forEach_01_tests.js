describe("Conference.polyfills", function() {
  describe("arrayForEach(callbackFcn[, thisObj])", function() {
    'use strict';

    var originalForEach;

    beforeEach(function() {
      // 원래 forEach 구현부를 가리키는 참조체를 보관한다
      originalForEach = Array.prototype.forEach;

      // 원래 forEach 구현부(존재한다면)를 테스트할 폴리필로 대체한다
      Array.prototype.forEach = Conference.polyfills.arrayForEach;
    });

    afterEach(function() {
      // 원래 forEach를 돌려놓는다
      Array.prototype.forEach = originalForEach;
    });

    it("callbackFcn이 함수가 아니면 예외를 던진다", function() {

      var i,
          nonFunction = [
            undefined,
            "",
            {}
          ];

      // 여기서 Array.prototype.forEach로 잘못 쓰기 쉽다!
      for (i = 0; i < nonFunction.length; i++) {
        expect(function() {
          [].forEach(nonFunction[i]);
        }).toThrowError(nonFunction[i] + "은(는) 함수가 아닙니다!");
      }
    });
  });
});