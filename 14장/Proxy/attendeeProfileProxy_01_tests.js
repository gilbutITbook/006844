describe('attendeeProfileProxy(attendees, profileService,prefetchLimit)',
function() {
  'use strict';

  var proxy = Conference.attendeeProfileProxy,
      profileService = Conference.attendeeProfileService(),
      attendees = [
        { attendeeId: 10, profileViews: "3" },
        { attendeeId: 11, profileViews: "0" },
        { attendeeId: 12 },
        { attendeeId: 13, profileViews: "3" },
        { attendeeId: 14, profileViews: "10"},
        { attendeeId: 15, profileViews: "2" },
        { attendeeId: 16, profileViews: "1" },
        ],
      spyOnProfileService;

  beforeEach(function() {
    spyOnProfileService = spyOn(profileService,'getProfile');
  });

  describe('초기화', function () {
    it('prefetchLimit가 양수가 아니면 프로필을 전혀 선취하지 않는다', function() {
      var notPositiveNumbers = [-1,0,undefined,'abc', function() {}];
      notPositiveNumbers.forEach(function(prefetchLimit) {
        proxy(attendees, profileService, prefetchLimit);
      });
      expect(spyOnProfileService.calls.count()).toBe(0);
    });
  });
});