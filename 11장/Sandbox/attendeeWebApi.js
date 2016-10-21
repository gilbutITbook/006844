var Conference = Conference || {};

Conference.attendeeWebApi = function() {
  'use strict';

  return {
    // attendee를 전송한다
    post: function post(attendee) {
      // 서버로 attendee를 보내는 코드
    },

    // 전체 참가자를 담은 프라미스를 반환한다
    getAll: function getAll() {
      // 참가자 전원이 반환값인 프라미스를 반환하는 코드
    }
  };
};

