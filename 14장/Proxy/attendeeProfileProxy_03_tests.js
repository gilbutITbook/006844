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
    it('prefetchLimit가 참가자 인원수를 초과하면 전체 프로필을 선취한다', function() {
      proxy(attendees, profileService, attendees.length+1);
      expect(spyOnProfileService.calls.count()).toBe(attendees.length);
    });
    it("가장 인기 있는 프로필부터 'prefetchLimit'개 만큼 선취한다", function() {
      var prefetchLimit = 3;
      proxy(attendees, profileService, prefetchLimit);
      expect(spyOnProfileService.calls.count()).toBe(prefetchLimit);
      expect(spyOnProfileService).toHaveBeenCalledWith(14);
      expect(spyOnProfileService).toHaveBeenCalledWith(10);
      expect(spyOnProfileService).toHaveBeenCalledWith(13);
    });
  });
});