describe("Conference.presenterEvaluation", function() {
  'use strict';

  var evaluation;

  beforeEach(function() {
    evaluation = Conference.presenterEvaluation();
  });

  describe("setPresenter(presenterName)", function() {

    it("호출부 인스턴스를 반환한다", function() {
      expect(evaluation.setPresenter("발표맨")).toBe(evaluation);
    });

    it("발표자 이름을 저장한다", function() {
      var name = "발표맨";
      evaluation.setPresenter(name);
      expect(evaluation.getPresenter()).toEqual(name);
    });
  });
});