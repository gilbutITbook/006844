var Conference = Conference || {};
Conference.attendee = function(firstName, lastName) {
  'use strict';

  var attendeeId,
    checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None',
    checkInNumber;

  return {
    setId: function(id) {
      attendeeId = id;
    },
    getId: function() {
      return attendeeId;
    },

    getFullName: function() {
      return first + ' ' + last;
    },

    isCheckedIn: function() {
      return checkedIn;
    },

    checkIn: function() {
      checkedIn = true;
    },

    undoCheckIn: function() {
      checkedIn = false;
      checkInNumber = undefined;
    },

    setCheckInNumber: function(number) {
      checkInNumber = number;
    },

    getCheckInNumber: function() {
      return checkInNumber;
    },

    // 이 참가자가 다른 참가자와 동일인인지 밝힌다.
    // 여기서는 간단히 이름만 갖고 비교한다.
    // 실제로는 생년월일 같은 데이터도 비교해야 할 것이다.
    isSamePersonAs: function(otherAttendee) {
        return otherAttendee !== undefined
        && otherAttendee.getFullName() === this.getFullName();
    },

    // 이 참가자의 사본을 반환한다
    copy: function() {
      var copy = Conference.attendee(first,last);
      copy.setId(this.getId());
      copy.checkIn(this.isCheckedIn());
      copy.setCheckInNumber(this.getCheckInNumber());
      return copy;
    }
  };
};