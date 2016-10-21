describe("Conference.polyfills", function() {
  'use strict';

  describe("arrayForEach(callbackFcn[, thisObj])", function() {
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

    describe("thisObj가 없을 경우", function() {

      it("undefined를 콘텍스트로 callbackFcn을 실행한다", function() {
        var helper = {
          expectThisToBeWindow : function() {
            expect(this).toBe(window);
          }
        };

        // helper에 스파이를 심어 호출되었는지 확인한다
        spyOn(helper, "expectThisToBeWindow").and.callThrough();

        // 원소 하나뿐인 배열에 대해 실행한다
        [1].forEach(helper.expectThisToBeWindow);

        expect(helper.expectThisToBeWindow).toHaveBeenCalled();
      });

      it("예정된 인자들을 넘겨 callbackFcn을 실행한다", function() {
        var testArray = [{}],
            callbackSpy = jasmine.createSpy();
        testArray.forEach(callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith(testArray[0], 0, testArray);
      });
    });

    describe("thisObj가 있을 경우", function() {

      it("thisObj를 콘텍스트로 callbackFcn을 실행한다", function() {
        var thisObj = {},
            helper = {
              expectThisToBeThisObj : function() {
                expect(this).toBe(thisObj);
              }
            };

        // helper에 스파이를 심어 호출되었는지 확인한다
        spyOn(helper, "expectThisToBeThisObj").and.callThrough();

        // 원소 하나뿐인 배열에 대해 실행한다
        [1].forEach(helper.expectThisToBeThisObj, thisObj);

        expect(helper.expectThisToBeThisObj).toHaveBeenCalled();
      });

      it("예정된 인자들을 넘겨 callbackFcn을 실행한다", function() {
        var thisObj = {},
            testArray = [{}],
            callbackSpy = jasmine.createSpy();

        testArray.forEach(callbackSpy, thisObj);

        expect(callbackSpy).toHaveBeenCalledWith(testArray[0], 0, testArray);
      });
    });
  });
});