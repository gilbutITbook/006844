var Conference = Conference || {};

Conference.presenterEvaluation = function() {
  'use strict';

  var presenter = "";

  return {

    // 평가 대상 발표자의 이름을 지정한다.
    // 체이닝할 수 있게 호출부의 evaluation 인스턴스를 반환한다.
    setPresenter: function setPresenter(presenterName) {
      presenter = presenterName;
      return this;
    },

    // 평가에 해당하는 발표자의 이름을 반환한다.
    getPresenter: function getPresenter() {
      return presenter;
    },

    // 평가에 해당하는 프레젠테이션명을 지정한다.
    // 체이닝할 수 있게 호출부의 evaluation 인스턴스를 반환한다.
    setPresentation: function setPresentation(presentationName) {
      return this;
    }
  };
};