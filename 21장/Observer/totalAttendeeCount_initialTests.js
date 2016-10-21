describe("Conference.totalAttendeeCount", function() {
  'use strict';

  var recentRegistrations;

  beforeEach(function() {
    recentRegistrations = Conference.recentRegistrationsService();
    // 여기서 서비스 폴링은 필요하지 않으니 잠시 꺼둔다.
    recentRegistrations.stopPolling();
  });

  it("recentRegistrationsService에 관찰자로 추가한다", function() {
    spyOn(recentRegistrations, "addObserver");
    var countDisplay = Conference.totalAttendeeCount(0, recentRegistrations);
    expect(recentRegistrations.addObserver).toHaveBeenCalledWith(countDisplay);
  });

  describe("getCount()", function() {
    it("update()를 호출하지 않은 상태라면 초기 인원수를 반환한다", function() {
      var countDisplay = Conference.totalAttendeeCount(0, recentRegistrations);
      expect(countDisplay.getCount()).toEqual(0);
    });
  });

  describe("update(newAttendee)", function() {
    it("참가자 인원수를 늘린다", function() {
      var initialCount = 0,
          countDisplay = Conference.totalAttendeeCount(initialCount,
            recentRegistrations);
      countDisplay.update(Conference.attendee("승헌", "송"));
      expect(countDisplay.getCount()).toEqual(initialCount + 1);
    });
  });
});