var Conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  'use strict';

  // 주입한 checkInRecorder의 참조값을 보관한다
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee) {
      attendee.checkIn();
      recorder.recordCheckIn(attendee).then(
        // 성공
        attendee.setCheckInNumber,
        // 실패
        attendee.undoCheckIn);
    }
  };
};

