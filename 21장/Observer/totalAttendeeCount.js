var Conference = Conference || {};

Conference.totalAttendeeCount = function(initialCount,
                                         recentRegistrationsService) {
  'use strict';

  var currentCount = initialCount,
      registrations = recentRegistrationsService,
      render = function render() {
        // 현재 인원수를 DOM에 렌더링한다
      };

  var module = {
    // UI에 표시된 총 참가자 인원수를 반환한다
    getCount: function() {
      return currentCount;
    },

    // 총 참가자 인원수를 늘린다
    update: function update(newAttendee) {
      currentCount++;
      render();
    }
  };

  // module을 recentRegistrationsService의 관찰자로 추가한다
  registrations.addObserver(module);

  return module;
};