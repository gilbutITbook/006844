var Conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  "use strict";

  // 주입된 checkInRecorder의 참조값을 담아둔다
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee) {
      attendee.checkIn();
      recorder.recordCheckIn(attendee);
    }
  };
};

