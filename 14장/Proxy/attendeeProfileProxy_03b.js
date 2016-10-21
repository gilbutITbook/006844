var Conference = Conference || {};

//attendeeProfileService(profileService) 함수로 참가자 배열(attendees)에서
//accessCount에 따라 가장 인기 있는 프로필부터 prefetchLimit개 만큼 선취하는 식으로
//참가자 프로필 접근을 관리한다.
Conference.attendeeProfileProxy = function(
attendees, profileService, prefetchLimit) {
  'use strict';

  var prefetched = {};

  function prefetch(attendeeId) {
    prefetched[attendeeId] = profileService.getProfile(attendeeId);
  }

  if (prefetchLimit > attendees.length) {
    prefetchLimit = attendees.length;
  }

  (function prefetchAll() {
    var ix,
        sortedAttendees = attendees.slice().sort(function byViews(a,b) {
          return (b.profileViews || 0) - (a.profileViews || 0);
        });
    for (ix=0; ix<prefetchLimit; ++ix) {
      prefetch(sortedAttendees[ix].attendeeId);
    }
  })();

};