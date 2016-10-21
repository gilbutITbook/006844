var Conference = Conference || {};
Conference.WidgetTools = Conference.WidgetTools || {};

Conference.WidgetTools.attendeeNames = function(sandbox,
  injectedAttendeeWebApi) {

  'use strict';

  // attendeeWebApi를 선택적으로 주입할 수 있게 코딩한다. 단위 테스트할 때 유용하다.
  var attendeeWebApi = injectedAttendeeWebApi || Conference.attendeeWebApi();

  sandbox.attendeeNames = {

    // 참가자 이름 배열로 귀결되는 프라미스를 반환한다.
    getAll: function getAll() {
      return attendeeWebApi.getAll()
        .then(function extractNames(attendees) {
          // 각 참가자의 전체 성명만 추출하여 반환한다.
          var names = [];
          attendees.forEach(function addName(attendee) {
            names.push(attendee.getFullName());
          });
          return names;
        });
    }
  };
};