var Conference = Conference || {};

Conference.presenterEvaluation = function() {
  'use strict';

  return {

    // 평가 대상 발표자의 이름을 지정한다.
    // 체이닝할 수 있게 호출부의 evaluation 인스턴스를 반환한다.
    setPresenter: function setPresenter(presenterName) {
      return this;
    }
  };
};