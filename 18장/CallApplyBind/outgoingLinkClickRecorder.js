var Conference = Conference || {};
'use strict';

Conference.outgoingLinkClickRecorder = function() {
  return {
    // 외부 접속 링크를 클릭한 상세 내역을 기록한다
    recordClick: function recordClick(clickDetails) {
      // 여기에 컨퍼런스 DB에 클릭을 기록하는 로직이 들어갈 것이다
    }
  };
};