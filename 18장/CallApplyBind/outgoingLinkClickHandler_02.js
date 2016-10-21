var Conference = Conference || {};

Conference.outgoingLinkClickHandler = function(clickRecorder) {
  'use strict';

  var handler = {

    // 주입한 clickRecorder를 가리키는 참조체를 보관한다
    linkClickRecorder: clickRecorder,

    // 클릭 내역을 저장하고
    // clickRecorder로 클릭을 기록하는 객체를 생성한다
    handleClick: function handleClick() {
      // 클릭 내역 객체를 만든다
      var clickDetails = {};

      this.linkClickRecorder.recordClick(clickDetails);
    }
  };

  // handler.handleClick을
  // handler에 영구 바인딩된 새 함수 사본으로 교체한다
  handler.handleClick = handler.handleClick.bind(handler);

  return handler;
};