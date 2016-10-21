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
  });

});