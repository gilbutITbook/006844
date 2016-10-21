describe("Conference.presenterEvaluation", function() {
  'use strict';

  var evaluation;

  beforeEach(function() {
    evaluation = Conference.presenterEvaluation();
  });

  describe("체이닝 가능한 세터 함수를 내놓는다", function() {
      it("이 함수는 자신을 실행한 인스턴스를 반환한다", function() {

        // 체이닝할 수 있는 각 함수의 유효한
        // 실행 로직(데이터 검증 로직을 전달하는 등)을
        // 포함한 배열을 만든다
        var validCalls = [
          function(ev) { return ev.setPresenter("발표맨"); },
          function(ev) { return ev.setPresentation("이프레젠테이션"); }
        ];

        // validCalls의 각 함수가 체이닝할 수 있게
        // evaluation를 반환하는지 확인한다
        validCalls.forEach(function ensureReturnsThis(fcn) {
          expect(fcn(evaluation)).toBe(evaluation);
        });

      });
  });

  describe("setPresenter(presenterName)", function() {

    it("발표자 이름을 저장한다", function() {
      var name = "발표맨";
      evaluation.setPresenter(name);
      expect(evaluation.getPresenter()).toEqual(name);
    });
  });
});